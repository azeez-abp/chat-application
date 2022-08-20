let randomStr  = require('./../../../Lib/Fs/RandonString')
const path  = require('path')
let bcrypt  = require('bcrypt');

let Register = (router)=>{
    router.post('/api/chat/post-register',(req,res)=>{      
        /////////////////////////////validation of input
        
        const validation_err  = []
        for(let input in  req.body){
          if(req.body[input]===''){
           validation_err.push(`${input}  is required`);
          }
        
        }
   // 
       if(validation_err.length >0){
         return res.json({err:validation_err})
       } 
        /////////////////////////////end of validation of input

        

        ///////////////////////////////////////////////////////register 


               
function useMongoToRegister(){
    let mongoStudentModel  = require('./../../../db/Mongo/Mongo');

    mongoStudentModel.getModel('users').findOne(
        {email:req.body.email},
        //{$or:[{email:req.body.email}, {userId:req.body.email}]}
        (err,user)=>{
         if(err) return  res.json({err:[`unknown error occur`]})  
         if(user) return res.json({err:[`user with email ${req.body.email} already exist`]})
         bcrypt.genSalt(10, function(err, salt) {
            bcrypt.hash(req.body.password, salt, function(err, hash) {
                if(err){
                    
                    return res.json({err:['Failed to sync password','check the password field']})
                }
              let data = {
                email : req.body.email,
                fn: req.body.name,
                pa:hash,
                profile_img:req.body.image,
                userId:randomStr(64)
              }  
              //return res.json({data})
             // 
            
              let db  = mongoStudentModel.getModel('users')(data)
               db.save( (err,saved)=>{
                  if(saved){
                    res.json({suc:'data saved'})
                  }else{
                    
                    res.json({err:['Registration failed']})
                  }
               } ) 
            // 
           
            })
        })

        })
    }

    useMongoToRegister()

        ////////////////////////////////////////////////////register


      
         
       })
 
     }  



  
 
 module.exports  = Register; // res.json({user:userDetails });  