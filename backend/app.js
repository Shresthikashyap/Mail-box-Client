const path = require('path');
const express = require('express');
const bodyParser = require('body-parser'); 
const mongoose = require('mongoose');
const cors = require('cors');

const userRoutes = require('./routes/user');
const emailRoutes = require('./routes/emails');
const resetPasswordRoutes =  require('./routes/resetpassword');

const app = express();
require('dotenv').config({ path: './.env' });



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(cors({ origin: '*' })); 

app.use('/users',userRoutes)
app.use('/emails',emailRoutes)
app.use('/password',resetPasswordRoutes);

mongoose.connect(process.env.MONGODB_URL,{ useNewUrlParser: true, useUnifiedTopology: true })
.then(()=>{
    console.log('here')
    app.listen(3001,()=>{
        console.log('server is listening');
    })
})
.catch(err=>{
    console.log(err);
})
