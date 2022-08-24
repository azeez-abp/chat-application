import React from 'react'
import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    useDisclosure,
    Input,
    Button,
    useToast,
  } from '@chakra-ui/react'
  import { useRef,useEffect,useState } from 'react'
  import SearchData from './Skeleton'
  import axios from 'axios'
  import { GetToken } from '../../../Token/Token'
  import UserList from './UserList'
  import { DataStore } from '../../../Context/ChartProvider'
  import { useNavigate } from 'react-router-dom'






export const Drawers =(Element,Child)=> {  
const   history    =useNavigate()
 const toast  = useToast()   
 const { isOpen, onOpen, onClose } = useDisclosure()
 const btnRef = useRef()
 const [hasFocus,setHasFocus]   = useState(false)
 const [searchItemLoaded, setSearchItemLoading ]  = useState(false)
 const {
    user, setUser,
    searchData, setSearchData,
    selectedChat,setSelectedChat,
    userInfo,
    chats,setChats,
    alreadyInChat,setAlreadyInChat,
    setHasError,
    setIsLoading,

}   = DataStore()

   const [notFound,setNotFound]  = useState('')
  
   useEffect(()=>{

   },[chats]) 

 const getData  = async (inp,setSearchItemLoadingCb,setNotFoundcb)=>{
    const options = {
        method: 'POST',
        headers: { 
        //  'Content-Type': 'application/x-www-form-urlencoded',
          'Content-Type': 'application/json',
          'authorization': 'Bearer '+GetToken(),
         },
        
        // body:  {userID:inp},
         data:  {search:inp[0]},
        url:"/api/chat/getuser",
      };
      try {
          let d  =await axios(options)
         let out  =d.data
         
           if(out.users.length>0){
             const userSearch = {...out.users} 
             setSearchData(out.users)
             setSearchItemLoadingCb(true)
         
           }else{
            setNotFoundcb(inp[0]+" not found")
            setTimeout(()=>{
             setSearchData([])   
            },4000)
            
             
            //  setUser({})
           }
         
      } catch (error) {
        if(error.response.status==401){
          getToast('EXPIRED SESSION','Login again',2000,'top-left')
        }
         
      }
     
   }


   const  getToast   = (title, message,type='success',time=3000,potision='top')=>{
    //const id = 'test-toast'
    
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

 const handleSearch  = ( argOfCb )=>{
    if(argOfCb.length >0 && argOfCb[0].trim() !=='' ){
        getData(argOfCb,setSearchItemLoading,setNotFound)
    }else{
        
        setSearchItemLoading(false)
        setSearchData([])
        setNotFound('')
    }
  

 }


 const  debouncing= (cb,d)=>{
    let timer ;
    setHasFocus(true)  
    return (...arg)=>{
      if(timer) clearTimeout(timer);
        
        timer  = setTimeout(()=>{
          cb(arg)
        },d)
    }
  }


  const addToChatList  = async(data)=>{

    let selectedUser   = await searchData.find(search_user=>search_user._id==data.userId2)////from what you 
   
    let checkMayBe_selectedUser_in_Chat_List  = await chats.length>0 && chats.find(chat=>(chat.usersId[0] == userInfo._id && chat.usersId[1] ==selectedUser._id) && (!chat.isGroupChat && chat.usersId.includes( selectedUser._id)) ) 
      
    if(checkMayBe_selectedUser_in_Chat_List) {
        setHasError({is_in:true,info:selectedUser.fn+" is already in your chat list" })
        setTimeout(()=>{setHasError({is_in:false,info:'' })},5000)
        onClose()
        return;
    } 


       onClose()
             setIsLoading(true)
         getMyChatList('chatlist',data.userId2,(chatsData)=>{
            setChats(chatsData)
            setIsLoading(false)
            //fetchMyChatList('fetchchat')
         })            
  }



  const fetchMyChatList = async (url)=>{
    const options = {
        method: 'POST',
        headers: { 
        //  'Content-Type': 'application/x-www-form-urlencoded',
          'Content-Type': 'application/json',
          'authorization': 'Bearer '+GetToken(),
         },
        
        // body:  {userID:inp},
         data:  {userID:2133434132 },
        url:"/api/chat/"+url,
      };
      try {
          let d  =  await axios(options)
         let out  = d.data

           
           if(out.chat.length>0){
             const listChat  = [...out.chat] 
             setChats(listChat)

            
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
  

  const getMyChatList = async (url,user_id,cb)=>{
    
    const options = {
        method: 'POST',
        headers: { 
        //  'Content-Type': 'application/x-www-form-urlencoded',
          'Content-Type': 'application/json',
          'authorization': 'Bearer '+GetToken(),
         },
        
        // body:  {userID:inp},
         data:  {userID:user_id },
        url:"/api/chat/"+url,
      };
      try {
          let d  =  await axios(options)
         let out  = d.data
           

           if(out.chat.hasOwnProperty('_id')){

             const listChat  = [...chats,out.chat] 
            //  setUser(listChat)
            cb( listChat)
            
            
           }else{
            
           }
         
      } catch (error) {

        //if(error.response.status==401){
         // getToast('EXPIRED SESSION','Login again',2000,'top-left')
        //}
         
      }
     
    }
 
 return (
    <div>
        <>
      <Element ref={btnRef}  onClick={onOpen}>
      {typeof Child==='string'?Child:<Child />}
      </Element>
      <Drawer
        isOpen={isOpen}
        placement='left'
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Find Friend or Group</DrawerHeader>

          <DrawerBody bg={"rgba(0,0,0,0.6)"}>
            <Input color={"#fff"} placeholder='Search...' onKeyUp={(ev)=>{
                debouncing(handleSearch,1000)(ev.target.value)
            }} /> 
               
              {searchItemLoaded && searchData.length>0? searchData.map((user,ind)=>
              {  
                 if(user._id != userInfo._id){
                return (<UserList
                 key  ={user.userId} 
                 user = {user}
                 handleFunction  = {()=>{addToChatList({userId1:user.userId,userId2:user._id})} } 
              />)
              }
            }
              )  : hasFocus? <SearchData value={notFound} /*show skeleton*/ />:''}
          </DrawerBody >
          
          <DrawerFooter>

            {/* <Button variant='outline' mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme='blue'>Save</Button> 
        */}
           </DrawerFooter>
          
        </DrawerContent>
      </Drawer>
    </>
    </div>
  )
}
