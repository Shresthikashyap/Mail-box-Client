const Email = require('../models/email');

const addEmail = async (req, res) => {
  try {
    console.log(req.body)
    const { content } = req.body;

    // Create a new Email document
    const email = new Email({
      sender:req.user.email,
      receiver:req.body.to,
      content,
      isRead:false,
      userId:req.user.id
    });

    // Save the email to the database
    await email.save();

    res.status(201).json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getEmails = async(req, res) => {
  
    try {
    console.log('***** ',req.user) 
    
    const userSender = await Email.find({userId:req.user.id});
    const userReceiver = await Email.find({receiver:req.user.email});

    const emails = [...userReceiver, ...userSender];
    res.status(200).send({ emails, success: true });
  } 
  catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
};

const sentEmails = async(req, res) => {
  
  try {
  console.log('***** ',req.user) 
  
  const emails = await Email.find({userId:req.user.id});
  
  res.status(200).send({ emails, success: true });
} 
catch (err) {
  console.log(err);
  res.status(500).json({ error: err });
}
};

const fetchEmail = async(req, res) => {
  
  try {
  console.log('*****yo ',req.params.id) 
  const id= req.params.id
  const email = await Email.findOne({_id:id});
  console.log(req.user.id ,' ', req.params.id)
  if (!email) {
    return res.status(404).json({ success: false, message: 'Email not found' });
  }
  
   //only save to true when the receiver opens the mail
  if(req.user.id !== email.userId.toString()){
      email.isRead = true;
      await email.save();
  }
  
  res.status(200).send({ email, success: true });
} 
catch (err) {
  console.log(err);
  res.status(500).json({ error: err });
}
};

const readEmails = async(req, res) => {
  console.log('here')
  try {
  console.log('*****yo ',req.user) 
  //const id= req.user.id

  const emails = await Email.find({ receiver: req.user.email, isRead: false });
  
  const count = emails.length;
  console.log('count ',count)
  
  res.status(200).send({ count, success: true });
} 
catch (err) {
  console.log(err);
  res.status(500).json({ error: err });
}
};

const deleteEmail = async(req, res) => {

  try {
   console.log('******** ',req.params.id)
    const id = req.params.id;
  
   
    // if (id=='undefined') {
    //   return res.status(400).json({ err: 'Id is missing' });
    // }
    
    await Email.deleteOne({_id: id});

    res.status(200).json({ success:true });
  } 
  catch (err) {
  
    res.status(500).json({ error: err });
  }
};

module.exports={
  addEmail, getEmails, fetchEmail, readEmails, sentEmails, deleteEmail
}