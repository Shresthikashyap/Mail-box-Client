const Email = require('../models/email');

const addEmail = async (req, res) => {
  try {
    const { content } = req.body;

    // Create a new Email document
    const email = new Email({
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

/**************  get all expenses of database  *************/
const getEmails = async(req, res) => {
  
    try {
    console.log('***** ') 
    
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

  if (!email) {
    return res.status(404).json({ success: false, message: 'Email not found' });
  }

  email.isRead = true;
  await email.save();

  
  
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
  console.log('*****yo ',req.user.id) 
  const id= req.user.id

  const emails = await Email.find({ userId: id, isRead: false });
  
  const count = emails.length;
  console.log('count ',count)
  
  res.status(200).send({ count, success: true });
} 
catch (err) {
  console.log(err);
  res.status(500).json({ error: err });
}
};

// /******************   download expenses **********************/
// const downloadExpenses = async(req,res) => {
//   try{
    
//     console.log('****************',req.user._id)
//     //const expenses = await UserServices.getExpenses(req);
//     const expenses = await Expense.find({userId:req.user._id})
     
//     console.log('****************',expenses)
//     const stringifiedExpenses = JSON.stringify(expenses);

//     const userId = req.user._id;

//     const fileName = `Expense${userId}/${new Date()}.txt`;   

//     const fileUrl = await S3Service.uploadToS3(stringifiedExpenses, fileName);
    
//     const file = new downloadedFile({ url: fileUrl, userId: userId});
//     file.save();

//     res.status(200).json({fileUrl, success: true});
//   }
//   catch(err){
//     res.status(500).json({fileUrl:'',success:false,err:err})
//   } 
// }

// /************Update expense *************/
// const updateExpense = async(req,res) =>{
  
//   try {

//     let userId = req.params.id;
//     if (userId == 'undefined'){
//       return res.status(400).json({ err: 'Id is missing' });
//     }

//     const expense = await Expense.findById(userId);
//     console.log('expense id ',expense._id);
//     const {amount, description, category } = req.body; 
//     console.log('body*************', req.body)
    
//     const updatedTotal = Number(req.user.totalExpense) - Number(expense.amount);
//     const total = Number(updatedTotal) + Number(amount);
//     if(total<0){
//       await User.findOneAndUpdate({_id: req.user._id},{totalExpense:0});
//     }else{
//       await User.findOneAndUpdate({_id: req.user._id},{totalExpense:total});
//     }

//     const updatedExpenseDetail = await Expense.findOneAndUpdate({_id: expense._id},{ amount:amount, description:description, category:category},{ new: true }); 

//     console.log('****************** update ',updatedExpenseDetail)
//     res.status(201).json({ expense : updatedExpenseDetail,total: total});

//   } catch (err) {
//     res.status(500).json({ error: err });
//   }
// }

// /***************     delete the expenses  ******************/
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
  addEmail, getEmails, fetchEmail, readEmails, deleteEmail
}