const Errors = require("../../utils/PaymeErrors");
const User = require("../../models/Users");
const Transaction = require("../../models/PayMeTransaction");
const Transfer = require("../../models/Transfer");
const Journal = require("../../models/Journal");
exports.payme = async (req, res) => {
  const MERCHANT_ID = "62fa657ea12ad7a48f4b2dd9";
//   const PAYCOM_PASSWORD = "9?rczz6bT14&tRGnSs&P&Ycr8ZUmHf2HB9X@"; //test
    const PAYCOM_PASSWORD = "4xGH5ek8h9pZw#5MAEYf28wJsXVMBP&iyOCY"; //production
  const body = req.body;
  if (req.method !== "POST") {
    return sendResponse(Errors.TransportError, null);
  }
  //проверяем авторизацию запроса.
  if (!checkAuth(req.headers["authorization"])) {
    //если запрос авторизован возвращаем ошибку -32504
    return sendResponse(Errors.AccessDeniet, null);
  }
  if (body.method === "CheckPerformTransaction") {
    CheckPerformTransaction(body.params);
  } else if (body.method === "CreateTransaction") {
    CreateTransaction(body.params);
  } else if (body.method === "PerformTransaction") {
    PerformTransaction(body.params);
  } else if (body.method === "CheckTransaction") {
    CheckTransaction(body.params);
  } else if (body.method === "CancelTransaction") {
    CancelTransaction(body.params);
  }
  async function CheckPerformTransaction(params) {
    const candidate = await User.query().findOne({
      uid: params.account.user_id,
    });
    if (!candidate) {
      return sendResponse(Errors.OrderNotFound, null);
    }
    if (params.amount < 0) {
      return sendResponse(Errors.IncorrectAmount, null);
    }
    return sendResponse(null, {
      allow: true,
    });
  }
  async function CreateTransaction(params) {
    try {
      if (params.amount < 0) {
        return sendResponse(Errors.IncorrectAmount, null);
      }
      const transaction = await Transaction.query().findOne({ tid: params.id });
      if (!transaction) {
        const user = await User.query().findOne({
          uid: params.account.user_id,
        });
        if (!user) {
          return sendResponse(Errors.OrderNotFound, null);
        }
        console.log("p", params);
        const tt = await Transaction.query().insert({
          tid: params.id,
          amount: params.amount / 100,
          transaction: Math.floor(Math.random() * 1000000000).toString(),
          state: 1,
          perform_time: 0,
          cancel_time: 0,
          create_time: parseInt(Date.now()),
          uid: params.account.user_id,
          time: parseInt(params.time),
        });
        return sendResponse(null, {
          transaction: tt.transaction,
          state: tt.state,
          create_time: parseInt(tt.create_time),
          perform_time: parseInt(tt.perform_time),
          cancel_time: parseInt(tt.cancel_time),
        });
      }
      if (transaction) {
        if (params.id !== transaction.tid) {
          return sendResponse(Errors.YesTransaction, null);
        }
        if (transaction.state === 1) {
          if (transaction.time > params.time) {
            await Transaction.query()
              .findOne({ tid: params.id })
              .update({ state: -1, reason: 4 });
            return sendResponse(Errors.UnexpectedTransactionState, null);
          } else {
            return sendResponse(null, {
              state: transaction.state,
              create_time: parseInt(transaction.create_time),
              transaction: transaction.transaction,
              perform_time: parseInt(transaction.perform_time) || 0,
              cancel_time: parseInt(transaction.cancel_time) || 0,
            });
          }
        } else {
          return sendResponse(Errors.UnexpectedTransactionState, null);
        }
      }
    } catch (error) {
      console.log("ERROR Create Transaction", error);
    }
  }

  async function PerformTransaction(params) {
    try {
      const transaction = await Transaction.query().findOne({ tid: params.id });

      if (!transaction) return sendResponse(Errors.TransactionNotFound, null);
      if (transaction.state === 1) {
        if (transaction.time > Date.now()) {
          await Transaction.query()
            .findOne({ tid: params.id })
            .update({ state: -1, reason: 4 });
        } else {
          const amount = transaction.amount;
          const user = await User.query().findOne({ uid: transaction.uid });
          // console.log('uu',user.id)
          // bu joyga jurnal yozib qo'yiladi
          await Journal.query().insert({
            user_id: user.id,
            pay_type: 1, // payme
            amount: amount,
            status: 1, // 1 - to'lov qabul qilindi
          });
          await Transfer.query().insert({
            amount,
            type: 4, // payme
            contract: null,
            user_id: user.id,
            reciver: user.id,
            all: 0,
            pay: "Payme",
          });
          await User.query()
            .findOne({ uid: transaction.uid })
            .update({ balance: user.balance + amount });
          await Transaction.query()
            .findOne({ tid: params.id })
            .update({ state: 2, perform_time: Date.now() });
          const tt = await Transaction.query().findOne({
            tid: transaction.tid,
          });
          return sendResponse(null, {
            transaction: transaction.transaction,
            perform_time: parseInt(tt.perform_time),
            state: 2,
          });
        }
      }
      if (transaction.state === 2) {
        return sendResponse(null, {
          transaction: transaction.transaction,
          perform_time: parseInt(transaction.perform_time),
          state: transaction.state,
        });
      } else {
        return sendResponse(Errors.UnexpectedTransactionState, null);
      }
    } catch (error) {
      console.log("ERROR Perform Transaction ", error);
    }
  }

  async function CancelTransaction(params) {
    console.log("params", params);
    const transaction = await Transaction.query().findOne({ tid: params.id });
    console.log(transaction);
    const user = await User.query().findOne({ uid: transaction.uid });
    if (!transaction) {
      return sendResponse(Errors.TransactionNotFound, null);
    }
    if (transaction.state === 1) {
      // Jurnalga pulni qaytarib olganliqi do'g'risinda yozib qo`yish garak
      if (user.balance > transaction.amount) {
        await Journal.query().insert({
          user_id: user.id,
          pay_type: 1, // payme
          amount: transaction.amount,
          status: 0, // 0 - to`lov qaytarib olindi
        });
        await Transaction.query()
          .findOne({ tid: params.id })
          .update({ state: -1, cancel_time: Date.now(), reason: 3 });
        const tt = await Transaction.query().findOne({
          tid: transaction.tid,
        });
        return sendResponse(null, {
          transaction: transaction.transaction,
          cancel_time: parseInt(tt.cancel_time),
          state: -1,
        });
      } else {
        await Transaction.query().findOne({ tid: params.id }).update({
          state: -1,
          reason: 3,
          cancel_time: Date.now(),
          perform_time: 0,
        });
        return sendResponse(Errors.OrderNotСanceled, null);
      }
    }
    if (transaction.state === 2) {
      const user = await User.query().findOne({ uid: transaction.uid });
      if (user.balance > transaction.amount) {
        await User.query()
          .findOne({ uid: transaction.uid })
          .update({ balance: user.balance - transaction.amount });
        await Transaction.query().findOne({ tid: params.id }).update({
          state: -2,
          reason: params.reason,
          cancel_time: Date.now(),
        });
        await Journal.query().insert({
          user_id: user.id,
          pay_type: 1, // payme
          amount: transaction.amount,
          status: 0, // 0 - to`lov qaytarib olindi
        });
        console.log("atmen");
        await Transfer.query().insert({
          amount: transaction.amount,
          type: 5, // payme
          contract: null,
          user_id: user.id,
          reciver: user.id,
          all: 1,
          pay: "Payme",
        });
        const tt = await Transaction.query().findOne({ tid: params.id });
        return sendResponse(null, {
          transaction: tt.transaction,
          cancel_time: parseInt(tt.cancel_time),
          state: tt.state,
        });
      } else {
        await Transaction.query().findOne({ tid: params.id }).update({
          state: -1,
          reason: 3,
          cancel_time: Date.now(),
          perform_time: 0,
        });

        return sendResponse(Errors.OrderNotСanceled, null);
      }
    } else {
      const tt = await Transaction.query().findOne({ tid: params.id });
      return sendResponse(null, {
        transaction: tt.transaction,
        cancel_time: parseInt(tt.cancel_time),
        state: tt.state,
      });
    }
  }

  async function CheckTransaction(params) {
    const transaction = await Transaction.query().findOne({ tid: params.id });
    if (!transaction) return sendResponse(Errors.TransactionNotFound, null);
    return sendResponse(null, {
      create_time: parseInt(transaction.create_time),
      perform_time: parseInt(transaction.perform_time) || 0,
      cancel_time: parseInt(transaction.cancel_time) || 0,
      transaction: transaction.transaction,
      state: transaction.state,
      reason: transaction.reason || null,
    });
  }

  function sendResponse(error, result) {
    res.writeHead(200, {
      "Content-Type": "application/json; charset=utf-8",
    });

    res.end(
      JSON.stringify({
        jsonrpc: "2.0",
        error: error || undefined,
        result: result || undefined,
        id: body.id,
      })
    );
  }

  function checkAuth(auth) {
    return (
      auth && //проверяем существование заголовка
      (auth = auth.trim().split(/ +/)) && //разделяем заголовок на 2 части
      auth[0] === "Basic" &&
      auth[1] && //проверяем правильность формата заголовка
      (auth = Buffer.from(auth[1], "base64").toString("utf-8")) && //декодируем из base64
      (auth = auth.trim().split(/ *: */)) && //разделяем заголовок на логин пароль
      auth[0] === "Paycom" && //проверяем логин
      auth[1] === PAYCOM_PASSWORD
    ); //проверяем пароль
  }
};
