const auth = require('./../../../Middleware/JWTAuth')
let CheckLogin= (router)=>{
    router.post('/api/chat/checklogin',auth,(req,res)=>{      
        
         return res.status(200).json({suc:"login active"})
           
         
       })
 
     } 

  module.exports  = CheckLogin;    