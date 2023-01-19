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
           message   = await  message.populate("sender", /*sender col in message db ref users db*/ 'fn profile_img')///get the ref users data from users db./users data/
          // console.log(message,"2")
           ///messages==>ref users with sender field;
          message   = await  message.populate("chatId")
          message  = await  UserDB.populate(message,{ //message is a json data with field chatId==>this populate
                                                             
                                              path:'chatId.users', ///field to select 
                                               select:"fn profile_img email"
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
     // console.log((req.body.id))
    //  console.log((req.params.id))
    
       // return res.json({err:" Not yet iimplemented"})
      try {
          let admins  = [];
        req.body.id.groupAdmin.forEach(admin => {
            admins.push(admin._id)
        });
           
        if(req.body.id.isGroupChat && admins.indexOf(req.chatUserId  ) ===-1 ){
          return res.json({err:" Your are not part of the admin, use update to remove yourself"})
         //  console.log("YOU ARE NOT ADMIN OF THIS GROUP,use update to remove yourself")
        }
         var message  = await MessageDB.deleteMany({chaId:req.body.id._id})
          // var chat  = await ChatDB.findOne({_id:req.body.id._id });
        // var messages = await MessageDB.populate(chat/*message ref chat (chat did not ref message)*/,{path:'chats.chatId'/*chatId col in message table ref chats*/,select:'content sender,chatId'})
        let m   = [['a'].lenght+" deleted"]
        if(req.body.deleteChat){
          var  chat  = await ChatDB.deleteOne({chaId:req.body.id._id})
          m  = [...m,"Chat also deleted"]
        }
        //  
          //console.log(messages,require('mongodb').ObjectId(req.chatUserId) );
          //.populate('sender','fn email profile_img').populate('chatId');
        //   console.log(req.body.id,admins,req.chatUserId)
       
           return res.status(200).json({suc:m,message:m}) 
      } catch (error) {
          // console.log(error)
          return res.json({err:"Error deleting message. Tell developer about this",message:error.message})
          
      }
     
     
     
     
     }

     let DeleteMessage = (router)=>{
       
      router.delete('/api/chatline/delete:id',auth, asyncHandler(deleteMessageFunction) )
       }  
  
  
 
 module.exports  = {SendMessage,GetAllMessage,DeleteMessage}