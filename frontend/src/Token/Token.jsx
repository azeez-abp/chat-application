const TOKEN_NAME = "MY_CHAT_APP_TOKEN"
export default TOKEN_NAME;
export const CHAT_LOGIN_STATUS  = btoa("LOGIN_STATUS")
export  const SaveToken = (token)=>{

    let cut24awat =token;
      let $len  =42
     let cut1 = cut24awat.substr(0,$len )
     var replace1 = "(?<="+cut1+").+";
     var re1 = new RegExp(replace1,"g");
     let remain1   = cut24awat.match(re1)
     console.log(remain1," REM")
/////////////////////////////////////////////
    let cut2 = remain1[0].substr(0,$len )
    var replace2 = "(?<="+cut2+").+";
    var re2 = new RegExp(replace2,"g");
    let remain2   = remain1[0].match(re2)
    console.log(remain2," REM2")
///////////////////////////////////////////// 

/////////////////////////////////////////////
let cut3 = remain2[0].substr(0,$len )
var replace3 = "(?<="+cut3+").+";
var re3 = new RegExp(replace3,"g");
let remain3   = remain2[0].match(re3)
console.log(remain3," REM2")
/////////////////////////////////////////////


/////////////////////////////////////////////
let cut4 = remain3[0].substr(0,$len )
var replace4 = "(?<="+cut4+").+";
var re4 = new RegExp(replace4,"g");
let remain4   = remain3[0].match(re4)
console.log(remain4," REM2")
/////////////////////////////////////////////  




/////////////////////////////////////////////
let cut5 = remain4[0].substr(0,$len )
var replace5 = "(?<="+cut5+").+";
var re5 = new RegExp(replace5,"g");
let remain5   = remain4[0].match(re5)
console.log(remain5," REM2")
/////////////////////////////////////////////  

let cut6 = remain5[0]

    let all  = JSON.stringify([Math.random(), cut3,cut1,cut4,cut2,cut6,cut5]) 
   // console.log(cut24awat,all)
   // console.log(cut24awat,"\n",cut1,"\n",cut2,"\n",cut3,"\n",cut4,"\n",cut5,"\n",cut6,all)
   if(localStorage.getItem(TOKEN_NAME)){
    localStorage.removeItem(TOKEN_NAME)
   }

   localStorage.setItem(TOKEN_NAME,all)

}

export const GetToken  = ()=>{
 
     if(localStorage.getItem(TOKEN_NAME)){
      let theToken  =  JSON.parse(localStorage.getItem(TOKEN_NAME))
      let reconstruted   = theToken[2]+theToken[4]+theToken[1]+theToken[3]+theToken[6]+theToken[5]
      let decodeToken  = (reconstruted);
      return decodeToken;

      

     }

}