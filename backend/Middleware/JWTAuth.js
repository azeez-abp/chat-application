//require('dotenv').config()///all in process.env
let jwt  = require('jsonwebtoken');
let  keys  = require('../Lib/Config/keys/Key')

let auth  = (req,res ,next)=>{
    let authValue   = req.headers.authorization  || req.headers.Authorization
   
    if(!authValue || !authValue.startsWith('Bearer')) {
      
      req.cookies.session_expires= true;
      return res.sendStatus(401)
    } 
    let token = authValue.split(" ")[1];

    jwt.verify(token, keys.ACCESS_TOKEN/*take it from memory*/,(err,user)=>{
      if(token==='undefined')   {req.cookies.session_expires= true;return res.sendStatus(401)}
      if(err) {req.cookies.session_expires= true;return res.sendStatus(401)}//forbiden session has expired
      if(user){ 
        //addToChatList
         req.cookies.session_expires= false; 
         req.cookies.currentuser  = user.user
         req.chatUserId          = user.id
         req.chatUser  = user.user
          
         next();
      }else{
        return res.sendStatus(401)
      } 
      //addToChatList
        
       
    }) 
  //next();
}


module.exports =auth