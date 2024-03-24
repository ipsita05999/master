const Question = require('../Models/QuestionModel');
const Option = require('../Models/OptionModel');


const createQuestion = async (req, res)=>{
 // console.log(req.url, req.body);
  await Question.create(req.body)
  .then(result=>{
    console.log('Question has been created successfully')
      res.send(result);
  })
  .catch(err=>{
    console.log('Question couldn\'t be created successfully')
      res.send(err);
  })
}

const showQuestions = (req, res)=>{
  Question.find({_id:req.params.id})
  .then(result=>{
    res.send(result);
  })
  .catch(err=>{
    console.log('Something went wrong!')
  })
}

const deleteQuestion = (req, res)=>{
  Option.deleteMany({question:req.params.id})
  .then(result=>{
    Question.findByIdAndDelete(req.params.id)
    .then(r=>{
      console.log('Question deleted successfully!')
      res.send(r);
    })
    .catch(err=>{
      console.log('Question couldn\'t be deleted!')
      res.send(err);
    })
  })

}

module.exports={
  createQuestion,
  showQuestions,
  deleteQuestion,
}