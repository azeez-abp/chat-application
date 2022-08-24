import { Avatar, Box, Tooltip } from '@chakra-ui/react'
import { m } from 'framer-motion'
import React from 'react'
import ScrollableFeed from 'react-scrollable-feed'
import { DataStore } from '../../../Context/ChartProvider'
import { isSameSender,isLastMessage } from '../../SomeFunctions'

function MessageBody({messages}) {
    const {userInfo}  = DataStore()

  return (
    <ScrollableFeed  forceScroll={true} style={{maxHeght:"90vh"}}> 
         <div 
         style={{
                display:"flex",
                 flexDirection:"column",
                 justifyContent:"space-between",
              //  margin:( message.sender._id !==userInfo._id )?"0":"0 50%" 
            
                 }}>
    { messages && messages.map( (message, i) => (
                <p key={message._id} style={{marginBottom:"3px"}}>
             
                 {( message.sender._id !==userInfo._id ) ?<>
                    <Box 
                    display={"flex"} 
                     float={"left"}
                     width={"50%"}
                    bg="GrayText" 
                    color={"white"} 
                    padding={"6px"} 
                    border={"none"}
                    borderRadius={"4px"}
                    fontWeight={600}
                    m={" 0px 0px 0px 0x"}
                    > 
                    <Tooltip placement={"bottom-start"} hasArrow label={message.sender.name}>
                      <Avatar src={message.sender.profile_img} mt={"7px"} mr={1} size="sm" cursor="pointer" >

                      </Avatar>
                    </Tooltip> 
                    <Box>
                        {message.content}
                    </Box>
                   </Box> 

                 </>
                 : <Box  
                    display={"flex"} 
                    float="right"
                    width={"50%"}
                    bg={"green"} 
                    color={"white"} 
                    padding={"6px"} 
                    border={"none"}
                    borderRadius={"4px"}
                    fontWeight={600}
                    m={" 0px 0 0 0px"}
                 >
                 {message.content}
             </Box> }
        </p>
         )
 

    ) } 
    </div>
  </ScrollableFeed>
  )
}

export default MessageBody