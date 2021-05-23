let btn = document.getElementById("sub-btn");
let amount = document.querySelector('#amount');
let names = document.querySelector('#names');
let email = document.querySelector('#email');
let phone_number = document.querySelector('#number');
btn.addEventListener('click' , solve);

let pop_up_btn = document.querySelector('#pop-up-btn');
pop_up_btn.addEventListener('click',open);

function solve(){
    // document.getElementById('form').style.display = 'none';
    document.getElementById('header').style.opacity = 0.1;
    let form_data = {
        amount : amount.value,
        name : names.value
    };

    const data_send ={
        method : 'POST',
        headers : {
            'Content-type' : 'application/json'
        },
        body : JSON.stringify(form_data)
    };

    console.log(form_data);

    fetch('/orders' , data_send).then(info => info.json()).then(data =>{
        var options = {
            "key": "rzp_test_tyLzWcNAc6Y5Ol", // Enter the Key ID generated from the Dashboard
            "amount": amount.value, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
            "currency": "INR",
            "name": "The Sparks Foundation",
            "description": "Donation To The Sparks Foundation",
            "image": "https://www.thesparksfoundationsingapore.org/images/logo_small.png",
            "order_id": data.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
            "handler": function (response){
                let today = new Date();
                let dd = String(today.getDate()).padStart(2, '0');
                let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
                let yyyy = today.getFullYear();

                today = mm + '/' + dd + '/' + yyyy;
                Email.send({
                    Host: "smtp.gmail.com",
                    Username: "shivamkoolwal20@gmail.com",
                    Password: "#shiVAM123",
                    To: "shivamkoolwal14@gmail.com",
                    From: "shivamkoolwal20@gmail.com",
                    Subject: "Transaction Details",
                    Body: `Payment Successful<br/>
                            Transaction Id : ${response.transaction_id}<br/>
                            Amount : ${form_data.amount}<br/>
                            Name : ${form_data.name}<br/>
                            Number : ${phone_number}<br/>
                            Date : ${today}<br/>
                            Thank you for your generous gift to The Sparks Foundation. 
                            We are thrilled to have your support. Through your donation we have been able to accomplish and continue working towards our goal to inspire students, help them innovate and let them integrate to build the next generation humankind.
                            You truly make the difference for us, and we are extremely grateful!`, 
                  }).then(function (message) {
                      alert(`Payment Details Sent Succesfully to ${email.value}`);
                    });
            },
            "prefill": {
                "name": names.value,
                "email": email.value,
                "contact": phone_number.value
            },
            "notes": {
                "address": "Razorpay Corporate Office"
            },
            "theme": {
                "color": "#3399cc"
            }
        };
        var rzp1 = new Razorpay(options);
        rzp1.on('payment.failed', function (response){
                alert(response.error.code);
                alert(response.error.description);
                alert(response.error.source);
                alert(response.error.step);
                alert(response.error.reason);
                alert(response.error.metadata.order_id);
                alert(response.error.metadata.payment_id);
        });
        document.getElementById('sub-btn').onclick = function(e){
            rzp1.open();
            e.preventDefault();
        }
    });
}

function open(e){
    document.getElementById('header').style.backgroundColor = 'white';
    document.getElementById('form').style.display = 'flex';
    document.getElementById('sub-btn').style.display = 'block';
    document.getElementById('nav-bar').style.display = 'none';
    document.getElementById('main').style.display = 'none';
    document.getElementById('header').style.display = 'flex';
    document.getElementById('header').style.justifyContent = 'center';
    document.getElementById('header').style.alignItems = 'center';
}