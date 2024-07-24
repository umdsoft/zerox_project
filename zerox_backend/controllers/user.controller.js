const User = require("../models_mongoose/user.model")
const bcrypt = require("bcryptjs")
const SMS = require("../setting/sendSms")
const jwt = require("jsonwebtoken")
const axios = require("axios").default
const { genNumber } = require("../setting/idNumber")
// const json = require("../myiduserdata.json");
const { transfer } = require("../helper/transferMoney")
exports.register = async (req, res) => {
	const lastDat = await User.findOne().sort({ createdAt: -1 }).exec()
	const idsss = lastDat ? [`${lastDat.uid}`] : ["100000AA"]
	const num = genNumber(idsss)
	console.log(num)
	if (req.body.step == 1) {
		// const code = Math.floor(Math.random() * 100000);
		const code = 11111

		const candidate = await User.findOne({ phone: req.body.phone })
		if (
			candidate &&
			candidate.password !== null &&
			candidate.code == null
		) {
			return res
				.status(400)
				.json({ success: false, message: "user-already-exist" })
		}
		if (
			candidate &&
			candidate.password === null &&
			candidate.isActive == false &&
			candidate.code !== null
		) {
			const sms = `Tasdiqlash kodi: ${code}
        ZeroX - ishonch kafolati.
        qJrxXbBJxH`
			// await SMS(req.body.phone, sms);
			await User.updateOne(
				{ phone: req.body.phone },
				{ $set: { code: code } },
				{ new: true }
			).exec((err, data) => {
				if (err) return res.status(400).json({ success: false, err })
				return res.status(200).json({ success: true, data })
			})
		}
		const user = new User(req.body)
		user.code = code
		user.uid = num
		// user.password = password;
		user.save()
			.then(async () => {
				const sms = `Tasdiqlash kodi: ${code}
        ZeroX - ishonch kafolati.
        qJrxXbBJxH`
				// await SMS(req.body.phone, sms);
				return res.status(201).json({ success: true })
			})
			.catch((e) => {
				console.log(e)
				res.status(400).json({ success: false, e })
			})
	}
	if (req.body.step == 2) {
		await User.findOne({ phone: req.body.phone }).exec(
			async (err, user) => {
				console.log(user)
				if (!user)
					return res
						.status(404)
						.json({ success: false, message: "user-not-found" })
				if (
					user.code === null ||
					user.isActive === true ||
					user.code != req.body.code
				) {
					return res
						.status(400)
						.json({ success: false, message: "code-exit" })
				}
				return res.status(200).json({ success: true })
			}
		)
	}

	if (req.body.step == 3) {
		await User.findOne({ phone: req.body.phone }).exec(
			async (err, user) => {
				if (!user)
					return res
						.status(404)
						.json({ success: false, message: "user-not-found" })
				if (
					user.code === null ||
					user.isActive === true ||
					user.code != req.body.code
				) {
					return res
						.status(400)
						.json({ success: false, message: "code-exit" })
				}
				const salt = await bcrypt.genSaltSync(12)
				const password = await bcrypt.hashSync(req.body.password, salt)
				await User.updateOne(
					{ phone: req.body.phone },
					{
						$set: {
							password: password,
							code: null,
						},
					},
					{ new: true }
				).exec((err, data) => {
					if (err)
						return res.status(400).json({ success: false, err })
					return res.status(200).json({ success: true })
				})
			}
		)
	}
}

exports.updateCode = async (req, res) => {
	await User.findOne({ phone: req.body.phone }).exec(async (err, user) => {
		if (!user)
			return res
				.status(404)
				.json({ success: false, message: "user-not-found" })

		if (user.isActive === true || user.code === null)
			return res
				.status(400)
				.json({ success: false, message: "user-isActive" })
		const code = Math.floor(Math.random() * 10000)
		const sms = `Tasdiqlash uchun kod: ${code}`
		// await SMS(req.body.phone, sms);
		await User.updateOne(
			{ phone: req.body.phone },
			{ $set: { code: code } },
			{ new: true }
		)
		return res.status(200).json({ success: true })
	})
}

exports.login = async (req, res) => {
	await User.findOne({ phone: req.body.phone, status: 2 }).exec(
		async (err, user) => {
			if (err) return res.status(400).json({ success: false, err })
			if (!user)
				return res
					.status(400)
					.json({ success: false, message: "error" })
			if (!bcrypt.compareSync(req.body.password, user.password)) {
				return res
					.status(400)
					.json({ success: false, message: "error" })
			}
			const payload = { id: user._id }
			const token = jwt.sign(payload, process.env.SECRET, {
				expiresIn: "1d",
			})
			return res.status(200).json({ success: true, token })
		}
	)
}

exports.search = async (req, res) => {
	if (req.body.type == 1) {
		await User.findOne({
			$and: [{ uid: req.body.id }, { birthday: req.body.birthday }],
		}).exec((err, user) => {
			if (err) return res.status(400).json({ success: false, err })
			if (!user) {
				return res
					.status(400)
					.json({ success: false, message: "not-found" })
			}
			return res.status(200).json({ success: true, user })
		})
	}
	if (req.body.type == 2) {
		await User.findOne({
			$and: [{ uid: req.body.id }, { stir: req.body.stir }],
		}).exec((err, user) => {
			if (err) return res.status(400).json({ success: false, err })
			if (!user) {
				return res
					.status(400)
					.json({ success: false, message: "not-found" })
			}
			return res.status(200).json({ success: true, user })
		})
	}
}

exports.me = async (req, res) => {
	const candidate = jwt.decode(req.headers.authorization.split(" ")[1])
	await User.findOne({ _id: candidate.id })
		.select({ password: 0 })
		.exec((err, user) => {
			if (err) return res.status(400).json({ success: false, err })
			if (!user)
				return res
					.status(404)
					.json({ success: false, error: "user-not-found" })
			return res.status(200).json({ success: true, data: user })
		})
}
exports.userActive = async (req, res) => {
	// code qachon galadi ? qachonki sdk user bilan passportdagidanniylar dugri  galsa sdk code baradi
	// shunda code galadi.!
	const { code } = req.body
	// console.log(code);
	try {
		// berda kimdan code galib durgannini bilish uchun token galishi garak.!
		// const candidate = jwt.decode(req.headers.authorization.split(" ")[1]);
		// const candidate = jwt.decode(
		//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyNzE2MjJmMWU3NzUyNDA3NDA4NDZiOSIsImlhdCI6MTY1MTY4ODU5NCwiZXhwIjoxNjUxNzc0OTk0fQ.s1HB1fTd2ac6_FmN44-upjnl2dzlaed7cEMOG_Tbris"
		// );
		const candidate = jwt.decode(req.headers.authorization.split(" ")[1])
		const userData = await User.findOne({ _id: candidate.id })
		if (!userData) {
			return res
				.status(400)
				.json({ success: false, error: "user-not-found" })
		}
		if (userData.isActive === true) {
			return res
				.status(400)
				.json({ success: false, error: "user-isActive" })
		}
		// myid ni backendiga kerakli danniylarni yuboramiz keyin access_token ni qabul qilib olamiz.!
		//token ni tugash mudati 3600
		const t = process.env.CLIENT_ID
		const d = process.env.CLIENT_SECRET

		const params = new URLSearchParams()
		params.append("grant_type", "authorization_code")
		params.append("code", code)
		params.append("client_id", t)
		params.append("client_secret", d)
		const { data } = await axios({
			method: "POST",
			url: "https://myid.uz/api/v1/oauth2/access-token",
			data: params,
			headers: {
				"Content-Type": "application/x-www-form-urlencoded",
			},
		})
		console.log(data)
		if (!data.access_token) {
			return res
				.status(400)
				.json({ success: false, error: "token not found" })
		}
		const { access_token } = data
		await axios
			.get("https://myid.uz/api/v1/users/me", {
				headers: {
					Authorization: `Bearer ${access_token}`,
				},
			})
			.then(async (response) => {
				console.log(response.data.profile)
				await User.updateOne(
					{ _id: candidate.id },
					{
						$set: {
							isActive: true,
							first_name:
								response.data.profile.common_data.first_name,
							last_name:
								response.data.profile.common_data.last_name,
							middle_name:
								response.data.profile.common_data.middle_name,
							birthday:
								response.data.profile.common_data.birth_date,
							pinfl: response.data.profile.common_data.pinfl,
							stir: response.data.profile.common_data.inn,
							passport: response.data.profile.doc_data.pass_data,
							gender: response.data.profile.common_data.gender,
							nationality:
								response.data.profile.common_data.nationality,
							citizenship:
								response.data.profile.common_data.citizenship,
							address:
								response.data.profile.address.permanent_address,
							issued_date:
								response.data.profile.doc_data.issued_date,
							issued_by: response.data.profile.doc_data.issued_by,
							region: response.data.profile.address
								.permanent_registration.region,
							district:
								response.data.profile.address
									.permanent_registration.district,
							expiry_date:
								response.data.profile.doc_data.expiry_date,
						},
					},
					{ new: true }
				).exec((err, user) => {
					if (err) return res.status(400).json({ success: false })

					return res.status(200).json({ success: true })
				})
			})
			.catch((err) => {
				return res.status(400).json({ success: false, err })
			})
	} catch (error) {
		return res.status(400).json({ success: false })
	}
}

exports.transfer = async (req, res) => {
	const candidate = jwt.decode(req.headers.authorization.split(" ")[1])
	const user = await User.findOne({ _id: candidate.id })
	if (user.balance < req.body.amount) {
		return res.status(400).json({ success: false, message: "enouth-money" })
	} else {
		const money = user.balance - req.body.amount
		await User.updateOne(
			{ _id: candidate.id },
			{ $set: { balance: money } },
			{ new: true }
		).exec(async (err, data) => {
			if (err) return res.status(400).json({ success: false, err })
			await transfer(candidate.id, req.body.payee, req.body.amount, 0)
			const payee = await User.findOne({ _id: req.body.payee })
			const lastMoney = payee.balance + req.body.amount
			await User.updateOne(
				{ _id: req.body.payee },
				{ $set: { balance: lastMoney } },
				{ new: true }
			)
			await transfer(candidate.id, req.body.payee, req.body.amount, 1)
			return res.status(200).json({ success: true })
		})
	}
}
exports.forAdminJismoniy = async (req, res) => {
	await User.find({ type: req.params.type })
		.sort({ createdAt: -1 })
		.skip((req.query.page - 1) * req.query.limit)
		.limit(parseInt(req.query.limit))
		.select({ password: 0 })
		.exec((err, data) => {
			if (err) return res.status(400).json({ success: false, err })
			return res.status(200).json({ success: true, data })
		})
}
exports.forAdminOneJismoniy = async (req, res) => {
	await User.findOne({ uid: req.params.uid })
		.select({ password: 0 })
		.exec((err, data) => {
			if (err) return res.status(400).json({ success: false, err })
			return res.status(200).json({ success: true, data })
		})
}
exports.registerLegal = async (req, res) => {
	// const code = Math.floor(Math.random() * 100000);
	const code = 11111

	const candidate = await User.findOne({ stir: req.body.stir })
	if (!candidate) {
		const lastDat = await User.findOne().sort({ createdAt: -1 }).exec()
		const idsss = lastDat ? [`${lastDat.uid}`] : ["100000AA"]
		const num = genNumber(idsss)
		const user = new User(req.body)
		user.type = 1
		user.uid = num
		user.save()
			.then(() => {
				return res
					.status(200)
					.json({ success: true, message: "not-active" })
			})
			.catch((err) => {
				return console.log(err)
			})
	}
	if (
		req.body.status == 1 &&
		candidate.type == 1 &&
		candidate.isActive == false
	) {
		console.log("status: 1")
		await User.updateOne(
			{ _id: candidate._id },
			{
				$set: {
					phone: req.body.phone,
					code: code,
					company: req.body.company,
				},
			}
		)
		const sms = `Tasdiqlash kodi: ${code}
        ZeroX - ishonch kafolati.
        qJrxXbBJxH`
		// await SMS(candidate.phone, sms);
		return res.status(200).json({ success: true, message: "code-send" })
	}
	if (
		req.body.status == 2 &&
		candidate.type == 1 &&
		candidate.isActive == false
	) {
		console.log("status: 2")
		if (req.body.code != candidate.code) {
			return res
				.status(400)
				.json({ success: false, message: "code-error" })
		}
		await User.updateOne(
			{ _id: candidate._id },
			{ $set: { isActive: true, code: null } }
		)
		const payload = { id: candidate._id }
		const token = await jwt.sign(payload, process.env.SECRET, {
			expiresIn: "1d",
		})
		return res.status(200).json({ success: true, token })
	}
	if (candidate.isActive == true && candidate.type == 1) {
		const payload = { id: candidate._id }
		const token = await jwt.sign(payload, process.env.SECRET, {
			expiresIn: "1d",
		})
		return res.status(200).json({ success: true, token })
	} else {
		return res.status(200).json({ success: true, message: "not-active" })
	}
}
