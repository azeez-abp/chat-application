export const  isSameSender  = (messages,currrentMessage,indexOfCurrentMessage,partnerId)=>{
        console.log(indexOfCurrentMessage,"MESS",currrentMessage.sender._id,partnerId)
        
     return(  (indexOfCurrentMessage < messages.length-1)  &&
        ( (   messages[indexOfCurrentMessage+1].sender._id === partnerId) ||
        (messages[indexOfCurrentMessage+1].sender._id === undefined) && (messages[indexOfCurrentMessage].sender._id  !== partnerId) 
        )
     )
 
}


export const isLastMessage  = (messages, currentIndex, partnerId )=>{
    
    return (
         (currentIndex === messages.length -1) 
         &&
         (messages[messages.length -1].sender._id  !== partnerId )
         &&
         messages[messages.length-1].sender._d
    )


}