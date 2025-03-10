import asyncHandler from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";

import { Payment } from "../models/payment.model.js";
import { Account } from "../models/account.model.js";

const sendPayment = asyncHandler(async (req, res) => {
    console.log(req.body)
    const { sender_key, receiver_key, amount, category,signature } = req.body;
    console.log(sender_key,receiver_key,amount,category);
    //checking sender key exists or not in wallet of user logged in
    const sender = await Account.findOne({public_key:sender_key });
    if (!sender) {
        return res.status(400).json({ message: "Sender key not found in wallet" });
    }
    const payment=await Payment.create({
        // wallet_id:sender,
        sender_key,
        receiver_key,
        amount,
        category,
        signature
    });
    return res.status(200).json({ message: "Payment sent successfully", payment });

})

const getPayments=asyncHandler(async(req,res)=>{
    console.log(req.body);
    const payments=await Payment.find().populate("sender_key");
    return res.status(200).json({ message: "Payments fetched successfully", payments });
})

export{sendPayment,getPayments};