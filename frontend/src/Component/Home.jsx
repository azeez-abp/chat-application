import { 
    Box, 
    Container,
    VStack,
    Text,
    Tabs, 
    TabList, 
    TabPanels, 
    Tab, 
    TabPanel,
    useToast

} from '@chakra-ui/react'
import {Login} from './Pages/Login'
import {Register} from './Pages/Register'
import {useNavigate as useHistory} from 'react-router-dom'
import TOKEN_NAME from '../Token/Token'
import { CHAT_LOGIN_STATUS } from '../Token/Token'
import { useEffect,useState } from 'react'
import { hasLoggedIn } from './HasLoggedIn'










export const Home  = (props)=>{
  const toast = useToast()
     const   history  = useHistory()

     useEffect(()=>{
      hasLoggedIn() 
      if(localStorage.getItem(CHAT_LOGIN_STATUS)=='true'){
        getToast("SESSION ACTIVE","You need to logout","warning",2100,"top")
        setTimeout(()=>{
            history('/chats')
        },200)
      
      }
      console.log("ys")
     },[]) 
    

//   if( HasLoggedIn()){
//       getToast('Unautheticated Error','Invalid Session, Login','error')
//      localStorage.removeItem(TOKEN_NAME)
//     setTimeout(()=>{history('/chats')},3000)
//   }
//  console.log( HasLoggedIn(),"STA")
//  console.log(props,"HOME")

     
     
 //////////////////////check user lof=gin/////////////////////////////////////////////
// console.log(HasLoggedIn())
//  useEffect(()=>{
//   if(){
//   //getToast('Unautheticated Error','Invalid Session, Login','error')
//    // localStorage.removeItem(TOKEN_NAME)
//     setTimeout(()=>{history('/chats')},3000)
//    //console.log("NOT LOGIN")
//   }else{
//      // getData()
//   }

// },[history,/*user* this make app to redender indefinately*/])
// /////////////////////check user loggin///////////////////////////////////////
  
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
  const registerCall  = (property, propsUpdater)=>{
    propsUpdater(property)
  }



    return(
     // hasLogin?<Chat />:
     (  <Container maxW='xl' >
         <VStack spacing={"5px"}>
              <Box 
                  d="flex" 
                  justifyContent="center" 
                  p={2} 
                  bg="white" 
                  w="100%" 
                  m="40px 0 15px 0" 
                  borderRadius="1g"
                  borderWidth="1px" 
                   >
                     <Text fontSize={"4xl"} fontFamily="Fira Sans" color={"blackAlpha.700"} >CHAT APP</Text>
              </Box>
              <Box
               w="100%"
              >
              <Tabs>
                <TabList>
                    <Tab w="50%" fontSize="2xl" color={"white"}>Login</Tab>
                    <Tab w="50%" fontSize="2xl" color={"white"} className="registerTab">Register</Tab>
                </TabList>

                <TabPanels>
                    <TabPanel>
                      <Login />
                    </TabPanel>
                    <TabPanel>
                      <Register onRegisterButonClick={registerCall}   />
                    </TabPanel>
                    
                </TabPanels>
                </Tabs>
       
                
             </Box>

         </VStack>

       </Container>)
    )
}