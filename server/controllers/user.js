const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const db = require('../../server/utils/connection')
signToken = (userID) =>{
    return jwt.sign({
        iss:'OurService',
        sub:userID,
        iat: new Date().getTime(),
        exp: new Date().setDate(new Date().getDate() + 1)
    },'shhhhh')
}
module.exports={
    signUp: async (req,res,next)=>{
    console.log('signup is called')
    const {login,password} = req.value.body
    let salt = await bcrypt.genSalt(10)
    let hashPassword = await bcrypt.hash(password,salt)
    await db.query('insert into css.tempstudents (studentName,password) values (?,?);',[login,hashPassword],(err,result)=>{
        if(err){
            console.log(err)
        }
        else{
            const token = signToken(result.insertId)
            res.status(200).json({token})
        }
    })
    },
    signIn: async (req,res,next)=>{

        let id = req.user.studentID
        let token = signToken(id);
        let name = req.user.studentName
        res.status(200).json({token,name,id})
        

    },
    secret: async (req,res,next)=>{
        console.log('secret is called')
        res.json({ user:req.user.studentName});
    }      
       
}