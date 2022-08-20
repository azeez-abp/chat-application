const asyncHandler = require('express-async-handler')
const auth = require('./../../../Middleware/JWTAuth')
//////// get user to chat with their chat for each chart populate the message
/////get chatList each chart has it users list they are chatting with
const reqFunct  = async(req,res)=>{
   ////////////////this will find may be the person you selectd is in your chat
     const {userID}  = req.body  ////id of the person selected
     
    const ChatTable  = require('./../../../db/Mongo/Mongo').getModel('chats')  
    var User = require('./../../../db/Mongo/Mongo').getModel('users')  
      let authUser  = req.chatUserId  
      if(!authUser) return res.sendStatus(401)
      //  
       var chats = await ChatTable.find({
            //get chats and it users///none group chat
            //isGroup:false,
            $and:[ 
                   {users: {$elemMatch :{ $eq:userID} } },
                   {users: {$elemMatch :{ $eq:authUser} } }
                 ]
        }).populate('users','-pa')
        .populate('latestMessage') ; 
       
    chats  = User.populate(chats, {
        path:"latestMessage",/// chats has field latestMessage
        select:"fn profile_img email"
    })

 
    if(chats.length >0 ){
       return res.json({chat:chats[0]})
    }else{
      let chatData  = {
          chatName  : 'user',
          isGroup:false,
          users:[req.chatUserId,userID],
          usersId:[req.chatUserId,userID],
          groupAdmin:[req.chatUserId]
      } 


      try {
        const createChat  = await ChatTable.create(chatData)
        const fullChat  = await ChatTable.findOne({_id:createChat._id}).populate('users','-pa')
        res.status(200).json({chat:fullChat,suc:"done"});
     } catch (error) {
      res.sendStatus(400);
      throw new Error(error.message)
     }


    }

   
  
}



 

let ChatList  = (router)=>{

    let auth  = require('./../../../Middleware/JWTAuth')///check this file to see wher user is store
    router.post('/api/chat/chatlist',auth , asyncHandler(reqFunct) )
 
     }  


  const functionFOrFetch  = (req,res)=>{
    const ChatTable  = require('./../../../db/Mongo/Mongo').getModel('chats') 
    var User = require('./../../../db/Mongo/Mongo').getModel('users') 
   // 
    let authUser = req.chatUserId
       try {
          ChatTable.find({  users:{$elemMatch :{ $eq:authUser} } }) 
          .populate('users','-pa')
          .populate('groupAdmin','-pa')
          .populate('latestMessage')
        //  .sort('updateAt',-1)
          .then( async(results)=>{
          
             let results_get_users  = User.populate(results,{
                 path:'latestMessage.sender',
                 select:"fn email profile_img"
              }).then(user=>{
                
              }).catch(err=>{
                
              })
           //   
           let data  = {chat:results, users:[results_get_users], suc:'get'}
           //
           return res.status(200).json(data)
          }).catch(er=>{
                     
                     return res.sendStatus(404)
      
          })
        
       } catch (error) { 
          return  res.sendStatus(404);
           // throw new Error(error.message,"wertyu")
             
  
       }
  }   

const FetchChat  = (router)=>{
    router.post('/api/chat/fetchchat' ,auth,asyncHandler( functionFOrFetch ))
}      

  
 
 module.exports  = {ChatList,FetchChat}; // res.json({user:userDetails });  
