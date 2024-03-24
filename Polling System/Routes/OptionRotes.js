const express= require('express');
const OptionController = require('../Controllers/OptionController');

const router = express.Router();

router.post('/questions/:id/options/create', OptionController.createOption);
router.delete('/options/:id/delete', OptionController.deleteOption);
router.get('/options/:id/add_vote', OptionController.increaseVote);

module.exports=router;