const Label = require('../models/labelModel');


//get all the labels
const getAllLabels= (req,res)=>{
  Label.find()
.then(result=>{
  res.render('master',{title:'Master', data:result})
})
.catch(err=>{
  console.log(err);
})
}

//create a new label
const createNewLabel = (req,res)=>{
  const newLabel = new Label({
    LabelName:req.body.LabelName,
    IsActive: req.body.IsActive,
  });

  newLabel.save()
  .then(result=>{
    res.redirect('/master');
  })
  .catch(err=>{
    console.log(err);
  })
}

const deleteLabel = (req, res)=>{
  const id = req.params.id;
  Label.findByIdAndDelete(id)
  .then(result=>{
    res.json({redirect:`/master`})
  })
  .catch(err=>{
    console.log(err);
  })
}



module.exports = {
  getAllLabels,
  createNewLabel,
  deleteLabel,
}