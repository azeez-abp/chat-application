let Chat = (router)=>{
    console.log("wqeda")
   require('./Route/Login')(router)
   require('./Route/Register')(router) 
   require('./Route/GroupChat').CreateGroup(router)   
   require('./Route/GroupChat').UpdateGroupName(router)
   require('./Route/GroupChat').AddUserToGroup(router)   
   require('./Route/GroupChat').RemoveUserFromGroup(router)     
   require('./Route/ChatList').ChatList(router) 
   require('./Route/ChatList').FetchChat(router)    
   require('./Route/FindUser')(router)     
   require('./Route/CheckLogin')(router) 
   require('./Route/Profile')(router)     
   require('./Route/Logout')(router)    
   /////////////////////////////////////////
   ////////////////////////////////////////
   require('./Route/ChatApi/OneToOne').SendMessage(router)
   require('./Route/ChatApi/OneToOne').GetAllMessage(router)
   require('./Route/ChatApi/OneToOne').DeleteMessage(router)

   
}  

module.exports  = Chat