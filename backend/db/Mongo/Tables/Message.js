const { mongoose } = require("mongoose");
const schema = {
    sender:{type:mongoose.Schema.Types.ObjectId,ref:'users'},
    content: {type:String,required:true},
    chatId: {type:mongoose.Schema.Types.ObjectId,ref:'chats'},
  
}
module.exports  = schema;
