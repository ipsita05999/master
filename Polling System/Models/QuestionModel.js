const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const QuestionSchema = new Schema({
  title:{
    type:String,
    required: true
  },
  options:[
    {
      type:mongoose.Schema.Types.ObjectId,
      ref:'Option'
    }
  ]
})

const Question = mongoose.model('Question',QuestionSchema);

module.exports= Question;
