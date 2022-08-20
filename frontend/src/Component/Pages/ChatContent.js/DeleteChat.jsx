import React, {useEffect} from 'react'
import { Modals } from '../../Modal'
import { Box ,useDisclosure} from '@chakra-ui/react'
import { DataStore } from '../../../Context/ChartProvider'
export default function DeleteChat({chat,requestMaker,notifier}) {
    const {chats,setChats,setShowActionMenue}  = DataStore()
    const {isClose, isOpen, onOpen, onClose } = useDisclosure()

const closeAction  = ()=>{
    console.log("CLOSE")
}

const deleteOneChat  = (props)=>{
///use all function from parent
// the parent is Mychat


  requestMaker('/api/chat/delete',{id:chat},(err,data)=>{
        if(err){
            return notifier('Delete Error',err.message,'error');
        }
        
        return notifier('Request pass', 'Success','success');
  })  
     

}


 
  return (
    <div>

         {
            Modals(
                'Button',
                'Delete chat',
                <Box>You are about to delete {chat.isGroupChat?chat.chatName:chat.users[1].fn+" chat" }</Box>,
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
