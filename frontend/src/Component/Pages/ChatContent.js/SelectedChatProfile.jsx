import React from 'react'
import { DataStore } from '../../../Context/ChartProvider'
import { Modals } from '../../Modal'
import { Avatar,useDisclosure,Button,Box } from '@chakra-ui/react'

function SelectedChatProfile({img,name,email,title,style}) {
    const { isOpen, onOpen, onClose } = useDisclosure()


    const { 
        selectedChat,setSelectedChat

    } = DataStore()

const openProfilePane  = ()=>{
    

    
    onOpen()
}


  return (
    <>
   
     <Box
       w={"30px"}
       h={"30px"}
       float={"right"}
       margin={"-1px 10px 10px 10px;"}
     
     >
      {        Modals(
                         Button,
                         title , 
                         (<div
                         style={{
                        display: "flex",
                         flexDirection:"column",
                         justifyContent:"center",
                         alignItems: "center", 
                         paddingBottom: "39px"

                        }}>
                             <div> <Avatar name={name} src={"/"+img}></Avatar></div>
                              <p> Name: {name}</p>
                              <p> Email: {email}</p>
                           </div>),
                        'User Profile',

                        'User profile',
                        false,
                         null,
                         null,


                         null,
                         style





                        )}
     </Box>
     </>
  )
}

export default SelectedChatProfile