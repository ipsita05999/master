const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const issuesSchema = new Schema({
  projectId:{
    type: String,
    required: true
  },
  Title: {
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
  },
  Label:{
    type: String,
    required: true
  }
}, {timestamps: true});


const Issue = mongoose.model('Issue',issuesSchema);

module.exports= Issue;