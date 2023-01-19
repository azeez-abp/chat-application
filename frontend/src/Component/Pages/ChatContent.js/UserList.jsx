import { Avatar, Box ,Text} from '@chakra-ui/react';
import React, { useState } from 'react';
import { CheckIcon } from '@chakra-ui/icons';
export default function UserList({user,handleFunction,bg,color,title,hasSelected}) {

console.log(hasSelected,"SELECTED")

  return (
    <Box
      onClick={handleFunction}
      cursor="pointer"
      bg  =  {bg?bg:"#E8E8E8"}
      _hover={{bg:"#383838",color:"white"}}
      width="100%"
      display={"flex"}
      alignItems="center"
      color={color?color: "#000000"}
      px={3}
      py={2}
      mb={2}
      mt={3}
      whiteSpace="nowrap"
      overflowX={"hidden"}
      borderRadius={"lg"}
      title={title?title:''} 
      position={"relative"}
    >
        <Avatar
          mr={2}
          size="sm"
          cursor={"pointer"} 
          name={user.fn}
          src={"/"+user.profile_img}
          
        >

        </Avatar>
        <Box>
              <Text>Name: {user.fn} </Text>
              <Text><b>Email: {user.email}</b> </Text>
    
              {hasSelected&&<CheckIcon 
                 position={"absolute"}
                 right={"10px"}
                 top={"23px"}
                 borderRadius={"100%"}
                 background={"#000"}
               />}
        </Box>

    </Box>
  )
}
