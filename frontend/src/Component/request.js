import { GetToken } from '../Token/Token';
import { app_domain_proxy } from './app_domain';

import axios from 'axios'

  export  const makeRequest = async (url,data,cb,mtd=null,headers_opt=null)=>{
  let   header_setting  = headers_opt !==null ?headers_opt: { 
    //  'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Type': 'application/json',
      'authorization': 'Bearer '+GetToken(),
     }
        const options = {
            method: mtd?mtd:'POST',
            headers:header_setting,
            
            // body:  {userID:inp},
             data:  data,
            url:app_domain_proxy+ url,
          };
          try {
         //   console.log(app_domain_proxy+ url)
              let d  =  await axios(options)
             let out  = d.data
               if(out.err){
                return cb({message:out.err,isArr:typeof out.err=='object'?true:false},null)
               }
                 cb(null,out)  
    
    
          } catch (error) {
            cb(error,null)
           
          }
    
    
        }
            