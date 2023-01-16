import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import { CHAT_LOGIN_STATUS, GetToken } from '../Token/Token';

import { useNavigate } from 'react-router-dom';
import { DataStore } from '../Context/ChartProvider';///all data container

import SideBar from './Pages/ChatContent.js/Header';
import ChartBoard from './Pages/ChatContent.js/ChartBoard';
import { MyChat } from './Pages/ChatContent.js/MyChat';
import { hasLoggedIn } from './HasLoggedIn';
import { 
  Box, 
  useToast,
  // Container,
  // VStack,
  // Text,
  // Flex,
 
  // HStack,
  // useFocusEffect

} from '@chakra-ui/react'
import { app_domain_proxy } from './app_domain';
export const Chat  =  ()=>{ 

    const history  = useNavigate()
    const toast = useToast()
    const [load,setLoad]  = useState(false)
    const [firstload,firstloadUpdaterFunction]  = useState(false)
    const [mycontact, setMyContact] = useState([]) 

    const {
      user,setUser,
      userInfo,setUserInfo,
      chats,setChats,
      setHasError,
      selectedChat,setSelectedChat,
      setShowActionMenue,

      
    }  = DataStore();






    const getMyChatList = async (url,user_id)=>{
      const options = {
          method: 'POST',
          headers: { 
          //  'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Type': 'application/json',
            'authorization': 'Bearer '+GetToken(),
           },
          
          // body:  {userID:inp},
           data:  {userID:user_id },
          url:app_domain_proxy+"/api/chat/"+url,
        };
        try {
            let d  =  await axios(options)
           let out  = d.data
           
             
             if(out.chat.length>0){
               const listChat  = [...out.chat] 
               const listChatUser  = [...out.users] 
               setUser( listChatUser)
               setChats(listChat)
                 let chId    = {}
               listChat.forEach(l=>{
                   chId[l._id] =false
               })
               setShowActionMenue(chId )
              
             }else{
              
              setTimeout(()=>{
                setUser([])   
              },4000)
              
               
              //  setUser({})
             }
           
        } catch (error) {
          
          setHasError({is_in:true,info:error.message })
          setTimeout(()=>{setHasError({is_in:false,info:'' })},5000)
           
        }
       
      }
          
   //////////////////////check user  lof=gin/////////////////////////////////////////////
   




    useEffect(()=>{
     hasLoggedIn() 
     if(localStorage.getItem(CHAT_LOGIN_STATUS)=='false'){
       getToast("SESSION EXPIRED","Login again","error",2100,"top")
      setTimeout(()=>{
          history('/')
          window.location.reload()
          window.location.href='/'
      },0)
    
     }else{
         getData(getMyChatList)
     }
    //  
    },[localStorage.getItem(CHAT_LOGIN_STATUS)]) 
 
/////////////////////check user loggin///////////////////////////////////////
    const  getToast   = (title, message,type='success',time=3000,potision='top')=>{
    // const id = 'test-toast'
     
    // if (!toast.isActive(id)) {
         toast({
           title: title,
           description: message,
           status: type,
           duration: time,
           isClosable: true,
           position:potision
         })
       //} 
   }


 ///////////////////////get usr data////////////////////////////////////////////////
const getData  = async (getChatListCb)=>{
    const options = {
        method: 'POST',
        headers: { 
        //  'Content-Type': 'application/x-www-form-urlencoded',
          'Content-Type': 'application/json',
          'authorization': 'Bearer '+GetToken()
         },
      //  data: qs.stringify(data),
        url:app_domain_proxy+"/api/chat/profile",
      };
      try {
          let d  =await axios(options)
         let out  =d.data.data 
           if(out.fn){
            getChatListCb('fetchchat',out._id)
              setUserInfo(out)
            //  setUser({user:out})
           }else{
            setUserInfo({})
            //  setUser({})
           }
      } catch (error) {
         
         setHasError({is_in:true,info:error.message })
         setTimeout(()=>{setHasError({is_in:false,info:'' })},5000)
      }
     
   }




    return(

      (  <div className='wrapper' style={{width:"100%"}} >
          
            {userInfo &&<SideBar  name={userInfo.fn} email={userInfo.email} img={userInfo.profile_img}></SideBar>}  
         
         <Box 
         
          display="flex"
          justifyContent={'space-between'}
          w={ {base:"100%", md:"100%"} }
          h="90vh"
          p="10px"
          borderWidth={"3px"}
          // bg={"white"}

         >
            {<MyChat    />/*leftside*/} 
            <ChartBoard 
            getMyChatList={getMyChatList}
            
            /> {/*rightside*/}
             
         </Box>

   
      
      </div>)
    )
} 