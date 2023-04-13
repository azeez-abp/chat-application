const { mongoose } = require("mongoose");

const schema = {
    userId:{type:String},
    chatName: {type:String,trim:true},
    isGroupChat: {type:Boolean,default:false},
    users:[ {
            type:mongoose.Schema.Types.ObjectId,
    
            ref:'users'
          }],
   usersId:[ {
            type:mongoose.Schema.Types.ObjectId,
    
            ref:'users'
          }],     
    latestMessage:[ {type:mongoose.Schema.Types.ObjectId,ref:'users'}],
    groupAdmin:[{type:mongoose.Schema.Types.ObjectId,ref:'users'}],

        }


module.exports  = schema;