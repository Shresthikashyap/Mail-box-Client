const express = require('express');

const router = express.Router();
const emailcontroller = require('../controllers/email');
// const userauthentication = require('../middleware/auth');


router.post('/useremails',emailcontroller.addEmail);//userauthentication.authenticate,expensecontroller.addExpense);
router.get('/getemails',emailcontroller.getEmails);

module.exports = router;