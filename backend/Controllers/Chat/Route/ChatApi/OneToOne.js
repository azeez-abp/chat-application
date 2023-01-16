const auth    = require('../../../../Middleware/JWTAuth')
const MessageDB =  require('./../../../../db/Mongo/Mongo').getModel('messages') 
const UserDB = require('./../../../../db/Mongo/Mongo').getModel('users') 
const ChatDB = require('./../../../../db/Mongo/Mongo').getModel('chats')  
const asyncHandler = require('express-async-handler')

const sendMessageFunction  = async (req,res)=>{
           const {content, chatId}  = req.body
           if(!content || !chatId) return res.status(400).json({err:" Message is required"})
           let authUser  = req.chatUserId
           var newmessage  = {
              sender : authUser,
              content:content,
              chatId:chatId
           }

        try {
            var message  = await MessageDB.create(newmessage);
           // console.log(message)
           message   = await  message.populate("sender", /*get*/ 'fn profile_img')///get the ref users data from users db./users data/
          // console.log(message,"2")
           ///messages==>ref users with sender field;
          message   = await  message.populate("chatId")
            message  = await  UserDB.populate(message,{ //message is a json data with field chatId==>this populate
                ///data and in that data there is key users
                                              path:'chatId.users', ///field to select 
                                               select:" fn profile_img email"
                                             } )
                                             
                                             // uses database get chat db populate users ref field
                 await ChatDB.findByIdAndUpdate(chatId,{
                    latestMessage:message //pu the message into the chat
                 })                            
             return res.status(200).json({suc:" Done",message}) 
        } catch (error) {
          //  throw new Error(error)
            return res.json({err:" Error sendeing messge",err:error.message})
            
        }
  



}

 
let SendMessage= (router)=>{
    router.post('/api/chatline/sendmessage',auth, asyncHandler( sendMessageFunction) )

     }  
////////////////////////////////////////////////////////////////////////////////////




const getMessageFunction  = async (req,res)=>{
 

 try {
     var message  = await MessageDB.find({chatId:req.params.chatId}).populate('sender','fn email profile_img').populate('chatId');
    // console.log(message)
  
      return res.status(200).json({suc:" Done",message}) 
 } catch (error) {
   //  throw new Error(error)
     return res.json({err:" Error sendeing messge",err:error.message})
     
 }




}

let GetAllMessage = (router)=>{
    router.get('/api/chatline/getallmessages/:chatId', auth, asyncHandler(getMessageFunction) )
     }  




     const deleteMessageFunction  = async (req,res)=>{
      console.log(req.params)
      return res.json({err:" Not yet iimplemented"})
      
      try {
          var message  = await MessageDB.deleteOne({chatId:req.params.chatId}).populate('sender','fn email profile_img').populate('chatId');
         // console.log(message)
       
           return res.status(200).json({suc:" Done",message}) 
      } catch (error) {
        //  throw new Error(error)
          return res.json({err:" Error sendeing messge",err:error.message})
          
      }
     
     
     
     
     }

     let DeleteMessage = (router)=>{
      router.get('/api/chatline/delete', auth, asyncHandler(deleteMessageFunction) )
       }  
  
  
 
 module.exports  = {SendMessage,GetAllMessage,DeleteMessage}