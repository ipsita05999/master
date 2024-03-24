const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const QuestionRouter = require('./Routes/QuestionRoutes');
const OptionRouter = require('./Routes/OptionRotes');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));


const dbURI= 'mongodb+srv://BLOGS:Test1234@nodetuts.64oyqps.mongodb.net/test?retryWrites=true&w=majority';
mongoose.connect(dbURI)
.then(result=>{app.listen(3000)})
.catch(err=>{console.log(err)})

app.use(QuestionRouter);
app.use(OptionRouter);
