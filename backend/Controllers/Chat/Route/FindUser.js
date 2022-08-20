


let FindeUSer = (router)=>{
    let auth  = require('./../../../Middleware/JWTAuth')
    router.post('/api/chat/getuser',auth, async(req,res)=>{ 
           const item  = req.body.search    
        const User  = require('./../../../db/Mongo/Mongo').getModel('users')
       const querySrting  = {
                   _id: {$ne:req.charUserId} ,
                   $or :[
                          {
                            fn:{$regex: '.*'+item+'.*', $options:'i' }
                          },
                          {
                            email:{$regex: '.*'+item+'.*', $options:'i' }
                          }
                   ]
       } 
      let $query  = querySrting
        
        try {
              const users  =  await User.find($query).find({_id:{$ne:req.charUserId}})
                res.json({ users })
        } catch (error) {
            
        }

          
     
        
          // res.json({suc:"GOT it"})
         
       })
 
     }  



  
 
 module.exports  = FindeUSer; // res.json({user:userDetails });  