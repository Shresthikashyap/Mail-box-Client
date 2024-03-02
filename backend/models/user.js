const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({

    name:{
        type: String,
        //required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    isPremium: {
        type: Boolean,
        default: false
    },
    totalExpense:{
        type: Number,
        default: 0
    },
    photo: {
        type:String
    },
    orderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order',
    }
});

module.exports = mongoose.model('User',userSchema);