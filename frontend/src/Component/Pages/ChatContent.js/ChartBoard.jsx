import { Box } from '@chakra-ui/react'
import React,{useState} from 'react'
import SingleChat from './SingleChat'
import { DataStore } from '../../../Context/ChartProvider'





export default function ChartBoard({getMyChatList}) {
  const {selectedChat} = DataStore()
  const [c,sc]  = useState({})

  const f = (e)=>{   
    const co =    handleMouseMove(e)
    
     sc({
         /////////////////
         sx:e.screenX,
         sy:e.screenY,
         cx:e.clientX,
         cy:e.clientY,
         ox:e.target.offsetLeft,
         oy:e.target.offsetHeight,
         x :e.screenX-e.target.offsetLeft,
         y: e.screenY-e.target.offsetHeight,
         px:co.x,
         py:co.y
        /////////////////////
 
 
 
     })

  }  

  function handleMouseMove(event) {
    var eventDoc, doc, body;

    event = event || window.event; // IE-ism

    // If pageX/Y aren't available and clientX/Y are,
    // calculate pageX/Y - logic taken from jQuery.
    // (This is to support old IE)
    if (event.pageX == null && event.clientX != null) {
        eventDoc = (event.target && event.target.ownerDocument) || document;
        doc = eventDoc.documentElement;
        body = eventDoc.body;

        event.pageX = event.clientX +
          ( (doc && doc.scrollLeft) || ( body && body.scrollLeft) || 0) -
          ( (doc && doc.clientLeft) || (body && body.clientLeft) || 0);
        event.pageY = event.clientY +
          ( (doc && doc.scrollTop ) || (body && body.scrollTop)  || 0) -
          ( (doc && doc.clientTop)  || (body && body.clientTop)  || 0 );
    }
    return {x:event.pageX,y:event.pageY}
  }
 
  return (
    <Box
    onClick={f} 
     display={{base:selectedChat.length>0?'flex':'none',md:'flex'}}
     flexDir={"column"}
     p={3}
     bg={"white"}
     w={{base:"100%",md:"68%"}}
     borderRadius="1px"
     borderWidth={"1px"}
     pos={"relative"}
    >
      <SingleChat getMyChatList={getMyChatList} c ={c} />
    </Box>
  )
}
