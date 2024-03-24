const express= require('express');
const masterController = require('../controllers/masterController');

const router= express.Router();

router.get('/master', masterController.getAllLabels);
router.post('/master',masterController.createNewLabel);
router.delete('/master/:id',masterController.deleteLabel);


module.exports=router;