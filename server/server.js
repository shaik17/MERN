const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const users = require('./routes/api/users');
const app = express();

//apply bodyParser middleWare
app.use(bodyParser.urlencoded({extended:true,limit:"50mb",parameterLimit:50000}));
app.use(bodyParser.json({limit:"50mb"}));

//passport MiddleWare
app.use(passport.initialize());

// passport config

require('./config/passport')(passport);

//load files

//const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const post  = require('./routes/api/post');

//use routes

app.use('/api/users',users);
app.use('/api/profile',profile);
app.use('/api/post',post);

// connect DB
const db = require('./config/key').mongoURI;

// connect mongoose
mongoose
.connect(db)
.then(()=> console.log("MongoDB connected"))
.catch(err=>console.log(err));
const port = process.env.PORT || 5000;
app.listen(port,()=>console.log(`server running on port ${port}`));

