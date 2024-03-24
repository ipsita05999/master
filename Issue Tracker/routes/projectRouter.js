const express= require('express');
const projectController = require('../controllers/projectController');

const router= express.Router();

router.get('/projects', projectController.getAllProjects);
router.get('/projects/create',projectController.goToCreatePage);
router.post('/projects',projectController.createNewProject);
router.get('/projects/:id', projectController.getAllIssue);
router.get('/projects/:id/report', projectController.reportIssue);
router.post('/projects/:id',projectController.createNewIssue);
router.delete('/projects/:id/issues/:issueid',projectController.deleteIssue);
router.delete('/projects/:id',projectController.deleteProject);
router.get('/projects/:id/search', projectController.getSearchData)

module.exports=router;