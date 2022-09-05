//const { timeStamp } = require("console");
const mongoose = require("mongoose");
/// console.log(mongoose)
const {Schema} = mongoose; //destructuring,  take schema propery from mongoose;
const ObjectId = Schema.ObjectId;
/// mongoose has connected on a file<Mongo.js>  
/// onnce you require mongoose on any file, it can be used to build a table in the connect
 

const generalTable = {
build: (tableName,tableSchema)=>{
 
  if(typeof  tableName !=='string'){
      throw new Error("Table Name must be string");
  }
 else if(typeof  tableSchema !=='object'){
    throw new Error("Table Schema must be Obeject");
}
else{

return mongoose.model(tableName,new Schema(tableSchema,{
    timestamps: true
}),tableName);///////////Schema build table-structure  //////////model name the table structure  
}
 

}

}


module.exports= {
    users:generalTable.build("users",require('./Tables/User')),
    chats:generalTable.build('chats',require('./Tables/Chat')),
    messages:generalTable.build('messages',require('./Tables/Message')),
  

}
