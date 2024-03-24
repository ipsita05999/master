const mongoose = require('mongoose');
const Schema = mongoose.Schema;

OptionSchema = new Schema({
  title:{
    type:String,
    required:true
  },
  question:{
    type:mongoose.Schema.Types.ObjectId,
    required:true
  },
  votes:{
    type:Number,
    default:0
  },
  add_vote:{
    type:String
  }
})

const Option = mongoose.model('Option',OptionSchema);

module.exports= Option;