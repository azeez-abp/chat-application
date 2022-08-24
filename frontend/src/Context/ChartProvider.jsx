import { useState, useContext, createContext} from "react";
import { useToast } from "@chakra-ui/react";

const ChartContext  = createContext()


const ChartProvider = ({children})=>{

  const toast  = useToast()

  ///any state you want to access will be declear here and access in the child
  const [searchData, setSearchData ]  = useState([])
    //1. declear the state in the parent
    //2. get In the child that want to use the state by importing that data store (useContext(Context function))
 //    const history  = useHistory()
    const [user ,setUser] = useState({});//user is the list of people you are chatting
    const  [userInfo, setUserInfo]  = useState({})
    const [selectedChat,setSelectedChat] = useState([])
    const [chats,setChats] = useState([])
    const [hasError,setHasError] =useState({is_in:false,info:''})
    const [isLoading,setIsLoading]  = useState(false)
    const [showActionMenue,setShowActionMenue]  = useState(false)
    const  [messages,setMessages]    = useState ([])
    const [typeValue,setTypeValue]  = useState('')
       //const ioClient  = io('/'/*server io*/)


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




   /////get user data//////////////////////////////////////////////   
    //const userInfo  = JSON.parse(localStorage.getItem('userinfo'))

    /*this steate will be availlable inside all compnent 
because the element wrapped all aour componenet serving as super parenrent*/
return (<ChartContext.Provider value={{
  user,setUser,
  /* data from drawer.jsx*/
  searchData, setSearchData, /**/ 
  userInfo,setUserInfo,
  selectedChat,setSelectedChat,
  chats,setChats,
  hasError,setHasError,
  isLoading,setIsLoading,
  showActionMenue,setShowActionMenue,
  messages,setMessages,
  getToast,
  typeValue,setTypeValue,

  }}  >
          {children}
       </ChartContext.Provider>
    )

}

export default ChartProvider;
export const DataStore  = ()=>{////import this to all child that need their data store in the ChartProvider
return useContext(ChartContext)   
} 

