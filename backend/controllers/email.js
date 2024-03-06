const Email = require('../models/email');

const addMail = async (req, res) => {
  try {
    const { content } = req.body;

    // Create a new Email document
    const email = new Email({
      content
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
// const getExpenses = async(req, res) => {
  
//     try {
//     console.log('***** ',req.user._id) //id or _id
//     const expenses = await Expense.find({ userId: req.user._id });
//     //console.log(expenses) 
    
//     const user = await User.findOne({_id: req.user._id});
//     //console.log('total  ',user)

//     res.status(200).send({ expenses, total:user.totalExpense, success: true });
//   } 
//   catch (err) {
//     console.log(err);
//     res.status(500).json({ error: err });
//   }
// };

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
// const deleteExpense = async(req, res) => {

//   try {
   
//     const expenseId = req.params.id;
//     //const {cost} = req.body; 
//    console.log('******** ',expenseId)
//     if (expenseId=='undefined') {
//       console.log('ID is missing');
//       return res.status(400).json({ err: 'Id is missing' });
//     }

//     const expense = await Expense.findById(expenseId);
//     console.log('***********',expense.amount);
   
//     if (!expense) {  
//       return res.status(404).json({ err: 'Expense not found' });  
//     }  
    
//     const deletedExpense = await Expense.deleteOne({_id: expenseId});
//     console.log(deletedExpense);
    
//     const totalExpense = Number(req.user.totalExpense) - Number(expense.amount);
    
//     if(totalExpense<0){
//       await User.findOneAndUpdate({_id: req.user._id},{totalExpense:0});
//     }else{
//       await User.findOneAndUpdate({_id: req.user._id},{totalExpense:totalExpense});
//     }

//     res.status(200).json({total:totalExpense, success:true });
//   } 
//   catch (err) {
  
//     res.status(500).json({ error: err });
//   }
// };

module.exports={
  addMail
}