import React,{useState} from 'react'
import { Modals } from '../../Modal'
import { Button,Avater,Box ,FormControl, Input,FormLabel,Text,  Tag,
  TagLabel,
  TagCloseButton,
  useDisclosure,

} from '@chakra-ui/react'
import UserList from './UserList'
import { GetToken } from '../../../Token/Token'
import axios from 'axios'
import { DataStore } from '../../../Context/ChartProvider'
import { useEffect,useRef } from 'react'
import { app_domain_proxy } from '../../app_domain'


export const UpdateGroupChat  = ({title,style,getToast, chat,makeRequest,resetActionMenue}) => {


  const [searchItemLoaded, setSearchItemLoading ]  = useState(false)
  const [inputValue, setInputValue ]  = useState()
  const [selectedUsersIds,setSelectedUsersIds ]  = useState([])
  const [userSelectedForGroupChat,setUserSelectedForGroupChat]  = useState([])
  const [groupName, setGroupNamef]  = useState('')
  const groupNameValue  = useRef()
  const {user,setUser,searchData, setSearchData,selectedChat,setSelectedChat,chats,setChats,hasError,
    setHasError ,userInfo,isLoading,setIsLoading,SearchData,showActionMenue,setShowActionMenue,
    message,setMessage
    }   = DataStore()
  
    const { isOpen, onOpen, onClose,isClose } = useDisclosure()

useEffect(()=>{
  setUserSelectedForGroupChat(chat.users)
   let ids = [];
  chat.users.forEach(user=>{
    ids.push(user._id)
  })
  setSelectedUsersIds(ids)
},[] )


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
     //
   }
  
}

getData()

  }






const addToGroup  = (data)=>{

    
    if( !selectedUsersIds.includes(data._id) ){ 
      setUserSelectedForGroupChat([...userSelectedForGroupChat,data]);
      setSelectedUsersIds([...selectedUsersIds,data._id])
    
    }
 
 }

 const removeFromGroup  = (data)=>{
   

 // if(selectedUsersIds.includes(data._id ) && data._id !== userInfo._id ){ 
    let remainingUsers  =  userSelectedForGroupChat.filter(user=>user._id !== data._id )
    let remainingUsersIds  =  selectedUsersIds.filter(user=>user._id !== data._id )
    setUserSelectedForGroupChat(remainingUsers);
    setSelectedUsersIds(remainingUsersIds)
  
  // }else{
  //   getToast('Removal Err or','Can not remove creator of group','error')
  // }
 
   
}


const fetchChatsMessages  = async ()=>{
  setIsLoading(true)
await  makeRequest(app_domain_proxy+'/api/chatline/getallmessages/'+selectedChat[0]._id,{},(err, data)=>{
if(err) return getToast('Message Sending Error',err.message,'error',4000,'top');setIsLoading(false)

if(data.suc) setMessage(data.message) ;setIsLoading(false)
},'GET' )

}

const  updateGroup  = ()=>{
 
 
   let ids_  = []
   userSelectedForGroupChat.forEach(user=>{
       ids_.push(user._id) 
  })


  const data  = {
    groupChatId:chat._id,//
    users_:userSelectedForGroupChat,
    usersIds:ids_,
    groupChatName: groupNameValue.current?groupNameValue.current.value:chat.chatName
  }
//

  
setIsLoading(true)
setTimeout(()=>{

  makeRequest(app_domain_proxy+'/api/chat/updategroup',data,(err,data2)=>{
    if(err){
      setIsLoading(false)
      return getToast('Reqest Error', err.message,'error')
    }
   
    if(data2.suc){

      setChats([...data2.chat])

      setIsLoading(false)
      getToast('Reqest success', 'update successful' ,'success')
        setShowActionMenue({...showActionMenue,[data.groupChatId]:false })
          document.querySelector(".modal--btn--update").click()  
    }

},'PUT')

fetchChatsMessages()

},0)


}


const openProfilePane =()=>{
  
 setSelectedChat(selectedChat)
 resetActionMenue();

 //setTimeout(()=>{onOpen();console.log("UPDATE")},2000)
   
}

  return (
    <>
        <Box
       w={"30px"}
       h={"30px"}
       float={"right"}
     
     >
      {        Modals(
                         Button,
                         title , 
                         ( <Box>
                                      <FormControl>
                             
                               
                                    { 
                                      chat.groupAdmin.map(admin=>admin._id==userInfo._id? (<> 
                                      <FormLabel>Enter Group Name</FormLabel>
                                      <Input  
                                        type='text' 
                                         borderColor={"#000"}
                                         placeholder="Enter group name"
                                         onChange={setGroupName}
                                         value={groupName!==''?groupName: chat.chatName}
                                         ref={groupNameValue}
                                        /> 
                                         <FormLabel>Find user</FormLabel>
                                         <Input 
                                         type='text' 
                                         borderColor={"#000"}
                                         placeholder="Find user to add to group"
                                         onChange={handleGroupNameInputChange }
                                         />
                                      </>): (<>You are not the admin</>))
                                
                                    }
                                    



                                    
                                  <Box spacing={12}>
                                  
                                        {
                                        // setUserSelectedForGroupChat()
                                        userSelectedForGroupChat.map((user) => {
                                              
                                          return(
                                          <Tag
                                            size={"md"}
                                            w={"50%"}
                                            key={user._id}
                                            borderRadius='full'
                                            variant='solid'
                                            colorScheme='green'
                                            margin={"6px 0 0 6px"} 
                                          >
                                            <TagLabel  key={user._id}>{user.fn}  
                                             {
                                             chat.groupAdmin.map(admin=>admin._id==user._id?"  is Admin":"  is Member")
                                        
                                             }
                                            </TagLabel>
                                            {
                                             chat.groupAdmin.map(admin=>( (admin._id==userInfo._id) )? (<>   <TagCloseButton  key={user._id} title='Remove this user' onClick={ ()=>{removeFromGroup(user)} }/>
                                             </>):(<>{user._id==userInfo._id ?(<> <TagCloseButton  key={user._id} title='Exit from the group' onClick={ ()=>{removeFromGroup(user)} }/>
                                            </>):''  }</>))
                                        
                                             }
                                           
                                          </Tag>
                                        )} )}
                                      </Box>
            
                      {searchData.length>0? searchData.map((user,ind)=>
                        {  
                          if(user._id != userInfo._id){
                          return (<UserList
                          key  ={user.userId} 
                          user = {user}
                          bg  = {'#E8E8E8'}
                          color  = { '#000000'}
                        
                          handleFunction  = {()=>{addToGroup(user)} } 
                        />)
                        }
                      }
                        ):inputValue?<Text color={"tomato"} fontWeight={"700"}>{inputValue+" Not found"}</Text> :"" }
                                          {/* <FormHelperText>We'll never share your email.</FormHelperText> */}


                       </FormControl>
                       
                         </Box>),
                        'Update Group',
                         ////////////
                          true,
                           updateGroup,
                          'Update group',
                            null,//  openProfilePane,
                            ///////////////
                         openProfilePane,
                    
                          style,
                         ////////////
                         {class3:'modal--btn--update'}
                        )}
     </Box>
    </>
    
  )
}
