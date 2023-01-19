const schema = {

    userId:{type:String,unique:true,require:true},
    fn: {type:String,required:true},
   // mn: {type:String,required:true},
   // ln: {type:String,required:true},
    email: {type:String,required:true},
    ge:{type:String},
    pa: {type:String,required:true},
    date:{type:String,default:Date.now},
    created_at:{type:String},
    updated_at:{type:String},
    profile_img:{
        type:String,
         //require:true,
        default:"https://lh3.googleusercontent.com/ogw/AOh-ky3vJ7vY-gmWRF6Nhn-pAUZXZwLSx7uVF8rLwCqW=s32-c-mo"
             },
 //   ad: {type:Object},
     sessionToken:{type:String},
    

}
//usersDb.populate(objectReturnFromDBQuery,{path:'db that ref usersDb.column with ref', select:' col1,col2'}) use this for table(document) with no ref 
module.exports  = schema;