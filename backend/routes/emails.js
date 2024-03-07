const express = require('express');

const router = express.Router();
const emailcontroller = require('../controllers/email');
const userauthentication = require('../middleware/auth');


router.post('/useremails',userauthentication.authenticate,emailcontroller.addEmail);
router.get('/getemails',userauthentication.authenticate,emailcontroller.getEmails);
router.get('/fetchemail/:id',userauthentication.authenticate,emailcontroller.fetchEmail);
router.get('/emailscount',userauthentication.authenticate,emailcontroller.readEmails);
router.delete('/deleteemail/:id',userauthentication.authenticate,emailcontroller.deleteEmail);
router.get('/sentemails',userauthentication.authenticate,emailcontroller.sentEmails);

module.exports = router;