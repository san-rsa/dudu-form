require('dotenv').config()
const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const jwt= require('jsonwebtoken')
//const OTP = require('../../models/OTP')
const _ = require("lodash");
const nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars')
const path = require('path')





 router.post ('/send-mail', async (req, res) => {
   
    const data = JSON.parse(req.body.data)
    const file = req.files?.img  
    const signature = req.body.signature  

    console.log(signature);
    



    const  {
            address, app_date, bankruptcy_in_past_3years, broken_lease, children_minor, city, deposit,
            dob, email, employment, felony, fname, guarantor, how_do_you_plan_to_use_your_new_home,
            income_month, income_year, length, lname, origin, people_will_be_living_in_the_unit,
            pet, phone, rules, smoke, status,
    } = data


const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    type: 'gmail',
    user: process.env.EMAIL,
    pass: process.env.PASS_EMAIL
 }
});

const handlebarOptions = {
    viewEngine: {
        partialsDir: path.resolve('email'),
        defaultLayout: false,
    },
    viewPath: path.resolve('email'),
};


const handlebarOptions2 = {
  viewEngine: {
    // extname: '.hbs',
    layoutsDir: path.resolve('./email'),
    defaultLayout: false,
    partialsDir: path.resolve('./email'),
  },
  viewPath: path.resolve('./email'),
  // extName: '.hbs',
};





// use a template file with nodemailer
// transporter.use('compile', hbs(handlebarOptions))


const mailOptions = {
  from: process.env.EMAIL,
  to: process.env.EMAIL,
  subject: 'NEW TENANT AVAILABLE',
  template: "email",
  
  context: {
            address, app_date, bankruptcy_in_past_3years, broken_lease, children_minor, city, deposit,
            dob, email, employment, felony, fname, guarantor, how_do_you_plan_to_use_your_new_home,
            income_month, income_year, length, lname, origin, people_will_be_living_in_the_unit,
            pet, phone, rules, smoke, status, fullname: fname + " " + lname
  },

  // html: ,
  

  attachments: [{ filename: "id card", path: file?.tempFilePath}, {filename: "signature", path: signature }],

};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);

    
            return res.status(200).json({
                success: true,
                message: " created successfully ✅"
               
            }) 
  }
});



});





















module.exports = router;
