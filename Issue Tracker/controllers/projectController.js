const Project = require('../models/projectModel');
const Issue = require('../models/issueModel');
const lodash = require('lodash');
const Label = require('../models/labelModel');

//get all the projects
const getAllProjects= (req,res)=>{
  Project.find().sort({createdAt: -1})
.then(result=>{
  res.render('project',{title:'Home', projects:result})
})
.catch(err=>{
  console.log(err);
})
}

//go to the create page
const goToCreatePage = (req,res)=>{
  res.render('create', {title:'Create'});
}

//create a new project
const createNewProject = (req,res)=>{
  const newProj = new Project({
    Name:req.body.Name,
    Description: req.body.Description,
    Author: req.body.Author,
  });

  newProj.save()
  .then(result=>{
    res.redirect('/projects');
  })
  .catch(err=>{
    console.log(err);
  })
}

const deleteProject = (req,res)=>{
  const id = req.params.id;
  Issue.deleteMany({projectId:id})
  .then(result=>{
    console.log('issue also deleted')
  })
  .catch(err=>{
    console.log(err);
  })

  Project.findByIdAndDelete(id)
  .then(result=>{
    res.json({redirect:`/projects`})
  })
  .catch(err=>{
    console.log(err);
  })
}

const getAllIssue = (req,res)=>{
  const id = req.params.id;
  Issue.find({projectId:id})
  .then(result=>{
    Project.findById(id)
    .then(projectResult =>{
      Label.find({IsActive:'Yes'}).select({"LabelName":1,"_id":0})
      .then(labels=>{
        let newRes= labels.map(item=>item.LabelName);
        res.render('issue',{Issues:result, title:'Issue',projectResult:projectResult, labels:newRes});
      })
      .catch(err=>{
        res.status(404).render('notFound', {title:'Not Found'})
      })
    })
    .catch(error=>{
      res.status(404).render('notFound', {title:'Not Found'});
    })
  })
  .catch(err=>{
    res.status(404).render('notFound', {title:'Not Found'});
  })
}

const reportIssue = (req,res)=>{
  const id= req.params.id;
  Label.find({IsActive:'Yes'}).select({"LabelName":1,"_id":0})
  .then(result=>{
    let newRes= result.map(item=>item.LabelName);
    //[...new Set(lodash.flattenDeep(result.map(item=>item.Label.split(','))))];
    res.render('report', {title:'Report An Issue',id:id, labels:newRes});
  })
  .catch(err=>{
    res.status(404).render('notFound', {title:'Not Found'});
  })
}

const createNewIssue = (req,res)=>{
  const id= req.params.id;
  const newIssue = new Issue({
    projectId: id,
    Title:req.body.Title,
    Description: req.body.Description,
    Author: req.body.Author,
    Label: req.body.Label.toString()
  });

  newIssue.save()
  .then(result=>{
    res.redirect(`/projects/${id}`);
  })
  .catch(err=>{
    console.log(err);
  })
}

const deleteIssue = (req, res)=>{
  const issueid = req.params.issueid;
  Issue.findByIdAndDelete(issueid)
  .then(result=>{
    res.json({redirect:`/projects/${req.params.id}`})
  })
  .catch(err=>{
    console.log(err);
  })
}
const getSearchData = (req,res)=>{
  let projectId= req.params.id;
  Issue.find({projectId:projectId})
  .then(result=>{
    res.json(result);
  })
  .catch(err=>{
    console.log(err);
  })
}

module.exports = {
  getAllProjects,
  goToCreatePage,
  createNewProject,
  getAllIssue,
  reportIssue,
  createNewIssue,
  deleteIssue,
  deleteProject,
  getSearchData
}