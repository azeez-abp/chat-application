import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Button,
    MenuItem
  } from '@chakra-ui/react'

  import React from 'react'
  import { DataStore } from '../Context/ChartProvider'
  


  export const Modals = (
    Element,
    Child,
    data,
    title="User Action",
/////////////////////////////
    showFooter=false,
    submitEvent=null,
    submitButtonTextValue=null,
    closeAction=null,
///////////////////////////
    openAction  = null,
    styles = null

     )=> {

 
      const { isOpen, onOpen, onClose } = useDisclosure()
      const  {isLoading}   = DataStore()
      console.log(openAction, 'OPEN ACTION')

    return (
      <> 
       <Element style={styles?styles:{}} as={Button} _hover={{bg:"rgba(22,22,22,.4)"}} onClick={onOpen}>
          {typeof Child==='string'?Child:<Child />}
      </Element>
  
        <Modal isOpen={isOpen} onClose={onClose} onOpen ={openAction?openAction: null}>
          <ModalOverlay      bg='blackAlpha.300'backdropFilter='blur(10px) hue-rotate(90deg)' ></ModalOverlay>
          <ModalContent>
            <ModalHeader>{title}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
                { data }
            </ModalBody>
          {showFooter && (
            <ModalFooter>
             <>
               <Button colorScheme='ghost' bg={"#000"} mr={3} onClick={closeAction?closeAction: onClose}>Close</Button>
                {submitEvent &&  <Button variant='ghost' isLoading={isLoading} onClick={submitEvent} > { submitButtonTextValue? submitButtonTextValue:" Seconadry  Action"}</Button>}
             
              </>
            </ModalFooter>) } 

          </ModalContent>
        </Modal>
      </>
    )
  }
  