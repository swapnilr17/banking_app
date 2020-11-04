require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const bank = require('./Models/customer');
const transaction = require('./Models/transaction');
const app = express();
const username = process.env.username;
const password = process.env.password;
app.use(express.urlencoded({extended: false}));
app.set('view engine', 'ejs');
app.use(express.static('public'));

mongoose.connect('mongodb+srv://'+username+':'+password+'@database.kdl58.mongodb.net/banking?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true});

app.get('/',async (req,res)=>{
    const customers= await bank.find();
    res.render('home',{details:customers});
})

app.get('/transaction',async (req,res)=>{
    const customers= await bank.find();
    const person = await bank.findOne({account_no:req.query.acno});
    res.render('transaction',{details:customers,acno:req.query.acno,person:person});
})

app.post('/transact/:sender',async(req,res)=>{
    const amount = req.body.amount;
    const receiver_name = req.body.name;
    const detail = await bank.findOne({account_no:req.params.sender});
    const sender_name = detail.firstname+" "+detail.lastname;
    if(detail.balance>=amount)
    {
        const detail2 = await bank.findOne({firstname:receiver_name});
        console.log(detail2);
        detail2.balance=parseInt(detail2.balance) + parseInt(amount);
        detail.balance=detail.balance - amount;
        detail.save();
        detail2.save();
        await transaction.create({sendername:sender_name,amount:amount,receivername:receiver_name})
        res.render('successful');
    }
    else{
        res.render("error")
    }
})


app.get('/trecord',async (req,res)=>{
    const customers= await transaction.find();
    res.render('transaction-record',{details:customers});
})


app.listen(process.env.PORT||3000,()=>{
    console.log("Server is running");
})