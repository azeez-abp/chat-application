const listner   = require('./ioListner')
const io1  = (port)=>{
    const io = require('socket.io')(port,{
      cors:{
        origin:['http://localhost:3000']
      }
    })
    io.on('connection',(client)=>{
      console.log("IO STARTED2",client.id)
    })
  console.log("IO STARTED")
  
  }

  /////////////////////////////////////////////


  const ioexpress  = (app)=>{
        const { createServer } = require("http");
        const { Server } = require("socket.io");
   
        const httpServer = createServer(app);
        const io = new Server(httpServer, {
         /* options */ 
         cors:{
            origin:['http://localhost:3000']
          }
        
        /**/ });


        var channels = {}; // collect channels
        var sockets = {}; // collect sockets
        var peers = {}; // collect peers info grp by channels

        io.on("connection", (client) => { 
             let socket = client
             ///we have server io
              // we have client socket
              //all function happen here
              ////////////////////////////////////////////////////////////////*************** */

            ///////////////////////////////peer[channel==chat._id][socket.id==user._id]
            listner.setupEvent(client,'setup',peers,channels,(returnData)=>{

             peers   = {...returnData.peers }
             channels   = {...returnData.channels }
          // sockets  = {...setUp.socket}
           })           
             listner.typingEvent(client,'is-typing',sockets )
             listner.newMessageSendEvent(client)
             console.log('connected room(socket==client) '+ JSON.stringify(client.channels),socket.id )

            ////////////////////////////////////////////////////////////////*************** //


          });
          

          return httpServer;
        

  }

module.exports   = {io1,ioexpress}