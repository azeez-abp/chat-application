import { AddIcon } from '@chakra-ui/icons'
import { 
  
    Text,
    Flex,
    Avatar,
    Badge,
    Box,
    Button,
    VStack,
    Stack,
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    Input,
    useDisclosure,
    List,
    ListItem,
    ListIcon,
    OrderedList,
    UnorderedList,
  
  
  } from '@chakra-ui/react'

import { DataStore } from '../../../Context/ChartProvider'
import {GetToken} from './../../../Token/Token'
import axios from 'axios'
import { useToast } from '@chakra-ui/react'
import { Modals } from '../../Modal'
import { useState } from 'react'
import UserList from './UserList'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import DeleteChat from './DeleteChat'
import {UpdateGroupChat} from './UpdateGroupChat'

export const MyChat = ()=>{
  const [searchItemLoaded, setSearchItemLoading ]  = useState(false)
  const [inputValue, setInputValue ]  = useState()
  const [hasNotBeenSeleted,sethasNotBeenSeleted ]  = useState({})
  const [userSelectedForGroupChat,setNotUserSelectedForGroupChat]  = useState([])
  const [groupName, setGroupNamef]  = useState('')

  const [coor,setCoor]  = useState({})
  const {user,setUser,searchData, setSearchData,selectedChat,setSelectedChat,chats,setChats,hasError,
  setHasError ,userInfo,isLoading,setIsLoading,SearchData,showActionMenue,setShowActionMenue
  }   = DataStore()
    
  const { isOpen, onOpen, onClose } = useDisclosure()
  const toast  = useToast()
  const history = useNavigate()
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
        
 


   const addToGroup  = (data)=>{
     //sethasNotBeenSeleted({...hasNotBeenSeleted, [data.userId2]:false})
        
     sethasNotBeenSeleted({...hasNotBeenSeleted, [data.userId2]:!hasNotBeenSeleted[data.userId2]})
        
      if(hasNotBeenSeleted[data.userId2]){ 
        setNotUserSelectedForGroupChat([...userSelectedForGroupChat,data.userId2]);
      }
 
      
 
      //setTimeout(()=>{
        if(userSelectedForGroupChat.includes(data.userId2) && !hasNotBeenSeleted[data.userId2]  ){
          let remainingUsers  =  userSelectedForGroupChat.filter(user=>user !== data.userId2 )
          setNotUserSelectedForGroupChat(remainingUsers );
}
      //},2000)  
     
              
   
     

  }


//  const openProfilePane =()=>{
//     console.log("AWARE")
//    setSelectedChat(selectedChat)
//    setTimeout(()=>{onOpen()},2000)
     
//  }

 const setGroupName  = (ev)=>{
     setGroupNamef(ev.target.value);
 }  
const handleGroupNameInputChange = (ev)=>{
        setInputValue(ev.target.value)

 const getData  = async ()=>{
  const options = {
      method: 'POST',
      headers: { 
      //  'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Type': 'application/json',
        'authorization': 'Bearer '+GetToken(),
       },
      
      // body:  {userID:inp},
       data:  {search:ev.target.value},
      url:"/api/chat/getuser",
    };
    try {
        let d  =await axios(options)
       let out  =d.data
       
         if(out.users.length>0){
           const userSearch =out.users 
           console.log([userSearch]);
           setSearchData(userSearch)
          // setSearchItemLoading(true)
       
         }else{
          //setNotFound(inp[0]+" not found")
          setTimeout(()=>{
           setSearchData([])   
          },4000)
          
           
          //  setUser({})
         }
       
    } catch (error) {
    
      setTimeout(()=>{
        if(error.hasOwnProperty('request')){
          if(error.request.status==401){
           getToast("Session Error","Session expired","error",5000,"top")
          }
        }
      },5200)
      //console.log(error)
    }
   
 }

 getData()

   }



   const   submitAddGroup  = ()=>{
    setIsLoading(true)
      console.log(userSelectedForGroupChat)
      if(userSelectedForGroupChat.length < 1){
        setIsLoading(false)
       return  getToast('Validation Error','Select user to add to group','error',5000,'top')
      }

      if(groupName===''){
        setIsLoading(false)
        return  getToast('Validation Error','Group name is required','error',5000,'top')
       }
   
      makeRequest('api/chat/addgroup',{users:userSelectedForGroupChat,name:groupName},(err,data)=>{
             if(err){
              setIsLoading(false)
              return getToast('Error Occure',err.message,'error',5000,'top')
             }

             if(data.suc){
              setIsLoading(false)
              getToast('Success',data.suc,'success',5000,'top')
              setGroupNamef('')
              setChats([...chats,data.groupChat])
              window.location.reload();
             }


          
             console.log(data)             
      })



   }

 

   const goToChatRoom  = (selectedChat)=>{
    console.log(selectedChat)
    setSelectedChat([selectedChat])
  
 }



const resetActionMenue  = ()=>{
  let chId    = {}
  chats.forEach(l=>{
      chId[l._id] =false
  })
  setShowActionMenue(chId )
}

const getCoordinate  = event=>{
     
  //  let ev = {...event.target.getBoundingClientRect(),...event}
  //  setCoor(ev)
  console.log(event.target.getAttribute('chatid'),"rwetsst","ID",event.target)
    
    let menueIds    = {}

    for(let id in showActionMenue){
        if(showActionMenue[id] && id != event.target.getAttribute('chatid')){
           showActionMenue[id]  = false
        }
     
    }
   

  setShowActionMenue({...menueIds,[event.target.getAttribute('chatid')]: !showActionMenue[event.target.getAttribute('chatid')] })

  //setChats(chats)
   
  console.log(event,showActionMenue,showActionMenue[event],"rwetsst")
}
 

const  leftClickMenuShow  = e=>{
  console.log(e, 'is e')
}

const deleteChat  = chat=>{
///send delete request 
// take the remaining chata filter it
///set the remaining chat
  

  
}

    return(
      
          <>
              <Box 
               display={{base:selectedChat.length>0?'none':'block', md:'flex'}}
               flexDir="column"
               alignItems={"center"}
               p={3}
               bg="white"
               w={{base:"100%",md:"31%"}}
               maxH={"100%"}
               overflow={"auto"}
               borderRadius="lg"
               borderWidth={"1px"}
               pos="relative"

              >
                <Box
                pb={3}
                px={3}
                fontSize={{base:"28px",md:"30px"}}
                fontFamily="work sans"
                display={"flex"}
                w="100%"
                justifyContent={"space-between"}
                alignItems="center"
              >
                  My chart <Button type='button' bg={"transparent"} isLoading={isLoading} color='#f00' fontSize={"16px"}>{hasError.is_in?hasError.info :''}
                  </Button>
                  
                    
                    
                    
                    
                    
                     <Text
                       display={"flex"}
                       fontSize={{base:"17px",md:"10px",lg:"17px"}}
                       
                      
                      >
                       
                        {
                       Modals(
                            Box,
                            AddIcon,
                              <>
                               <FormControl>
                                <FormLabel>Enter Group Name</FormLabel>
                                <Input  
                                 type='text' 
                                  borderColor={"#000"}
                                  placeholder="Enter group name"
                                  onChange={setGroupName}
                                 />
                                  <FormLabel>Find user</FormLabel>
                                  <Input 
                                  type='text' 
                                  borderColor={"#000"}
                                  placeholder="Find user to add to group"
                                  onChange={handleGroupNameInputChange }
                                  />

                      {searchData.length>0? searchData.map((user,ind)=>
                        {  
                          if(user._id != userInfo._id){
                          return (<UserList
                          key  ={user.userId} 
                          user = {user}
                          bg  = { ( hasNotBeenSeleted.hasOwnProperty(user._id)&& hasNotBeenSeleted[user._id]==false)?'#097969':'#E8E8E8'}
                          color  = { ( hasNotBeenSeleted.hasOwnProperty(user._id)&& hasNotBeenSeleted[user._id]==false)?'#ffffff':'#000000'}
                          title  = { ( hasNotBeenSeleted.hasOwnProperty(user._id)&& hasNotBeenSeleted[user._id]==false)?user.fn+ ' has been selected':user.fn+' has been removed'}
                        
                          handleFunction  = {()=>{addToGroup({userId1:user.userId,userId2:user._id})} } 
                        />)
                        }
                      }
                        ):inputValue?<Text color={"tomato"} fontWeight={"700"}>{inputValue+" Not found"}</Text> :"" }
                                          {/* <FormHelperText>We'll never share your email.</FormHelperText> */}
                                        </FormControl>
                                        </>
                                        ,
                                        <>
                                        Add New Group
                                        </>,

                                      true,
                                      submitAddGroup,
                                      "Create Group",
                                      null,
                                      
                                     null,// openProfilePane,
                                      null
                                     // openProfilePane,
                             
                           )
                        }
                     </Text>



              </Box>
              {
                chats.length>0?<>
                <VStack w={"100%"}>
                { chats.map((chat,ind)=>{
                    console.log(showActionMenue[chat._id],' saxcsdcdcd')
                          
                      //console.log(chat, "wretryuiuoj")
                   return (<>
                     {
                      // ( !chat.isGroupChat && (chat.users[0]._id != userInfo._id) ) &&
                     
                    (<Box 
                      
                    cursor={"pointer"}
                    bg  = {(selectedChat.length>0 && selectedChat[0]._id===chat._id) ? "#38B2AD":"#E8E8E8"}
                    color={ (selectedChat.length>0 && selectedChat[0]._id===chat._id)? "white":"#000"}
                    px={3}
                    py={3}
                    borderRadius={"lg"} 
                    key= {ind}
                    display="flex"
                    width={"100%"}
                    onMouseDown = {leftClickMenuShow}
                   > 
                   <Box  
                    display={"flex"}
                   onClick={()=>{goToChatRoom(chat)} } 
                   
                   >
                     <Avatar 
                     name={!chat.isGroupChat?chat.users[1].fn:chat.chatName}
                     src={!chat.isGroupChat?"/"+chat.users[1].profile_img:chat.chatName}
                     >
                       
                     </Avatar>
                      <Stack textAlign={"left"} m={"0 2em"}
                      
                      >

                      <Text>Name : {chat.isGroupChat?chat.chatName:chat.users[1].fn}</Text> 
                       
                        
                        {/* <Text>Name : {chat.isGroup?chat.chatName:chat.users[0]._id== userInfo._id?userInfo.fn:chat.users[1].fn}</Text> 
                        */}
                        <Text> {chat.isGroupChat?"Chat Group":"Email :"+ chat.users[1].email}</Text> 

                      </Stack>
                     </Box> 
                      <VStack 
                        pos={'absolute'}
                        right={"12px"}
                        onClick= {getCoordinate}
                        w={"35px"}  
                        chatid  = {chat._id}
                        
                      >
                            
                            <div style={{ 
                              width: "10px",
                              height: "10px", 
                              background: "#f00",
                              borderRadius:"50%"
                               } }
                              onClick= {getCoordinate} 
                              chatid  = {chat._id}>

                              </div>

                            <div style={{ 
                                width: "10px",
                                height: "10px",
                                background:"#f00",
                                borderRadius:"50%" 
                                
                                } } onClick= {getCoordinate}  chatid  = {chat._id}></div>

                            <div style={{
                               width: "10px",
                               height: "10px",
                                background: "#f00",
                                borderRadius:"50%" 
                                } } onClick= {getCoordinate} chatid  = {chat._id}></div>

                             

                        </VStack>

                        { 
                            
                              showActionMenue[chat._id] &&  
                               (<UnorderedList className='action-menue'
                               //top={coor.y+"px"}
                               >
                                    <ListItem 
                                       w={{base:"100%",md:"30%"}}
                                    >
                                      <DeleteChat 
                                       chat={chat}
                                       requestMaker= {makeRequest}
                                       notifier={getToast}> 
                                       </DeleteChat>
                                    </ListItem >
                                     {chat.isGroupChat?<ListItem>
                                      <UpdateGroupChat 
                                        style={{
                                          background:"transparent",
                                          margin:"-9px 0px 0px -74px"
                                          }} chat={chat} title="Update Chat"
                                        getToast={getToast}
                                        makeRequest={makeRequest}
                                        resetActionMenue  = {resetActionMenue}
                                       />  </ListItem>:""}

                                    <ListItem  onClick={()=>{goToChatRoom(chat)} } >Star chatting</ListItem>
                                    
                                    </UnorderedList>
                                    ) 
                                 
                              
                      }
                
                        
                   </Box> )
                }  
                
               </>)
                }) 
                  }
              </VStack></>:""
              }
              


             
              
          </Box>
             
             
          </>
    )
}