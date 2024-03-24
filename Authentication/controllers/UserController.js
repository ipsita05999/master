const User = require("../models/UserModel");
const googleAuthUser = require('../models/GoogleAuthModel');
const secretKey = "6LdO7U8pAAAAAAMjB_7DnP5yzptTW9j4UiBtoC90";
const axios = require("axios");
const bcrypt = require("bcrypt");
const { response } = require("express");
const nodemailer = require('nodemailer');
const saltRounds = 10;
const passport= require('passport');

const showLogInPage = (req, res) => {
  res.render("logIn", { title: "LogIn" });
};

const showSignUpPage = (req, res) => {
  res.render("signUp", { title: "Create Account" });
};

const showHomePage = (req, res) => {
    res.render("home", { title: "Home" });
};

const showResetPPage = (req, res) => {
  res.render("resetPassword", { title: "Reset Password" });
};
const showForgotPPage = (req,res)=>{
  res.render('forgotPassword',{title:'Forget Password'});
}
const showUnautherizedPage = (req, res)=>{
res.render('notAuthenticated', {title:'Not Authenticated'});
}

const createNewUser = async (req, res) => {
  const recaptchaBody = req.body["g-recaptcha-response"];
  const verificationURL = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${recaptchaBody}`;
  try {
    const response = await axios.post(verificationURL);
    const { success } = response.data;
    if (success) {
      bcrypt.hash(req.body.cpassword, saltRounds, (err, hash) => {
        if (err) {
          console.log(err);
          return;
        } else {
          console.log("in bcrypt ", hash);
          const newUser = new User({
            Name: req.body.name,
            Email: req.body.email,
            Password: hash,
          });
          newUser
            .save()
            .then((result) => {
              res.json({ redirect: `/logIn` });
            })
            .catch((err) => {
              console.log(err);
            });
        }
      });
    } else {
      res.json({ redirect: "", error: "Please click on Captcha" });
    }
  } catch (error) {
    console.log("internal server error");
    res.status(500).send("Internal Server Error");
  }
};

const logInHomePage = async (req, res) => {
  const recaptchaBody = req.body["g-recaptcha-response"];
  const verificationURL = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${recaptchaBody}`;
  try {
    const response = await axios.post(verificationURL);
    const { success } = response.data;
    if (success) {
      let email = req.body.email;
      User.find({ Email: email })
        .then((response) => {
          console.log(response);
          if(response.length > 0){
          bcrypt.compare(
            req.body.password,
            response[0].Password,
            (err, result) => {
              if (err) {
                console.error("Error comparing passwords:", err);
                res.status(500).send(err);
              }
              if (result === true) {
                res.json({ redirect: `/home`, res: response[0] });
              } else {
                res.json({ redirect: "", error: "Password does not match" });
              }
            }
          );
        }
        else{
          res.json({redirect: "", error: "It seems like, you don't have an account!"})
        }
        })
        .catch((err) => {
          console.log("Error ", err);
          res.json({ redirect: "", error: "User Not founnd" });
        });
    } else {
      res.json({ redirect: "", error: "Please click on Captcha" });
    }
  } catch (error) {
    console.log("internal server error");
    res.status(500).send("Internal Server Error");
  }
};

const updatePassword = (req, res) => {
  bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
    if (err) {
      console.log(err);
      return;
    } else {
      User.findByIdAndUpdate(req.params.id, { Password: hash })
        .then((response) => {
          res.json({ redirect: "/home" });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  });
};


const getUserDetails = (req,res)=>{
  console.log(req.params.id)
  User.findById(req.params.id)
  .then(response=>{
    console.log(response);
    res.json({redirect:'',user_data:response})
  })
  .catch(err=>{
    console.log(err.message);
  })
}
const generatePassword = (req,res)=>{
  User.find({Email:req.body.email})
  .then(response=>{
    console.log(response);
    if(response.length >0){
    const id = response[0]._id;
    const randomPassword = Math.random().toString(36).slice(2) +
    Math.random().toString(36)
    .toUpperCase().slice(2);
    bcrypt.hash(randomPassword, saltRounds, (err, hash) => {
      if (err) {
        console.log(err);
        return;
      } else {
        User.findByIdAndUpdate(id,{Password:hash})
        .then(result=>{
          const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: 'authenticationapp18@gmail.com',
              pass: 'bnfktkzufsdjwxna'
            },
          });
          const mailOptions = {
            from: 'authenticationapp18@gmail.com',
            to: req.body.email,
            subject: 'Authentication App : Random Password',
            text: `
            Hello, 

            Your new random password is: ${randomPassword}
            Kindly reset the password once login.
            
            Thanks,
            Athentication App Team`,
          };
          transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
              return console.error('Error sending email:', error);
            }
            res.json({redirect:'/logIn'})
          });
        })
        .catch(err=>{
          console.log(err);
        })
      }
    });
  }
  else{
    res.json({redirect:'',error:'Email id is not registered. Please create an Account.'})
  }
  })
}


module.exports = {
  showLogInPage,
  showSignUpPage,
  createNewUser,
  logInHomePage,
  showHomePage,
  showResetPPage,
  updatePassword,
  getUserDetails,
  showForgotPPage,
  generatePassword,
  showUnautherizedPage,
};
