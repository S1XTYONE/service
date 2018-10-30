const express = require('express');
const router = express.Router();
const db = require('../../server/utils/connection')
router.all('/' , (req,res,next)=>{
    db.connect(function(err){
            if (err) {
                console.error('error connecting: ' + err.stack);
                
                return;
              }
              console.log('connected as id ' + db.threadId);
              return db;
    
        })
        next()
})

router.get('/forms',(req,res)=>{
    db.query('SELECT * FROM css.forms;',(err,results)=>{
        if (err){
            return res.send(err)
        }
        else{
            //console.log(db)
            return res.json({
                data:results
            })
        }
    }) 
})

router.get('/application/:id',(req,res)=>{
    db.query('SELECT * FROM css.applicationview where applicationview.applicationID !=?;',[req.params.id],(err,results)=>{
        if (err){
            return res.send(err)
        }
        else{
            //console.log(db)
            return res.json({
                data:results
            })
        }
    })
})


router.get('/newapp',(req,res)=>{
    db.query('select * from css.applicationview where statusID=1;',(err,results)=>{
        if (err){
            return res.send(err)
        }
        else{
            //console.log(db)
            return res.json({
                data:results
            })
        }
    }) 
})
router.get('/progressapp',(req,res)=>{
    db.query('select * from css.applicationview where statusID=2;',(err,results)=>{
        if (err){
            return res.send(err)
        }
        else{
            //console.log(db)
            return res.json({
                data:results
            })
        }
    }) 
})
router.get('/doneapp',(req,res)=>{
    db.query('select * from css.applicationview where statusID=3;',(err,results)=>{
        if (err){
            return res.send(err)
        }
        else{
            //console.log(db)
            return res.json({
                data:results
            })
        }
    }) 
})
router.get('/issuedapp',(req,res)=>{
    db.query('select * from css.applicationview where statusID=4;',(err,results)=>{
        if (err){
            return res.send(err)
        }
        else{
            //console.log(results[0].studentName)
                 return res.json({
                 data:results
            })
        }
    }) 
})

router.get('/events',(req,res)=>{
    db.query('SELECT * FROM css.eventsview;',(err,results)=>{
        if (err){
            return res.send(err)
        }
        else{
            //console.log(db)
            return res.json({
                data:results
            })
        }
    }) 
})

router.post('/eventapp',(req,res)=>{
    console.log(req.body.data.statusID)
    var nextStatusID = ++req.body.data.statusID;
    db.query('INSERT INTO `css`.`events` (`applicationID`,`eventDateTime`,`statusID`) VALUES (?,NOW(),?);UPDATE `css`.`applications` SET `statusID` = ? WHERE (`applicationID` = ? );',[escape(req.body.data.applicationID),escape(nextStatusID),escape(nextStatusID),escape(req.body.data.applicationID)],(err,results)=>{
        if(err)
        {
            console.log(err)
        }
        else
        {
            return res.json({
                data:results
            })
        }
    })
})
router.post('/application',(req,res)=>{
   
    db.query('insert into `css`.`applications`(`studentID`,`FormID`,`applicationDateTime`,`applicationIdent`,`statusID`,`comment`,`qrcode`) values(?,?,NOW(),?,1,?,?);',[escape(req.body.data.id),escape(req.body.data.selectForm),escape(req.body.data.applicationIdent),req.body.data.comment,Buffer.from(req.body.data.qrcode.data)] , (err,results)=>{
        if(err)
        {
            console.log(err)
        }
        else
        {
            console.log(results)
            db.query('INSERT INTO `css`.`events` (`applicationID`,`eventDateTime`,`statusID`) VALUES (?,NOW(),1);',[escape(results.insertId)],(err,results)=>{
                if (err)
                {
                    console.log(err)
                }
                else
                {
                    //console.log(results)
                }
            })
            return res.json({
                data:results
            })
        }
    })
})
router.get('/check/:ident',(req,res)=>{
    //console.log(req.params.ident)
     db.query('select studentName,FormName, applicationIdent,statusName from css.applicationview where applicationIdent = ?;',[escape(req.params.ident)],(err,results)=>{
        if(err)
        {
            return res.send(err)
        }
        else
        {
            
            return res.json({
                data:results
            })
        }
    })
})

module.exports = router