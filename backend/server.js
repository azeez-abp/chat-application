const express  = require('express');
const app    = express();
const router  = express.Router();
const path  = require('path');
const cors  = require('cors');
const session = require('express-session')
const cookie_parser  =require('cookie-parser')  
const passport  =require('passport') 
let PORT   = process.env.PORT || 7000
console.log  (path.join(__dirname))

var whitelist = [
'http://example1.com', 
'http://example2.com', 
'http://127.0.0.1:7000',
'127.0.0.1:7000',
'http://localhost:3000',
'localhost:7000',
'undefined',
'https://abp-chat-app.herokuapp.com/'
]
var corsOptions = {
  origin: function (origin, callback) {
    
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  optionSuccessStatus:200
}

corsOptionsDelegate = function (req, callback) {
  var corsOptions;
 // console.log(req.headers['host'],"tyu")
  if (whitelist.indexOf(req.header('host')) !== -1) {
    //corsOptions = { origin: true } // reflect (enable) the requested origin in the CORS response
  } else {
    throw new Error("Rejection by cors")
    //corsOptions = { origin: false } // disable CORS for this request
  }
  callback(null, corsOptions) // callback expects two parameters: error and options

}


app.use(express.urlencoded({extended:false}))
app.use(express.json());
app.use(cors(corsOptionsDelegate ));
app.use(require(path.join(__dirname,'Middleware','HeaderOption')))
app.use(cookie_parser());

//the order is important
//app.use(passport.initialize());
//app.use(require('./Lib/Config/session/Session').session())

/// initalize passport to make stragy work
//app.use(passport.session());
//studentComponent(app)  
app.use((req,res,next)=>{
  // console.log(req.session)
   //console.log(req.user)////passport-local user
  // console.log(req.logout)
  next()
})
 
//require('./Controllers/Student/Route')(app) 
//app.use('/chat')
require(path.join(__dirname,'Controllers/Chat/Route') )(app)

// app.get('/soclet.io/:id',(req,res)=>{
//   console.log("IO GET REQUESTY")
// })

// app.post('/soclet.io/:id',(req,res)=>{
//   console.log("IO POST REQUESTY")
// })
//require('./Lib/Fs/uploader/FileUploder')(app,'/api/fileupload','public/images',true,true,{w:40,h:40},false,{s:2000,w:3000,h:200});
//require('./Lib/Mailer')('adioadeyorizeez@gmail.com',['adioadeyoriazeez@yahoo.com','adioadeyoriazeez@gmail.com'],'Testing node amile',`<h1>Hello AZ</h1>`)
// app.get('/*',(req,res)=>{
//     res.send(`<h1>404 File not file</h1>`)
// })
if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  const root_dir_all  = path.join(path.resolve( __dirname),'..', 'frontend','build')
  const root_dir_all2  = path.join(path.resolve( __dirname),'..', 'frontend','build','index.html')
//console.log(root_dir_all,root_dir_all+"\\index.html");
  app.use(express.static(root_dir_all ));
    
  // Handle React routing, return all requests to React app
 app.get('*', function(req, res) {/////if the request is get method go to the frontend index
   // res.sendFile(path.join(__dirname, 'clients/build', 'index.html'));
   return  res.sendFile(root_dir_all2)
  });
}else{
  app.use(express.static(path.join(__dirname,'/public')))
}
/////////////////////////////////////////////////////////////
//////////////////////////LIST OF COMPONENT CONTROOLERS

//require('./Controllers/Chat/io').io1(5200)

require(path.join(__dirname,'./Controllers/Chat/io') ).ioexpress(app).listen(PORT,()=>{
  console.log(`CONNECTED @ http://127.0.0.1:${PORT}`)
});



///https://cssbattle.dev/play/78 css battle
///icf job https://icf.wd5.myworkdayjobs.com/en-US/ICFExternal_Career_Site/userHome

///https://app.programiz.pro/course/learn-python-basics/get-started?page=1
//alt z wrap text in vitual studeo code
//https://www.1377x.to/search/learn%20python%20programming%20masterclass/1/

//https://www.includehelp.com/php/basics-aptitude-questions-and-answers.aspx
//https://www.includehelp.com/aptitude-questions-and-answers.aspx?ref=prep

//https://pages.awscloud.com/EMEA_Free_Live_Training-confirmation.html?aliId=eyJpIjoibEsyRWxsVmxIQ2hpUHB1SSIsInQiOiJUOUtxWmQ4b2NPSnlySWo4REZUTXpnPT0ifQ%253D%253D

/**
 * Q:
Can we use load balance on any of this database and how will application know which database has the record it request for in the case of horizontally scaled database
A:
The load balancer will address the web servers (in an auto-scaling group), which in turn will address the databases in the data tier.
 */


//https://pages.awscloud.com/GLOBAL-ln-GC-TrainCert-Cloud-Practitioner-Challenge-2022-reg.html
//https://handouts-live.s3.amazonaws.com/927859626f204776b5e36516ab7056d3?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20220818T092151Z&X-Amz-SignedHeaders=host&X-Amz-Expires=86400&X-Amz-Credential=AKIAJICNIQWVMWBRIUMQ%2F20220818%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=4e6a1d6978ab35c8424d88877e8ebffd3dd157d23df55874a5f3eed6d9243f8d
/*
Q:
I don't understand artifact, I need simple explain it
A:
3rd party auditors assess AWS services and certify them. You as a customer can then use these certifications to prove to your own clients that you are compliant.

still dont understand the difference between gured duty and aws shiled, please can you shade more light?
A:
Sheild is for DDos mitigation specifically. GuardDuty analyzes resources for suspicious activity and provides findings.


Is guard duty active by standard on all AWS accounts?
A:
No, it's a chargeable service that needs to be activate explicity. Shield standard is active by default and is free.


Please have a look at this link https://aws.amazon.com/certification/certified-cloud-practitioner/ to prepare fully for your exam.

https://aws.amazon.com/training/digital/aws-cloud-practitioner-essentials/?cp=sec&sec=prep



*/ 