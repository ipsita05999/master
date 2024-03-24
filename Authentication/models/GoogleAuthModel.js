const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const googleAuthSchema = new Schema({
  _id: {
    type: Number,
    required: true
  },
  Email:{
    type: String,
    required: true
  },
  Name:{
    type: String,
    required: true
  }
}, {timestamps: true});


const GoogleAuthUser = mongoose.model('GoogleAuthUser',googleAuthSchema);

module.exports= GoogleAuthUser;