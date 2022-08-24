import React from 'react'
import { Skeleton, SkeletonCircle, SkeletonText,Box,Stack, useToast } from '@chakra-ui/react'


export default function SearchData({value}) {
   const toast = useToast()
  // const  getToast   = (title, message,type='success',time=3000,potision='top')=>{
  //   //const id = 'test-toast'
  //   try {
  //     toast({
  //       title: title,
  //       description: message,
  //       status: type,
  //       duration: time,
  //       isClosable: true,
  //       position:potision
  //     })
  //     return
  //   } catch (error) {

  //   }
  //  // if (!toast.isActive(id)) {
       
  //     //} 
     
  // }

  return (

    <Box display={'flex'}  color="#fff"    /*run function in parent*/>
      <>
      <span style={{position: "absolute", padding: "7px",fontWeight: 700,color:"#ff0000"}} >{value!==''? value:"" } </span> 
     <Stack width={"100%"} padding={"10px 0"}>
   
        <Skeleton height='20px' />
        <Skeleton height='20px' />
        <Skeleton height='20px' />

        <Skeleton height='20px' />
        <Skeleton height='20px' />
      
    </Stack>
      </>  
    </Box>
  )
}
