const express = require('express');
const path = require('path');
const Razorpay = require('razorpay');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(__dirname + '/public'));//app starts using static files

//creating instance of Razorpay
//key_id and key_secret generated from razorpay
let razorpay = new Razorpay({
    key_id: "rzp_test_tyLzWcNAc6Y5Ol",
    key_secret:"tFFGstMQog8SwMSm8YWrHtYm"
});

//get request to render home page
app.get('/' , (req,res)=>{
    res.status(200).sendFile(path.join(__dirname + '/index.html'));
})

//post request for getting order_id and returning it.
app.post('/orders' , (req,res)=>{
    let options = {
        amount: req.body.amount*100,  // amount in the smallest currency unit
        currency: "INR"
    };

    //order is a json object containing order_id and meta data
    razorpay.orders.create(options, (err , order)=> {
        console.log(order);    
        res.json(order);
    });
});

//server on 127.0.0.1:80
const port = process.env.PORT || 80;
const host = '127.0.0.1';

//server starts listening
app.listen(port , ()=>{
    console.log(`the server started at : http://${host}:${port}`);
})