
const bcrypt   = require('bcrypt')
const jwt  = require('jsonwebtoken')
const keys  = require('./../../../Lib/Config/keys/Key')
const cookie_config  = require('./../../../Lib/Config/Cookie')
const User = require('./../../../db/Mongo/Mongo').getModel('users')  

let Login = (router)=>{
    router.post('/api/chat/post-login',(req,res)=>{   
       // 
        /////////////////////////////////////validation
        const validation_err  = []
        for(let input in  req.body){
          if(req.body[input]===''){
           validation_err.push(`${input}  is required`);
          }
         //
        }
   
       if(validation_err.length >0){
         return res.json({err:validation_err})
       } 
        //////////////////////////////////validation
        

         //////////////////////////////////////////////Login
        async function useMongoToLoginJWT(){
            let mongoStudentModel  = require('./../../../db/Mongo/Mongo').getModel('users');
            let user  = await mongoStudentModel.findOne({ email:req.body.email
             
             },'userId pa email _id')
           
           if(!user) return res.json({err:["invalid credential not found"]})  
           
           let match = await bcrypt.compare(req.body.password,user.pa )
           
           if(!match) return res.json({err:["invalid credential"]}) 
           ///this is a sesssion saved in memory, 
   
           let userDetails  = user;         
   //////////////////////////////////////////////////////////////////////////////
           let access_token =await jwt.sign( 
              {user : userDetails.userId,id:userDetails._id},
               keys.ACCESS_TOKEN, /*save in memory Not file or database*/
              { expiresIn:   '1d' },
               
              ); 
             
          
              // 
          
              let refresh_token = await jwt.sign(  
                 {user : userDetails.userId,id:userDetails._id}, 
                 keys.REFRESH_TOKEN, /*save in memory Not file or database*/
                 { expiresIn:  '7d'  },
                
                
                 ); 
   
                res.cookie(keys.COOKIE_NAME,refresh_token, cookie_config)//7 days
                user.sessionToken  = refresh_token
                req.cookies.session_expires=false
                await user.save()
           
              res.json({suc:"Loging successful",access_token})
             
         
        }
        useMongoToLoginJWT()
        //////////////////////////////////////////////////login
         
       })


 
     }  



  
 
 module.exports  = Login; // res.json({user:userDetails });  