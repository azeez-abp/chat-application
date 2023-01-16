import TOKEN_NAME from '../Token/Token'
import axios from 'axios'
import { GetToken,CHAT_LOGIN_STATUS } from '../Token/Token'
import { app_domain_proxy } from './app_domain'

export const hasLoggedIn   = ()=>{

       const options = {
         method: 'POST',
         headers: { 'Content-Type': 'application/json',
                     'authorization':'Bearer '+GetToken() 
                    
                  },
         data: {},
         url:app_domain_proxy+'/api/chat/checklogin',
       };
      let d  =  axios(options)
       d.then(out=>{
   
           if(out.data.suc){
           
             setTimeout(()=>{
               localStorage.setItem(CHAT_LOGIN_STATUS,true)
             },20)
           }
            

       }).catch(er=>{
        localStorage.setItem(CHAT_LOGIN_STATUS,false)
        localStorage.removeItem(TOKEN_NAME)
      
       }) 
       // let d  = await axios.post("/api/chat/post-register",formData,options)
        
       return  window.CHAT_LOGIN_STATUS  
 
     }