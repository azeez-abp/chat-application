
const asyncHandler = require('express-async-handler')
const auth = require('../../../Middleware/JWTAuth')

let CreateGroup= (router)=>{
let auth  = require('../../../Middleware/JWTAuth')
const Chat  = require('./../../../db/Mongo/Mongo').getModel('chats')
    router.post('/api/chat/addgroup',auth, asyncHandler(async (req,res)=>{      
        if(req.cookies.session_expires) return res.sendStatus(401)
        if(!req.body.users || !req.body.name)  return res.json({err:[" All Field are required"]})    
         var users   = req.body.users
        if(users.length < 2) return res.json({err:" More that two users are needed to form group"})  

        users.unshift(req.chatUserId);//add person making request to the first position
        console.log(users)
        try {
          let check  =   await Chat.findOne({  chatName:req.body.name })
           if(check) return res.json({err:check.chatName+ " group already exist"});

            const groupChat  =await Chat.create({
                 chatName:req.body.name,
                 users:users,
                 isGroupChat:true,
                 usersId:users,
                 groupAdmin:[req.chatUserId] 
            } ) 

            res.status(200).json({groupChat,suc:"Group created succesfully"})
            
        } catch (error) {
            res.sendStatus(400);
            throw new Error(error.message)
        }
        //   res.json({suc:req.cookies, user :req.chatUser,id:req.chatUserId})
         
       }))
 
     }  


 let UpdateGroupName = (router)=>{
        let auth  = require('../../../Middleware/JWTAuth')
        const Chat  = require('./../../../db/Mongo/Mongo').getModel('chats')
            router.put('/api/chat/updategroup',auth, asyncHandler(async (req,res)=>{      
                if(req.cookies.session_expires) return res.sendStatus(401)
                 console.log(req.body.groupChatName)
                if(!req.body.groupChatId || !req.body.groupChatName)  return res.json({err:[" All are required"]})    
                 var {groupChatId,groupChatName,usersIds}   = req.body
                     console.log(req.body)
                try {
                    const UpdateGroupChatName  =await Chat.findOneAndUpdate({_id:groupChatId},{
                     $set :{ 
                        chatName: groupChatName,
                        users :usersIds,
                        usersId:usersIds
                     }
                    },{new:true} ) 
                             .populate("users",'-pa')
                             .populate("groupAdmin",'-pa')
                   // res.status(200).json({UpdateGroupChatName,suc:'done'})
                    if(!UpdateGroupChatName){
                        res.status(400).json({err:'update failed'});
                        throw new Error(error.message)
                    }else{
                       return res.status(200).json({UpdateGroupChatName,suc:'done'});
                    }
                    
                } catch (error) {
                    res.sendStatus(400);
                    throw new Error(error.message)
                }
                //   res.json({suc:req.cookies, user :req.chatUser,id:req.chatUserId})
                 
               }))
         
             }  
           
           
let RemoveUserFromGroup  = (router)=>{
    const Chat  = require('./../../../db/Mongo/Mongo').getModel('chats')
        let addFunc  =  async (req,res)=>{  
            let  {chatId,userId}  = req.body   
            try {
               let add_user   =Chat.findByIdAndUpdate(chatId,{$pull:{users:userId} },{new:true})
                  .populate('users','-pa') 
                  .populate('groupAdmin','-pa')  
                
                  if(!add_user) return res.status(400).json({err:['Error adding user']})
                  return res.status(200).json({suc:"User added successfully"})
            } catch (error) {
                res.sendStatus(400);
                throw new Error(error.message)
            } 
                       
        }
    
       
        router.post('/api/chat/adduser',auth,asyncHandler( addFunc)  )
                       
                   
   } 

   let AddUserToGroup  = (router)=>{
    const Chat  = require('./../../../db/Mongo/Mongo').getModel('chats')
        let addFunc  =  async (req,res)=>{  
            let  {chatId,userId}  = req.body   
            try {
               let add_user   =Chat.findByIdAndUpdate(chatId,{$push:{users:userId} },{new:true})
                  .populate('users','-pa') 
                  .populate('groupAdmin','-pa')  
                
                  if(!add_user) return res.status(400).json({err:['Error adding user']})
                  return res.status(200).json({suc:"User added successfully"})
            } catch (error) {
                res.sendStatus(400);
                throw new Error(error.message)
            } 
                       
        }
    
       
        router.post('/api/chat/adduser',auth,asyncHandler( addFunc)  )
                       
                   
   } 

   let deleteChat  =  (router) =>{
        

   }


 
 module.exports  ={CreateGroup, UpdateGroupName,AddUserToGroup,RemoveUserFromGroup} ; // res.json({user:userDetails });  