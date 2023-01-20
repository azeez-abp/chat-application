import TOKEN_NAME from '../Token/Token'
import {CHAT_LOGIN_STATUS } from '../Token/Token'
import {makeRequest} from './request'
export const hasLoggedIn   = async()=>{
  await  makeRequest('/api/chat/checklogin',{},(err, out)=>{
    if(err) {
      localStorage.setItem(CHAT_LOGIN_STATUS,false)
      localStorage.removeItem(TOKEN_NAME)
      return false
    }
    if(out.suc){
      setTimeout(()=>{
        localStorage.setItem(CHAT_LOGIN_STATUS,true)
      },20)
    }
    return  window.CHAT_LOGIN_STATUS  
    },'POST' )
  
 
     }