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




export default function SingleChat({getMyChatList}) {
    const [viewSelectedChatProfile,setViewSelectedChatProfile]    =useState(false)

     
    const  [newMessage,setNewMessage]    = useState ('')
    const history = useNavigate()
    const toast  = useToast()
    const {  
        selectedChat,setSelectedChat,
        isLoading,setIsLoading,
        messages,setMessages,
        userInfo,
        ioClient

    } = DataStore()


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
          
   


const removeSelectedChat  = ()=>{
    
     setSelectedChat([]) 
   
}


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


const typing  = (e)=>{
  setNewMessage(e.target.value)
}


const fetchChatsMessages  = async ()=>{
  console.log(selectedChat,"SELECTED CHAT")
      setIsLoading(true)
      selectedChat.length>0 && /*setIsLoading(true);*/ await  makeRequest('/api/chatline/getallmessages/'+selectedChat[0]._id,{},(err, data)=>{
    if(err) return getToast('Message Sending Error',err.message,'error',4000,'top');setIsLoading(false)
    
    if(data.suc) setMessages(data.message) ;setIsLoading(false)
},'GET' )

}

useEffect(()=>{

  ioClient.on("connection", (socket) => {
    console.log(socket.id,"wqedefwe"); // x8WIv7-mJelg7on_ALbx

   socket. on('hankshake',(e)=>{
      console.log("HAVING",e)
    })
  });

 

},[])   
useEffect(()=>{
fetchChatsMessages()
},[selectedChat])

const sendMessage  = (e)=>{
  if(e.key ==='Enter' && newMessage){
   
         setNewMessage('')
         makeRequest('/api/chatline/sendmessage',{content:newMessage,chatId:selectedChat[0]._id},(err, data)=>{
            if(err) return getToast('Message Sending Error',err.message,'error',4000,'top')
            
            if(data.suc) setMessages([...messages,data.message])
      } )
  }
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


            <Box>{selectedChat[0].isGroupChat?selectedChat[0].chatName: (selectedChat[0].users[1]._id===userInfo._id) ? selectedChat[0].users[0].fn:selectedChat[0].users[1].fn   } </Box>

   


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
          
            />
            {/* <InputRightAddon children='.com' /> */}
            <InputRightElement
             pos={"absolute"}
             top={"10px"}
             fontSize={"1.2em"}
             cursor={"pointer"}
             right={"17px"}
             borderLeft={"2px solid #e3e3e3"}
           
          
            children={ <svg color="inherit" viewBox="0 0 32 32" aria-hidden="true" class="e5ibypu0 lc-di14ft"><path d="M6.4,5.6l21,9.5c0.5,0.2,0.7,0.8,0.5,1.3c-0.1,0.2-0.3,0.4-0.5,0.5l-21,9.5  c-0.5,0.2-1.1,0-1.3-0.5c-0.1-0.3-0.1-0.6,0-0.8L8.6,18L20.5,16L8.6,14.1L5.1,6.9c-0.2-0.5,0-1.1,0.5-1.3C5.8,5.5,6.1,5.5,6.4,5.6z"></path></svg>}
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
