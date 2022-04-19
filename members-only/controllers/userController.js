var Users= require('../models/users');
const { body,validationResult } = require("express-validator");
const bcrypt=require("bcryptjs")
const passport=require('passport')


exports.sign_up_get=(req,res,next)=>{
    res.render('sign_up', { title: 'Express',username:undefined,errors:[],user:req.user });
}

exports.sign_up_post=[
    body('first_name',`Name must not be empty`).trim().isLength({min:1}).escape(),
    body('family_name',`Family name must not be empty`).trim().escape(),
    body('password',`Password must not be empty`).trim().isLength({min:3}).escape(),
    body('confirm_password').custom((value,{req}) => {
            if (value!==req.body.password){
                console.log(`the confimr password does not match--------------------------------`)
                 throw new Error('the confimr password does not match');
                 }
                 return true
    }).trim().escape(),

    body('username').custom(value => {
       return  Users.find({}).then((result)=>{
            result.map(user=>{
                if (value===user.username){
throw new Error('this email is already in use');
 }
            })
        }) 
      }).trim().escape(),

    (req,res,next)=>{
        const errors=validationResult(req)
       let user=new Users({
            first_name:req.body.first_name,
            family_name:req.body.family_name,
            username:req.body.username,
            password:'nope',
            status:'false',
        })
        if( !errors.isEmpty()){
          console.log(errors)
            res.render(`sign_up`,{username:user,errors:errors.array(),user:req.user})
        }
        else{
            bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
                if(err){return next(err)}
                user=new Users({
                    first_name:req.body.first_name,
                    family_name:req.body.family_name,
                    username:req.body.username,
                    password:hashedPassword,
                    status:'false',
                }).save(err=>{
                    if(err){return next(err)}
                    res.redirect("/log-in")
                })
              });
        }
    }
]

exports.log_in_get=(req,res,next)=>{
    res.render('log-in', {title:`express`, username:undefined,errors:[],user:req.user} );

}
exports.join_club_get=(req,res,next)=>{
   console.log(req.user)
    res.render('join-club', {title:`express`, secret:undefined,errors:[],user:req.user} );
}

exports.join_club_post=[
    body('passcode').custom(async (value,{req}) => {
        console.log(req.user,'user')
 let yo=await Users.find({'status':'admin'});
       if(value===yo[0].passcode){
       }
       else throw new Error('The passcode is incorrect');

      
       
     }).trim().escape(),
//    Users.find({'status':'admin'}).then(result=>{

    (req,res,next)=>{
        console.log(`what is happening?`)
        const errors=validationResult(req)
      
       
        if( !errors.isEmpty()){
          console.log(errors)
            res.render(`join-club`,{errors:errors.array(),user:req.user})
        }
        else{
            let user=new Users({
                _id:req.user._id,
                first_name:req.user.first_name,
                family_name:req.user.family_name,
                username:req.user.username,
                password:req.user.password,
                status:'true'
            })
           console.log(`should  work`)
                Users.findByIdAndUpdate(req.user.id,user,{},(err,theuser)=>{
                    if (err) { return next(err); }
                    // Successful - redirect to genre detail page.
                   console.log('worked somehow...')
                    res.redirect("/")
                })
        }
    }
]




  
    
