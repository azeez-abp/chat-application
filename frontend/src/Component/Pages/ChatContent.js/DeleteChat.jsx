import React, { useState } from 'react'
import { Modals } from '../../Modal'
import { Box ,Checkbox,useDisclosure} from '@chakra-ui/react'
import { DataStore } from '../../../Context/ChartProvider'
export default function DeleteChat({chat,requestMaker,notifier, setMeDeleted}) {
    const {chats,setChats,setShowActionMenue}  = DataStore()
    // const {isClose, isOpen, onOpen, onClose } = useDisclosure()
const [state, setState]  = useState({deleteChat:false})
const closeAction  = (cb=null)=>{
  cb()
}

const deleteOneChat  = (preAction,postAction)=>{
  preAction()
  requestMaker(`/api/chatline/delete:${chat._id}`,{id:chat,deleteChat:state.deleteChat},(err,data)=>{
       console.log(data, "DATA")
    if(err){
            postAction()
           // console.log(err,"ERR")
            return notifier('Delete Error',err.message,'error');
        }
    


         for (let i = data.message.length; i > 0 ; i--) {
         
         //  notifier('Request Successful', 'Success',data.message[i]);
           notifier('Request Done',data.message[i-1],'success');
         }
         
     let remChat  = chats.filter(f=>f._id !== chat._id)
      setChats(remChat)
             postAction()
        return
  },'DELETE')  
      

}


 
  return (
    <div>

         {
            Modals(
                'button',
                'Delete chat',
                <Box>
                  <p>All messages will be deleted </p>
                 You are about to delete {chat.isGroupChat?chat.chatName:chat.users[1].fn+" chat" }
                 <Checkbox 
                  
                  size='lg'
                  colorScheme='orange'
                  isChecked={state.deleteChat}
                  onChange={(e) => setState({deleteChat:!state.deleteChat})}
                  >
                   <label style={{fontSize:"0.8rem", margin:"3px",lineHeight:8 }}>Delete this Chat (It will remove from My Chat list)</label> 
                </Checkbox>
                </Box>,
                'Delete chat',
                true,
                deleteOneChat,
                'Delete chat(Are you sure)',
                 closeAction
                )

         }

    </div>
  )
}
