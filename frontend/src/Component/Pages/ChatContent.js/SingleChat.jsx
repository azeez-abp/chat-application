import { ArrowBackIcon, ViewIcon } from '@chakra-ui/icons'
import { Box, Text } from '@chakra-ui/react'
import { transform } from 'framer-motion'
import React, { useState } from 'react'
import { DataStore } from '../../../Context/ChartProvider'
import SelectedChatProfile from './SelectedChatProfile'
export default function SingleChat({c}) {
    const [viewSelectedChatProfile,setViewSelectedChatProfile]    =useState(false)
    const { 
        selectedChat,setSelectedChat

    } = DataStore()


const removeSelectedChat  = ()=>{
    setSelectedChat([])
}



  return (
  <>

      
            
    
      {selectedChat.length >0 
      ?
       <>
           
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


            <Box>{selectedChat[0].isGroupChat?selectedChat[0].chatName: selectedChat[0].users[1].fn    } </Box>

   


         <SelectedChatProfile 
         title={ ViewIcon} 
         name={selectedChat[0].isGroupChat?selectedChat[0].chatName: selectedChat[0].users[1].fn    }  
         img={selectedChat[0].isGroupChat?selectedChat[0].chatName: selectedChat[0].users[1].profile_img     } 
         email  = {selectedChat[0].isGroupChat? selectedChat[0].users[0].email: selectedChat[0].users[1].email/*email of creator*/   }  
         >
        </SelectedChatProfile>
      </Box>    
     {/* ============================ */}

        
        <Box
          bg={"#e9e9e9"}
          w={"100%"}
          minH={"100%"}
        >
            chat
        </Box>
           
           </Box>  
       </ > 
      

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
