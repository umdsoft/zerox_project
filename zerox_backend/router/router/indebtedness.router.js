const router = require("express").Router();
const Contract = require("../../models/contract.model");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const { protect, authorize, type } = require("../../middleware/auth");

router.get("/q ", protect, authorize(1), type(1, 2, 89),async (req, res) => {
  
  const candidate = jwt.decode(req.headers.authorization.split(" ")[1]);

  //   const debitorUSD = await Contract.find({ status: "1",currency:'USD', debitor: candidate.id })
  //   let sumDebitorUsd = 0;
  //   for(let i = 0; i<debitorUSD.length;i++){
  //       sumDebitorUsdd += debitorUSD[i].amount
  //   }
  //   res.status(200).json({success: true,data: sumDebitorUsdd})

 const debitorUsd = await Contract.aggregate([
    {
      $match: {
        $and: [
          {
            status: "1",
            currency: "USD",
            debitor: mongoose.Types.ObjectId(candidate.id),
          },
        ],
      },
    },
    {
      $group: {
        _id: "$_id",
        amount: { $sum: "$amount" },
      },
    },
    {
        $project: {amount: 1,_id:0}
    }
  ])
  const debitorUsz = await Contract.aggregate([
    {
      $match: {
        $and: [
          {
            status: "1",
            currency: "UZS",
            debitor: mongoose.Types.ObjectId(candidate.id),
          },
        ],
      },
    },
    {
      $group: {
        _id: "$_id",
        amount: { $sum: "$amount" },
      },
    },
    {
        $project: {amount: 1,_id:0}
    }
  ])
  const creditorUsd = await Contract.aggregate([
    {
      $match: {
        $and: [
          {
            status: "1",
            currency: "USD",
            creditor: mongoose.Types.ObjectId(candidate.id),
          },
        ],
      },
    },
    {
      $group: {
        _id: "$_id",
        amount: { $sum: "$amount" },
      },
    },
    {
        $project: {amount: 1,_id:0}
    }
  ])
  const creditroUsz = await Contract.aggregate([
    {
      $match: {
        $and: [
          {
            status: "1",
            currency: "UZS",
            creditor: mongoose.Types.ObjectId(candidate.id),
          },
        ],
      },
    },
    {
      $group: {
        _id: "$_id",
        amount: { $sum: "$amount" },
      },
    },
    {
        $project: {amount: 1,_id:0}
    }
  ])

  return res.status(200).json({success: true,data:{debitorUsz,debitorUsd,creditroUsz,creditorUsd}})
});

module.exports = router;
