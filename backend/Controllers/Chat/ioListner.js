const customeEvent  = (client,eventName)=>{
    client.on(eventName,(num,str,obj)=>{//number data must be the first, str data follw then obj data
          //console.log(str,num,obj)
    })
}

const joinEventVideo  = (client,eventName='joined',socket,channels,peers,config/*contain everything about clinet video audeo text*/)=>{
    ///Sockets ====> Channels
    client.on(eventName,(num,str,obj)=>{//number data must be the first, str data follw then obj data
        var channel       = config.channel;
        var peer_name     = config.peerName;
        var peer_video    = config.peerVideo;
        var peer_audio    = config.peerAudio;
        var peer_hand     = config.peerHand;
        var peer_message  = config.peerMessage
        /////////////////////////////////////////////////////////////
        if (channel in socket.channels) {
          //  console.log("[" + socket.id + "] [Warning] already joined", channel);
            return;
          }
          // no channel aka room in channels init
          if (!(channel in channels)) {
            channels[channel] = {};
          }
      
          // no channel aka room in peers init
          if (!(channel in peers)) {
            peers[channel] = {};
          }
         /////////////////////////////////////////////////
          // collect peers info grp by channels
            peers[channel][socket.id] = {
                peer_name: peer_name,
                peer_video: peer_video,
                peer_audio: peer_audio,
                peer_hand: peer_hand,
            };
         /////////////////////////////////////////////////
         for (var id in channels[channel]) {
            // offer false
            channels[channel][id].emit("addPeer", {
              peer_id: socket.id,
              peers: peers[channel],
              should_create_offer: false,
              iceServers: iceServers,
            });
            // offer true
            socket.emit("addPeer", {
              peer_id: id,
              peers: peers[channel],
              should_create_offer: true,
              iceServers: iceServers,
            });
          //  console.log("[" + socket.id + "] emit add Peer [" + id + "]");
          }
      
          channels[channel][socket.id] = socket;
          socket.channels[channel] = channel;
         
         ///////////////////////////////////////////////

        
    })
}




const disconnectEvent  = (client,eventName='disconnected',socket)=>{
    client.on(eventName,(num,str,obj)=>{//number data must be the first, str data follw then obj data
        for (var channel in socket.channels) {
            require('./iofunction').removePeerFrom(channel);
          }   
    })
}

const templateEvent  = (client,eventName='disconnected',socket)=>{
    client.on(eventName,(num,str,obj)=>{//number data must be the first, str data follw then obj data
       
    })
}

//////////////////////////////////////////////////////////////////////////////////////////

const setupEvent  = (client,eventName='setup',peers,channels,cb )=>{
    client.on(eventName,(userData)=>{//number data must be the first, str data follw then 

                if(  (peers[userData.chat_id]  && !(userData.room_id in channels)) &&(userData.chat_id !=='undefined' ) ){
                  channels[userData.room_id] = userData.room_id;
               
                  client.join(userData.room_id)////create room for the user   
                 // client.join(userData.chat_id)////create room for the user  channel
 
                 client.broadcast.emit("user-enter",userData)
                
                }


          if (!(userData.chat_id in  peers)) {
             ////is the first person to enter the class
            channels[userData.room_id] = userData.room_id; 
            peers[userData.chat_id]   = [userData];
            client.join(userData.room_id)////create room for the user   
            client.join(userData.chat_id)////create room for the user  channe  
     } 
     cb({peers,channels})
  
      // client.to(userData.room_id).emit("connected",userData._id)
    })


}


const joinedEvent  = (client,eventName='joined',serverIo)=>{
    client.on(eventName,(num,socket_id,obj)=>{//number data must be the first, str data follw then  
       console.log("dcndc")
    })
}


const typingEvent  = (client,eventName='is-typing')=>{
    client.on(eventName,(user)=>{//number data must be the first, str data follw then 
        client.broadcast.emit('is-typing-in',user)  
    })
}


const newMessageSendEvent  = (io_backend,eventName='new-message-send')=>{

  io_backend.on(eventName,(num,id,msg)=>{//number data must be the first, str data follw then 
        io_backend.broadcast.emit('has-send-message',num,id,msg)  
  })
}


module.exports  = {
    setupEvent,
    typingEvent,
    newMessageSendEvent
}