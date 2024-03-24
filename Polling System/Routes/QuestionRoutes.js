const express= require('express');
const QuestionController = require('../Controllers/QestionController');

const router= express.Router();

router.post('/questions/create', QuestionController.createQuestion);
router.get('/questions/:id', QuestionController.showQuestions);
router.delete('/questions/:id/delete', QuestionController.deleteQuestion);

module.exports=router;
