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
    Spinner
  } from '@chakra-ui/react'

  import React,{ useState }  from 'react'

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
    styles = null,
     elementClass={}

     )=> {
      
 
      const { isOpen, onOpen, onClose } = useDisclosure()
      const  {isLoading}   = DataStore()
      const [state,setState] = useState({
        submitButtonDisabled:false,
        spinnerShow:false
      })
     
     const preSubmitEvent = ()=>{
        setState({...state,submitButtonDisabled:true, spinnerShow:true})
     }
       
    const postSubmitEvent = ()=>{
      setState({...state,submitButtonDisabled:false, spinnerShow:false})
      onClose()
    }   
    return (
      <> 
       <Element  className = {elementClass.class1?elementClass.class1:"modal--btn"} style={styles?styles:{}} as={Button} _hover={{bg:"rgba(22,22,22,.4)"}} onClick={onOpen}>
          {typeof Child==='string'?Child:<Child />}
      </Element>
  
        <Modal  className = {elementClass.class2?elementClass.class2:"modal--btn2"} isOpen={isOpen} onClose={onClose} onOpen ={openAction?openAction: null}>
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
               <Button  className = {elementClass.class3?elementClass.class3:"modal--btn3"} colorScheme='ghost' bg={"#000"} mr={3} onClick={closeAction?()=>{closeAction(onClose)}: onClose}>Close
               </Button>

            {submitEvent && 
             <Button disabled={state.submitButtonDisabled} variant='ghost' isLoading={isLoading} onClick={()=>{submitEvent(preSubmitEvent,postSubmitEvent)} } > 
            
            { submitButtonTextValue? submitButtonTextValue:" Seconadry  Action"}
             {state.spinnerShow && <Spinner
                thickness='4px'
                speed='0.63s'
                emptyColor='gray.200'
                color='blur.500'
                size='sm'
              />
             }
            </Button>
            }
             
              </>
            </ModalFooter>) } 

          </ModalContent>
        </Modal>
      </>
    )
  }
  