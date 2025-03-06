import mongoose, { mongo } from "mongoose";
import { Schema } from "mongoose";

const paymentSchema=new Schema({
    wallet_id:{
        type:Schema.Types.ObjectId,
        ref:'Account',
        required:true
    },
    sender_key:{
        type:String,
        required:true
    },
    reciever_key:{
        type:String,
        required:true
    },
    amount:{
        type:Number,
        required:true,
    },
    category:{
        type:String,
        required:true,
    }
},{timestamps:true})

export const Payment=mongoose.model('Payment',paymentSchema);