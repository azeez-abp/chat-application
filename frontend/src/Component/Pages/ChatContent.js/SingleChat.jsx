import { ArrowBackIcon, AttachmentIcon, ChatIcon, ViewIcon } from '@chakra-ui/icons'
import { Box, Text,Spinner, FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  TextArea,
  InputRightElement,
  InputGroup,
  InputLeftElement,
  Textarea,
  useToast,
 } from '@chakra-ui/react'
import { transform } from 'framer-motion'
import React, { useState,useEffect } from 'react'
import { DataStore } from '../../../Context/ChartProvider'
import SelectedChatProfile from './SelectedChatProfile'
import { useNavigate  } from 'react-router-dom'
import { GetToken } from '../../../Token/Token'
import axios from 'axios'
import MessageBody from './MessageBody'
import {io} from 'socket.io-client'

export default function SingleChat({getMyChatList}) {
    const [viewSelectedChatProfile,setViewSelectedChatProfile]    =useState(false)

     
    const  [newMessage,setNewMessage]    = useState ('')
    const  [hasConnected,setHasConnected]    = useState (false)
    const  [typingIn,setTypingIn]    = useState (false)
    let  [enterCount,setEnterCount]  = useState(0)
    const history = useNavigate()
    const toast  = useToast()
    const {  
        selectedChat,setSelectedChat,
        isLoading,setIsLoading,
        messages,setMessages,
        userInfo,
        getToast,
        typeValue,setTypeValue

    } = DataStore()

    const socket  = io('http://localhost:7000')

    useEffect(
  
      ///////////////////
      ()=>{

    
   
    ///////////////////////////////////////////
 if(selectedChat.length>0){
    socket.on('connect',()=>{
      //////////////////////////////everything in s
     setHasConnected(true)
     console.log(selectedChat," se")
      selectedChat.length>0 && socket.emit('setup',{...userInfo,room_id:socket.id,chat_id:selectedChat[0]._id})

    })
   // selectedChat.length>0 &&  socket.emit('setup',{...userInfo,room_id:socket.id,chat_id:selectedChat[0]._id})
    /////////////////////////////////////////////
    socket.on('connected',(data)=>{
    //(data !=='' || data !=='null') && getToast('CONNETION MESSAGE',`${data.fn} has joined`,'success') 
  //getToast('CONNETION MESSAGE','You join room'+data,'success')
   }) 
   ///////////////////////////////////////////////////////////
   socket.on('user-enter',(user_)=>{
    if(user_._id !=userInfo._id && enterCount===0){
        setTypeValue(`${user_.fn} just enter the room `)
        enterCount  = enterCount+1
       setEnterCount(enterCount)
    }
   })

   if(typingIn){
    console.log("IS TYPING 1", enterCount)
     socket.emit('is-typing', userInfo);
   }

   socket.on('is-typing-in',(user_)=>{
    console.log("IS TYPING 2", enterCount,user_.fn)
     if(user_._id !== userInfo._id){
       console.log("RECEIVE TYPING")
        setTypeValue(`${user_.fn} is typing...`)
        setTimeout(()=>{setTypeValue(``)},3000)
     }
   })
   console.log(typeValue," valu")
    //socket.emit('setup',{...userInfo,room_id:socket.id})
    //socket.on('typin')
    
    
    
    ///////////////////
      //  getToast('Message Sending Error','doen','success',4000,'top')
           } //if end
    },[selectedChat,typingIn])  
    


    const makeRequest = async (url,data,cb,mtd=null)=>{
      const options = {
          method: mtd?mtd:'POST',
          headers: { 
          //  'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Type': 'application/json',
            'authorization': 'Bearer '+GetToken(),
           },
          
          // body:  {userID:inp},
           data:  data,
          url:url,
        };
        try {
            let d  =  await axios(options)
           let out  = d.data
             if(out.err){
              return cb({message:out.err,isArr:typeof out.err=='object'?true:false},null)
             }
               cb(null,out)  
  
  
        } catch (error) {
          cb(error,null)
          setTimeout(()=>{
            if(error.hasOwnProperty('request')){
              if(error.request.status==401){
                history('/')
              }
            }
          },5200)
          
          
         
        }
  
  
      }
          
   
  useEffect(()=>{
    socket.on('has-send-message',(num,id,messages_)=>{
      console.log(id, messages_, "BY IOs")
       if(id!==userInfo._id){
        setMessages(messages_)
       }
    })     
 
   },[messages])



const removeSelectedChat  = ()=>{
    
     setSelectedChat([]) 
   
}



const typing  = (e)=>{
 
  setNewMessage(e.target.value)
}


const fetchChatsMessages  = async ()=>{

     if(  selectedChat.length>0) {
        setIsLoading(true)
         await  makeRequest('/api/chatline/getallmessages/'+selectedChat[0]._id,{},(err, data)=>{
            if(err) return getToast('Message Sending Error',err.message,'error',4000,'top');setIsLoading(false)
            
            if(data.suc) setMessages(data.message) ;setIsLoading(false)
        },'GET' )

     } 
     
    
}



useEffect(()=>{
fetchChatsMessages()
},[selectedChat])

const sendMessage  = (e)=>{
  if(e.key ==='Enter' && newMessage){
   
         setNewMessage('')
         makeRequest('/api/chatline/sendmessage',{content:newMessage,chatId:selectedChat[0]._id},(err, data)=>{
            if(err) return getToast('Message Sending Error',err.message,'error',4000,'top')
            
            if(data.suc){ 
            //   setMessages([...messages,data.message])
                socket.emit("new-messaga-send",1,userInfo._id,[...messages,data.message])
            };
      } )
  }
}

const userIsTyping  = ()=>{

  setTypingIn(true)

}

const userStopTyping  = ()=>{

  setTimeout(()=>{ setTypingIn(false)},6000)
 
}

  return (
  <>

      
            
    
      {selectedChat.length >0 
      ?
       isLoading?(<Box
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          w={"100%"}
          h={"100%"}
        ><Spinner
        thickness='4px'
        speed='0.65s'
        emptyColor='gray.200'
        color='blue.500'
        size='xl'
        alignSelf={"center"}
        margin="auto"
      /></Box>):
     (<>
           
    < Box
       display={"flex"}
       flexDir="column"
       justifyContent={"space-between"}
    > 

        {/* ============================= */}
         
          <Box
               display={"flex"}
               justifyContent={'space-between'}
               alignItems="center"
               w="100%" 
               bg="white"
               p="5px  10px 5px 10px"
               borderWidth={"5px"} 
               borderRadius={"4px"}
          >
            <Text
            display={{base:"block",md:"none"}}
            w={"30px"}
            h={"30px"}
            bg={"#000"}
            color={"#fff"}
            borderRadius={"4px"}
            fontSize={"16px"}
            >
                <ArrowBackIcon 
                onClick={removeSelectedChat}
                >

                </ArrowBackIcon>

            </Text>


            <Box>{selectedChat[0].isGroupChat?selectedChat[0].chatName: (selectedChat[0].users[1]._id===userInfo._id) ? selectedChat[0].users[0].fn:selectedChat[0].users[1].fn   } 
               <Text>{typeValue} </Text>
            </Box>

   


         <SelectedChatProfile 
         title={ ViewIcon} 
         name={selectedChat[0].isGroupChat?selectedChat[0].chatName: selectedChat[0].users[1].fn    }  
         img={selectedChat[0].isGroupChat?selectedChat[0].chatName: selectedChat[0].users[1].profile_img     } 
         email  = {selectedChat[0].isGroupChat? selectedChat[0].users[0].email: selectedChat[0].users[1].email/*email of creator*/   }  
         >
        </SelectedChatProfile>
      </Box>    
     {/* ============================ */}

        {/* ==========  */}
        <Box
          bg={"#e9e9e9"}
          w={"100%"}
          minH={"70vh"}
          justifyContent={"space-between"}
          alignItems={"baseline"}
          display="flex"
          flexDir={"column"}
        >   
           
           <div className='message'>
              <MessageBody messages={messages}>

              </MessageBody>
           </div>

          <FormControl  onKeyDown={sendMessage}   
          isRequired 
          bg={"#fff"}
          display={"flex"}
          justifyContent={"space-beteen"}

          >
             <FormLabel>First name</FormLabel>
             <InputGroup 
             size='sm'
             border={"4px solid #e45 "}
             p={"3px"}
             borderRadius={"13px"}
             >
             <InputLeftElement
              pos={"absolute"}
              top={"10px"}
              fontSize={"1.2em"}
              cursor={"pointer"}
              borderRight={"2px solid #e3e3e3"}
              children={<AttachmentIcon color='#38B2AD'   h={"1.3em"}w={"1.3em"}/>}
              left={"9px"}
            />
            <Textarea 
            placeholder='write message'
            p="0 44px"
            size={"sm"}
            h = {"50px"}
            minHeight={"50px"}
            borderRadius="4px"
            fontSize={"15px"}
            lineHeight={2}
            resize={"none"}
            onChange= {typing}
            value={newMessage}
            bg={"#e45"}
            color={"#fff"}
            fontWeight={600}
            border={"none"}
            onKeyDown = {userIsTyping}
            onKeyUp  = {userStopTyping}
          
            />
            {/* <InputRightAddon children='.com' /> */}
            <InputRightElement
             pos={"absolute"}
             top={"10px"}
             fontSize={"1.2em"}
             cursor={"pointer"}
             right={"17px"}
             borderLeft={"2px solid #e3e3e3"}
           
          
            children={ <svg color="white" viewBox="0 0 32 32" aria-hidden="true" class="e5ibypu0 lc-di14ft"><path d="M6.4,5.6l21,9.5c0.5,0.2,0.7,0.8,0.5,1.3c-0.1,0.2-0.3,0.4-0.5,0.5l-21,9.5  c-0.5,0.2-1.1,0-1.3-0.5c-0.1-0.3-0.1-0.6,0-0.8L8.6,18L20.5,16L8.6,14.1L5.1,6.9c-0.2-0.5,0-1.1,0.5-1.3C5.8,5.5,6.1,5.5,6.4,5.6z"></path></svg>}
          />
         </InputGroup>
           </FormControl>

         



        </Box>
        {/* ============== */}
           
       
       </Box>  
       </ > )
      

      :
      
      <Box 
      display={"flex"}
      justifyContent={"center" /*horizonatlly*/}
      alignItems={"center" /*vertcally*/}
      w={"100%"}
      h={"100%"}
     fontSize={"3em"}
     fontWeight={"800"}
      > <Text>Select a user to start chat</Text>
      </Box>}     

 

    {/* <div style={{color:"#f00",width:"200px",height:"200px",background:"#000",position:"absolute",
    top:c.py+"",left:c+px}}>
         {JSON.stringify(c)} SingleChat
    </div> */}
    
   
    </>  
  )
}
