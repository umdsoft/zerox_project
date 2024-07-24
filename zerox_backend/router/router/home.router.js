const router = require("express").Router();
const Contract = require("../../models/Contracts");
const jwt = require("jsonwebtoken");
const { protect, authorize, type } = require("../../middleware/auth");
const Report = require('../../models/Transfer')

router.get("/my", protect, authorize(1), type(1, 2, 89), async (req, res) => {
  const candidate = jwt.decode(req.headers.authorization.split(" ")[1]);
  const knex = await Contract.knex()

  const data = await knex.raw(`
  SELECT c.id, sum(a.residual_amount) as residual_amount,c.currency
  FROM contracts c 
  LEFT JOIN (SELECT * FROM acts WHERE id IN (SELECT MAX(id) FROM acts a WHERE a.status = 1 GROUP BY contract_id) ) a ON a.contract_id = c.id 
  WHERE c.${req.query.type} = ${candidate.id} AND c.status = 1 
  GROUP By currency
  ORDER BY c.id DESC;
  `)

  const expired = await knex.raw(`
  SELECT c.id,sum(a.residual_amount) as residual_amount,c.currency, a.end_date
FROM contracts c 
LEFT JOIN (SELECT * FROM acts WHERE id IN (SELECT MAX(id) FROM acts a WHERE a.status = 1 GROUP BY contract_id) ) a ON a.contract_id = c.id 
WHERE c.${req.query.type} = ${candidate.id} AND c.status = 1 and a.end_date < CURRENT_DATE()
GROUP By currency
ORDER BY c.id DESC;
  `)
  const allCon = await knex.raw(`SELECT count(*) as cnt FROM contracts as c where c.status!=0 and c.${req.query.type} = ${candidate.id};`)
  const jarayon = await knex.raw(`SELECT count(*) as cnt FROM contracts as c where c.status=1 and c.${req.query.type} = ${candidate.id};`)
  const tugallangan = await knex.raw(`SELECT count(*) as cnt FROM contracts as c where c.status=2 and c.${req.query.type} = ${candidate.id};`)
  const rad = await knex.raw(`SELECT count(*) as cnt FROM contracts as c where (c.status=3 or c.status=4) and c.${req.query.type} = ${candidate.id};`)
  console.log(rad[0])
  const chart = {
    all: allCon[0][0].cnt,
    jarayon: jarayon[0][0].cnt,
    tugallangan: tugallangan[0][0].cnt,
    rad: rad[0][0].cnt
  }
  const five = await knex.raw(`
SELECT c.id,
       sum(a.residual_amount) AS residual_amount,
       c.currency,
       a.end_date, 
       GROUP_CONCAT(a.end_date) AS endDate,
       GROUP_CONCAT(a.residual_amount) AS residualAmount
FROM contracts c
LEFT JOIN
(SELECT *
      FROM acts
      WHERE id IN
         (SELECT MAX(id)
        FROM acts
          GROUP BY contract_id) ) a ON a.contract_id = c.id
WHERE a.status = 1 and c.status = 1 AND c.${req.query.type} = ${candidate.id} AND a.end_date BETWEEN CURRENT_DATE() AND CURRENT_DATE() + interval 5 DAY
GROUP BY c.currency, a.end_date
ORDER BY  a.end_date;
`)
  return res.status(200).json({
    success: true, data: {
      data: data[0], expired: expired[0], five: five[0], chart
    }
  })
});
router.get("/by/:id", protect, authorize(1), type(1, 2, 89), async (req, res) => {
  const knex = await Contract.knex()

  const data = await knex.raw(`
    SELECT c.id, sum(a.residual_amount) as residual_amount,c.currency
    FROM contracts c 
    LEFT JOIN (SELECT * FROM acts WHERE id IN (SELECT MAX(id) FROM acts a WHERE a.status = 1 GROUP BY contract_id) ) a ON a.contract_id = c.id 
    WHERE c.${req.query.type} = ${req.params.id} AND c.status = 1 
    GROUP By currency
    ORDER BY c.id DESC;
    `)

  const expired = await knex.raw(`
    SELECT c.id,sum(a.residual_amount) as residual_amount,c.currency, a.end_date
  FROM contracts c 
  LEFT JOIN (SELECT * FROM acts WHERE id IN (SELECT MAX(id) FROM acts a WHERE a.status = 1 GROUP BY contract_id) ) a ON a.contract_id = c.id 
  WHERE c.${req.query.type} = ${req.params.id} AND c.status = 1 and a.end_date < CURRENT_DATE()
  GROUP By currency
  ORDER BY c.id DESC;
    `)

  const five = await knex.raw(`
  SELECT c.id,
  sum(a.residual_amount) AS residual_amount,
  c.currency,
  a.end_date, 
  GROUP_CONCAT(a.end_date) AS endDate,
  GROUP_CONCAT(a.residual_amount) AS residualAmount
FROM contracts c
LEFT JOIN
(SELECT *
  FROM acts
  WHERE id IN
     (SELECT MAX(id)
    FROM acts
      GROUP BY contract_id) ) a ON a.contract_id = c.id
WHERE c.status = 1 AND c.${req.query.type} = ${req.params.id} AND a.end_date BETWEEN CURRENT_DATE() AND CURRENT_DATE() + interval 5 DAY
GROUP BY c.currency, a.end_date
  `)
  console.log(five[0])
  return res.status(200).json({
    success: true, data: {
      data: data[0], expired: expired[0], five: five[0]
    }
  })
});
router.get('/hisobot', protect, authorize(1), type(1, 2, 89), async (req, res) => {
  const candidate = jwt.decode(req.headers.authorization.split(" ")[1]);
  const knex = await Contract.knex()
  const news = await knex.raw(`SELECT * FROM contracts as c where c.${req.query.type} = ${candidate.id} AND c.status = 1;`)
  const tugallangan = await knex.raw(`SELECT * FROM contracts as c where c.${req.query.type} = ${candidate.id} AND c.status = 2;`)
  const rad = await knex.raw(`SELECT * FROM contracts as c where c.${req.query.type} = ${candidate.id} AND c.status = 3;`)
  const data = {
    jarayon: news[0].length,
    tugallangan: tugallangan[0].length,
    rad: rad[0].length

  }
  res.status(200).json({ success: true, data })
})
router.get('/hisob', async (req, res) => {
  const candidate = jwt.decode(req.headers.authorization.split(" ")[1]);
  const all = await Report.knex()
  console.log(req.query.status)
  const dd = await all.raw(`SELECT r.id,
  c.number,
  r.time,
  r.created_at,
  r.amount,
  r.type,
  r.user_id,
  CONCAT(u.last_name, ' ', u.first_name, ' ',u.middle_name,'') AS dname,
  u.company,
  u.type as utype,
  r.reciver,
  r.all
FROM report AS r
LEFT JOIN contracts c ON c.id = r.contract
LEFT JOIN users u ON u.id = r.reciver
WHERE r.user_id = ${candidate.id}
ORDER BY r.id DESC
LIMIT 6;`)
  return res.status(200).json({ success: true, data: dd[0] })
})
router.get('/cs', async (req, res) => {
  const candidate = jwt.decode(req.headers.authorization.split(" ")[1]);
  const all = await Report.knex()
  console.log(req.query.status)
  const dd = await all.raw(`SELECT r.id,
  c.number,
  r.time,
  r.created_at,
  r.amount,
  r.type,
  r.user_id,
  CONCAT(u.last_name, ' ', u.first_name, ' ',u.middle_name,'') AS dname,
  CONCAT(cc.last_name, ' ', cc.first_name, ' ',cc.middle_name,'') AS cname,
  u.company as dcompany,
  cc.company as ccompany,
  u.type as dtype,
  cc.company as ctype,
  r.reciver,
  r.all
FROM report AS r
LEFT JOIN contracts c ON c.id = r.contract
LEFT JOIN users u ON u.id = r.reciver
LEFT JOIN users cc ON cc.id = r.user_id
WHERE r.user_id = ${candidate.id}
AND r.all = ${req.query.status}
ORDER BY r.id DESC
LIMIT 15;`)
  return res.status(200).json({ success: true, data: dd[0] })
})
module.exports = router;
