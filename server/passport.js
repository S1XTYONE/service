const passport = require('passport')
const JwtStrategy = require('passport-jwt').Strategy
const {ExtractJwt} = require('passport-jwt')
const LocalStrategy = require('passport-local').Strategy
const db = require('../server/utils/connection')
const bcrypt = require('bcryptjs')
console.log('123')
passport.use(new JwtStrategy({
    jwtFromRequest:ExtractJwt.fromHeader('authorization'),
    secretOrKey:'shhhhh'
},async (payload,done)=>{
    try{
        console.log(payload.sub)
        await db.query('select * from css.tempstudents where studentID=?;',[payload.sub],(err,results)=>{
            console.log(results[0])
            if(results[0]){
                done(null,results[0])
            }
        })
    }
    catch(error)
    {
        done(error,false)
    }
}))

passport.use(new LocalStrategy(
    {
        usernameField: 'login',
        passwordField: 'password',

    },
    async (studentName , password , done)=>{
   try{
       console.log(studentName)
    await db.query('select * from css.tempstudents where studentName=?',[studentName],(err,results ,fields)=>{
        if (!results[0]){
            return done(null,false)
        }
        bcrypt.compare(password,results[0].password,(err,res)=>{
            if(res == false){
                return done (null,false)
            }
            done(null,results[0])
        })
    })
   }
   catch(error){
       done (null,false)
   }
}))