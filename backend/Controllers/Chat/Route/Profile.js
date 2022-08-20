const auth = require('./../../../Middleware/JWTAuth')
const asyncHandler = require('express-async-handler')
const Profile =  (router)=>{

 const profileFunction  =  async(req,res)=>{     

        let authUser  = req.chatUserId  
        
        if(!authUser) return res.sendStatus(401) 
        var User = require('./../../../db/Mongo/Mongo').getModel('users') 
          const data  = await User.findOne({_id:authUser},'fn email profile_img _id')
          
           res.status(200).json({data,suc:'ok'}) 
          
       } 

    router.post('/api/chat/profile',auth, asyncHandler(profileFunction) )
 
     }  



  
 
 module.exports  = Profile; // res.json({user:userDetails });  