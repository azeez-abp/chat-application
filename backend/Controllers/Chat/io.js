// import { readFileSync } from "fs";
// import { createServer } from "https";
// import { Server } from "socket.io";

// const httpsServer = createServer({
//   key: readFileSync("/path/to/server-key.pem"),
//   cert: readFileSync("/path/to/server-cert.pem"),
//   requestCert: true,
//   ca: [
//     readFileSync("/path/to/client-cert.pem")
//   ]
// });


const listner   = require('./ioListner')
var os = require('os');
var interfaces = os.networkInterfaces();
var addresses = ['127.0.0.1:3000','https://embracechatapp.azurewebsites.net'];
for (var k in interfaces) {
    for (var k2 in interfaces[k]) {
        var address = interfaces[k][k2];
        if (address.family === 'IPv4' && !address.internal) {
            addresses.push(address.address+":3000");
        }
    }
}


const io1  = (port)=>{
  

  const io = require('socket.io')(port, {
    cors: {
        origin: addresses,//"http://localhost:7000",// addresses,,
        methods: ["GET", "POST"],
        transports: ['websocket', 'polling'],
        credentials: true,
        pingTimeout: 60000
    }, 
    allowEIO3: true
});
  
    // const io = require('socket.io')(port,{
   
    //   cors:{
    //     //origin:['http://localhost:3000','https://embracechatapp.azurewebsites.net/']
    //     origin: addresses

    //   }
    // })

    

    io.on('connection',(client)=>{
      //console.log("IO STARTED2",client.id)
    })
  //console.log("IO STARTED")
  
  }

  /////////////////////////////////////////////


  const ioexpress  = (app)=>{
   
        const { createServer } = require("http");
        const { Server } = require("socket.io");
   
        const httpServer = createServer(app);
        const io = new Server(httpServer, {
         /* options */ 
         cors:{
            origin:['http://localhost:3000',...addresses]
          }
        
        /**/ });


        var channels = {}; // collect channels
        var sockets = {}; // collect sockets
        var peers = {}; // collect peers info grp by channels
        // console.log(io)
        io.on("connection", (io_backend) => { 
            
           //  backend.emit("connection")
           //  console.log(backend,"iS ")
            // console.log("CONEECTION")
             ///we have server io
              // we have client socket
              //all function happen here
              ////////////////////////////////////////////////////////////////*************** */

            ///////////////////////////////peer[channel==chat._id][socket.id==user._id]
            listner.setupEvent( io_backend,'setup',peers,channels,(returnData)=>{

             peers   = {...returnData.peers }
             channels   = {...returnData.channels }
          // sockets  = {...setUp.socket}
           })           
             listner.typingEvent( io_backend,'is-typing')
             listner.newMessageSendEvent(io_backend)
          //console.log('connected room(socket==client) ',io_backend.id )

            ////////////////////////////////////////////////////////////////*************** //


          });
          

          return httpServer;
        

  }

module.exports   = {ioexpress}