import {BellIcon, ChevronDownIcon,Search2Icon} from '@chakra-ui/icons'
import { DataStore } from '../../../Context/ChartProvider'
import React,{useState,useRef} from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios' 
import { GetToken } from '../../../Token/Token'
import TOKEN_NAME from '../../../Token/Token'
import { CHAT_LOGIN_STATUS } from '../../../Token/Token'
import {Modals} from '../../Modal';
import  { Drawers } from './Drawer';
import { makeRequest } from '../../request'
import { Box, Button, Tooltip,Text,
 Menu,
 MenuButton,
 MenuList,
 MenuItem,
 // MenuItemOption,
 // MenuGroup,
 // MenuOptionGroup,
 MenuDivider,
 useDisclosure,
 // Drawer,
 Avatar,
//  DrawerOverlay, 
useToast 
} from '@chakra-ui/react'

 

export default function SideBar({name,email,img}) {
const { isOpen, onOpen, onClose } = useDisclosure()

const [search, setSearch]  = useState("")
const [searchResult, setSearchResult]   = useState([]) 
const [isLoading, setIsLoading]   = useState(false)
const [loadingChat, setLoadingChat] = useState(false)
const [modalOpen,setModalOpen]   = useState(false);
const {user}  = DataStore();
const history   =  useNavigate();
const  modlaopener  = useRef(null)

const toast  = useToast()
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

const logout   = async ()=>{


   setIsLoading(true)

   console.log("wertyuiop[")

   makeRequest('/api/chat/logout',{},(err,data)=>{
    
     if(err){
      setIsLoading(false)
      return getToast('Error Occure',err.message,'error',5000,'top')
     }
     
     if(data.suc){
       localStorage.removeItem(TOKEN_NAME)
       localStorage.removeItem(CHAT_LOGIN_STATUS)
       setIsLoading(false)
       setTimeout(()=>{ history('/');},2000)
      
     }
})


}


const openModal  = ()=>{
  setModalOpen(true)
  
}


return (
   <>
   {isLoading && (<div style={{
    position:"absolute",
    backgroundColor:"rgba(0,0,0,.5)",
    left:"0px",
    right:"0px",
    bottom:"0px",
    top:"0px",
    zIndex:3

    }
    }>
       <div className="log-out"
      >

         <h1 >Loging out ......</h1>
         </div>
    </div>)}

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
           <Tooltip label="Search who to chat with" hasArrow placement='bottom'>
               <>
                
               {Drawers(Button,Search2Icon)}  
              </>
           </Tooltip> 
            
            <Text fontSize={"2xl"}>ABP CHAT APP  </Text>
         <div>
          <Menu>
            
             <MenuButton as={Button} p={"4px"} rightIcon={<ChevronDownIcon />}>
               <BellIcon fontSize={"2xl"} m="1px" />
             </MenuButton>
             {/* <MenuList>
                 <MenuItem>Download</MenuItem>
             </MenuList> */}
             </Menu>
             <Menu>
                 <MenuButton as={Button} rightIcon={<ChevronDownIcon></ChevronDownIcon>}  >
                   <Avatar size={"sm"} cursor="pointer" name={name} src={img} />
                 </MenuButton>
                <MenuList>
          
                   {/*  Pass the modelas a child to any button to click */}
                     {/* <Modals title={"User Profile"} >
                     <MenuItem  as={Button} ></MenuItem>
                      
                     </Modals> */}
              
                     {
                     Modals(
                       MenuItem,
                      "User Profile" , 
                      (<div 
                     
                       style={{ 
                       display: "flex",
                      flexDirection:"column",
                      justifyContent:"center",
                      alignItems: "center", 
                      paddingBottom: "39px"
                      
                      }}>
                          <div> <Avatar src={"/"+img}></Avatar></div>
                           <p> Name: {name}</p>
                           <p> Email: {email}</p>
                        </div>),
                     'User Profile'
                     )}
               
               <MenuDivider/>

               <MenuItem onClick={logout} as={Button} _hover={{bg:"rgba(22,22,22,.4)"}}  isLoading={isLoading} > Log out</MenuItem>
             </MenuList>
           </Menu>
            
       </div>
     </Box>
</>
)
}

