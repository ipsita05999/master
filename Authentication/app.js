const express = require('express');
const app = express();
const mongoose = require('mongoose');
const userRouter = require('./routers/UserRouter');
const bodyParser = require('body-parser');
const passport = require('passport');
const googleAuthUser = require('./models/GoogleAuthModel');
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const session = require('express-session');
const authRoutes = require('./routers/GoogleAuthRouter');
require('dotenv').config();


app.set('view engine', 'ejs');
app.use(bodyParser.json());
//app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));


const dbURI= 'mongodb+srv://BLOGS:Test1234@nodetuts.64oyqps.mongodb.net/test?retryWrites=true&w=majority';
mongoose.connect(dbURI)
.then(result=>{app.listen(5000)})
.catch(err=>{console.log(err)})

app.use(session({ secret: 'your-secret-key', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: 'http://localhost:5000/auth/google/callback',
},
async (accessToken, refreshToken, profile, done) => {
  try {
    let user = await googleAuthUser.findOne({ _id: profile.id });

    if (!user) {
      user = await googleAuthUser.create({
        _id: profile.id,
        Email: profile.email,
        Name: profile.displayName,
      });
    }

    return done(null, user);
  } catch (error) {
    return done(error);
  }
}));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await googleAuthUser.findById(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});



app.get('/',(req,res)=>{
  res.redirect('/logIn');
});

app.use(userRouter);

app.use('/auth', authRoutes);

app.use((req,res)=>{
  res.status(404).render('notFound', {title:'Not Found'});
});
