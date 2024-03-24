const express = require('express');
const passport = require('passport');
const router = express.Router();
const loginController = require('../controllers/UserController');

const googleAuthUser = require('../models/GoogleAuthModel');


router.get('/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
   (req, res) => {
    const id = req.user._id;
    googleAuthUser.findById(id)
    .then(result=>{
      res.redirect(`/home`);
    })
  }
);
const isAuthenticated= (req,res,next) =>{
  console.log('req: ', req)
  if(req.isAuthenticated()){
    return next();
  }
  else{
    res.redirect('/notAuthenticated');
  }
}

router.get('/home',isAuthenticated, loginController.showHomePage);



module.exports = router;