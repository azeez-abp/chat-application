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
   import { Box, Button, Tooltip,Text,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuItemOption,
    MenuGroup,
    MenuOptionGroup,
    MenuDivider,
    useDisclosure,
    Drawer,
    Avatar,
    DrawerOverlay,  } from '@chakra-ui/react'

    

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
  
  
  
  const logout   = async ()=>{
      setIsLoading(true)
    const options = {
      method: 'POST',
      headers: { 
      //  'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Type': 'application/json',
        'authorization': 'Bearer '+GetToken()
       },
    //  data: qs.stringify(data),
      url:"/api/chat/logout",
    };
    try {
        let d  =await axios(options)
       let out  =d.data 
         if(out.suc){
          
             localStorage.removeItem(TOKEN_NAME)
             localStorage.removeItem(CHAT_LOGIN_STATUS)
             setIsLoading(false)
             setTimeout(()=>{ history('/');},2000)
            
         }else{
        
         }
       
    } catch (error) {
       
    }
   

  }


  const openModal  = ()=>{
     setModalOpen(true)
     
  }


  return (
      <>
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

