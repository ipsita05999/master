const express = require('express');
const app = express();
const mongoose = require('mongoose');
const projectRouter = require('./routes/projectRouter');
const masterRouter = require('./routes/masterRouter')

app.set('view engine', 'ejs');
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));

//connect to db
const dbURI= 'mongodb+srv://BLOGS:Test1234@nodetuts.64oyqps.mongodb.net/test?retryWrites=true&w=majority';
mongoose.connect(dbURI)
.then(result=>{app.listen(5500)})
.catch(err=>{console.log(err)})


app.get('/',(req,res)=>{
  res.redirect('/projects');
});

app.use(projectRouter);
app.use(masterRouter);

app.use((req,res)=>{
  res.status(404).render('notFound', {title:'Not Found'});
});
