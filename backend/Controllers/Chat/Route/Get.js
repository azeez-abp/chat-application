


let ChatGetter = (router)=>{
    router.get('/api/chat/get-chat',(req,res)=>{      
        
           res.json({suc:"GOT it"})
         
       })
 
     }  



  
 
 module.exports  = ChatGetter; // res.json({user:userDetails });  