const mongoose = require("mongoose");

const bankSchema = mongoose.Schema({
    account_no:{
    type:Number,
        required:true
},
    firstname:{
        type:String,
        required:true
    },
    lastname:{
        type:String,
        required:true

    },
    balance:{
        type:Number,
        required:true
    }
})
const Bank = mongoose.model("Bank",bankSchema);

module.exports = Bank;