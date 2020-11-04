const mongoose = require("mongoose");

const transactionSchema = mongoose.Schema({
    sendername:{
        type:String,
        required:true
    },
    amount:{
        type:Number,
        required:true
    },
    receivername:{
        type:String,
        required:true
    },
})
const Transaction = mongoose.model("Transaction",transactionSchema);

module.exports = Transaction;