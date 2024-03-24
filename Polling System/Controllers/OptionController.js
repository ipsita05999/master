const Question = require('../Models/QuestionModel');
const Option = require('../Models/OptionModel');

const createOption = (req, res)=>{
  Option.create({
    title: req.body.title,
    question: req.params.id
  })
  .then(result=>{
    Option.findByIdAndUpdate(result._id,{add_vote:`http://localhost:3000/options/${result._id}/add_vote`}).select('-question')
    .then(result2=>{ 
      console.log('result2:', result2)
      let result2Array = [];
      Question.findById(req.params.id).select('-_id')
      .then(r=>{
        r.options.push(result2)
        result2Array = r.options;
        Question.findByIdAndUpdate(req.params.id,{options:result2Array})
        .then(result3=>{
          console.log('Option has been created!');
          res.send(result3);
      })
      })
      .catch(err=>{
        console.log('Option couldn\'t be created!');
        res.send(err);
      })
    })
  })
}

const deleteOption= (req, res)=>{
  Option.findByIdAndDelete(req.params.id)
  .then(result=>{
    console.log('Option deleted successfully!')
    res.send(result);
  })
  .catch(err=>{
    console.log('Options has not been deleted!');
    res.send(err);
  })
}

const increaseVote = (req, res) =>{
  Option.findByIdAndUpdate(req.params.id,{$inc:{votes:1}})
  .then(result=>{
    console.log('You have successfully Voted!');
    res.send(result);
  })
  .catch(err=>{
    console.log('Vote could not be registered!');
    res.send(err);
  })
}

module.exports={
  createOption,
  deleteOption,
  increaseVote
}