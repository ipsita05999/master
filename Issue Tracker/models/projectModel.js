const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const projectSchema = new Schema({
  Name: {
    type: String,
    required: true
  },
  Description:{
    type: String,
    required: true
  },
  Author:{
    type: String,
    required: true
  }
}, {timestamps: true});


const Project = mongoose.model('Project',projectSchema);

module.exports= Project;