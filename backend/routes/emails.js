const express = require('express');

const router = express.Router();
const emailcontroller = require('../controllers/email');
// const userauthentication = require('../middleware/auth');


router.post('/useremails',emailcontroller.addMail);//userauthentication.authenticate,expensecontroller.addExpense);

module.exports = router;