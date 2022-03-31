var Users= require('../models/users');
var Messages = require('../models/messages');
const { body,validationResult } = require("express-validator");
let app=require('../app')
 


exports.create_message_get=(req,res,next)=>{
    let fullName=`${req.user.first_name} ${req.user.family_name} `
   console.log(fullName)
    res.render('create-message', { title: 'Express',message:undefined,errors:[],user:req.user });
    
}

exports.create_message_post=[
    body('title',`Name must not be empty`).trim().isLength({min:1}).escape(),
    body('content',`Family name must not be empty`).trim().isLength({min:1}).escape(),

    (req,res,next)=>{
        let fullName=``
        const errors=validationResult(req)
       let message=new Messages({
            title:req.body.title,
            content:req.body.content,
            username:req.user.first_name,
        })
        if( !errors.isEmpty()){
          console.log(errors)
            res.render(`sign_up`,{message:message,errors:errors.array(),user:req.user})
        }
        else{
               message.save(err=>{
                    if(err){return next(err)}
                    res.redirect("/")
                })
            
        }
    }
]

exports.home_get=(req,res,next)=>{
    Messages.find().exec((err,messages)=>{
        if(err){return next(err)}
        else{    res.render('index', { title: 'Express',messages,user:req.user });}
    })
}

exports.home_post=(req,res,next)=>{
    console.log('postouuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuu',req.body.deletar)
    Messages.findByIdAndDelete(req.body.deletar,err=>{
        if(err){return next(err)}
        res.redirect('/')
    })
}
