const { mongoose } = require("mongoose");
const schema = {
    sender:{type:mongoose.Schema.Types.ObjectId,ref:'users'},//message.poplate('sender', 'users.fn user.email')
    content: {type:String,required:true},
    chatId: {type:mongoose.Schema.Types.ObjectId,ref:'chats'},///message.poplate('chatId','users  isGroupChat')
  
}
module.exports  = schema;
