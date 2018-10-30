const express = require('express')
const session = require('express-session');
const bodyParser = require('body-parser')
const path = require('path');
const cors = require('cors')
const flash = require('connect-flash');
const passport = require('passport');
const Store = require('express-session').Store;
const app = express()
app.use(cors())

app.use( bodyParser.json() );
app.use(bodyParser.urlencoded({extended:false}))

app.use(passport.initialize())

app.use('/' ,require('./routes/index.js'))
app.use('/users',require('./routes/user.js'))

app.use(function(req,res,next){
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
})

app.use(function(err,req,res,next){
    res.status(err.status || 500);
    res.send('error',{message:err.message,error:err})
    //res.status(status).send(body)
})

const server = app.listen(process.env.PORT || 3001,function(){
    console.log('Server is started on port: '+server.address().port)
})