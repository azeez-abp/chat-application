
const auth = require('./../../../Middleware/JWTAuth')
const keys  = require('./../../../Lib/Config/keys/Key')
var User = require('./../../../db/Mongo/Mongo').getModel('users')  
const asyncHandler = require('express-async-handler')

let Logout = (router)=>{
    router.post('/api/chat/logout',auth, asyncHandler(async(req,res)=>{     
        try {
            let authUser  = req.chatUserId 
            if(!authUser) return res.sendStatus(401)
            delete req.chatUserId  
           let user  = await User.findOne({sessionToken:req.cookies[keys.COOKIE_NAME]})
           
           user.sessionToken="";
           delete  req.cookies.currentuser
           req.cookies.session_expires  = true
           delete req.cookies[keys.COOKIE_NAME] 
          await  user.save()

         // res.clearCookie(keys.COOKIE_NAME);
       


           res.json({
            suc:"LOgout done"
          
          })
            
        } catch (error) {
             
        } 
        
         
       }))
 
     }  



  
 
 module.exports  = Logout; // res.json({user:userDetails });  