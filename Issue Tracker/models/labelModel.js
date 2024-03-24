const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const labelSchema = new Schema({
  LabelName: {
    type: String,
    required: true
  },
  IsActive:{
    type:String,
    required: true
  }
}, {timestamps: true});


const Label = mongoose.model('Label',labelSchema);

module.exports= Label;