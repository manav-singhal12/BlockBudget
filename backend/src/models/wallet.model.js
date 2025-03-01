import mongoose from "mongoose";

const walletscema=new Schema({
    user_id:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    wallet_key:{
        type:String,
        required:true
    },
    
})