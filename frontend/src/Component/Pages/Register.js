import { useState } from 'react'
import {
    FormControl,
    FormLabel,
   // FormErrorMessage,
   // FormHelperText,
    Input,
    Button, 
    InputGroup,
    InputRightElement,
    Avatar,
    Box,
    Text,
    Flex,
    Badge,
    useToast,
  //  TagLabel,
   
  
  } from '@chakra-ui/react'
import { makeRequest } from '../request';







export const Register = (props)=> {
       
     const toast = useToast()
     const [doneData,setDoneData ]  = useState({done:false,image_url:'/images/pgL3zHNECoaXZX4AkxmvuIkM17Iewa8I.png',user_name:''})

    const [input, setInput] = useState(
      {
      name:"",
      email:"",
      password:"",
      image:""
    
    })///if you dont indicate the 
    //field it will give error
   //const [isError, setIsError]  = useState(false)
   const [show, setShow]  = useState(false)
   const [showErr, setShowErr]  = useState({email:false,password:false,name:false})
   const [isLoading, setLoading] = useState(false)
   const [isImageEmpty, setIsImageEmpty]  = useState(true)


    const handleInputChange = (e) =>{
       e.preventDefault()
        
        let v= ( e.target.files!==null)?e.target.files[0]:e.target.value
        ///
        setInput({...input,[e.target.name]:v})
    } 



const  getToast   = (title, message,type='success',time=3000,potision='top')=>{
  //const id = 'test-toast'
  
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
 
    const submit  = async (e)=>{
        e.preventDefault()
        let err  = [false];
        for(let inp in input){

           // 
         if(inp !=='image'){
              if(input[inp]===''){
                showErr[inp]  = true
                setShowErr({...showErr})////if you dont spread it will not update
                err[0]  = true
                //setIsError(true)
              
            }else{
              //
              err[0]  =false
              showErr[inp]  = false
               setShowErr({...showErr})
               //setIsError(false)
            }
        
         }
         
         if(inp==='image'){
          if(!input[inp].name){
            err[0] =true
            setIsImageEmpty(false) 
          }else{
            err[0] =false
            setIsImageEmpty(true) 

          }
         }
           
        }

        if(!err[0]) uploadFile(input);
        
          
          // 
    
    } 
   

    const showRegistrationForm =()=>{
      setDoneData({...doneData,done:false})
      setInput( {
        name:"",
        email:"",
        password:"",
        image:""
      
      })
    }

    
    ///////////////////////////////////////////////////////////////////////////////////////
  const uploadFile  = async (f)=>{
    ////////check if the image is empty
  

     
     setLoading(true)

     let f_ = new FormData()
    
     f_.append('image',f.image)

     await  makeRequest('/api/fileupload',{f_},(err, out)=>{
      if(err) return getToast('Message Sending Error',err.message,'error',4000,'top'); setLoading(false)
   
        if(out.suc){
          let img = out.img_dir[0].path
          
        // input['image']   =img
       //  setInput({...input,image:img})
         sendData(img,input.name)
        }
      
      },'POST',{ 'content-Type': 'multipart/form-data' } )



   ////////////////////////////////////////////////////////////////////////////////

  
 }  
///////////////////////////////////////////////////////////////////////////////

    const sendData   = async(dimage,dname)=>{
     ///this method is call by method that upload image because 
     //we upload data if the image upload is don

     await  makeRequest('/api/chat/post-register',{...input,image:dimage},(err, out)=>{
      if(err) return getToast('Message Sending Error',err.message,'error',4000,'top'); setLoading(false)
   
      if(out.suc){ 
        
        setLoading(false) 
         let  op  = {...doneData,done:true,image_url:dimage,user_name:dname}
         
         setDoneData(op)



         
        setTimeout(()=>{
          setDoneData(op)
              getToast('Registration done','Welcome on board')
        },2000)
       }else{  
          setLoading(false) 
          

          out.err.forEach((er,i)=>{
             let  time  = (i+1)*1000
            getToast('Registration Failed',er,'error',3000+time)
           
         })
         
       }
      
      },'POST')

    }



  /////////////////////////////////////////////////////////////////////////////
  const handlePassworshow =()=>{setShow(!show/*set it to oppoite value*/)}  
//////////////////////////////////////////////////////////////////////////


    return (
       
     <>
  
       {
        doneData.done
        ?
        <Flex style={{border:'1px solid white',borderRadius:'4px',padding:'5px',wordWrap:'break-word'}}>
          <Avatar src={"/"+doneData.image_url} />
          <Box ml='3'>
            <Text fontWeight='bold' color={"white"}>
               {doneData.user_name}
              <Badge ml='1' colorScheme='green'>
                Welcome new user 
              </Badge>
              <Badge colorScheme='red' ml={"10px"} style={{cursor:"pointer"}} onClick={showRegistrationForm}> Start another registration </Badge>
            </Text>
           
          </Box>
        </Flex> 
        :
        <FormControl >
          <form  method="post" encType="multipart/form-data">
        <FormLabel color="white">Name</FormLabel>
  
          <Input
            type='type'
            value={input.name}
            name ="name"
            color="white"
            size='md'
            focusBorderColor='teal'
            errorBorderColor='crimson'
            isInvalid ={showErr.name}
            onChange={handleInputChange}
          />
           {!showErr.name?'':(<p style={{float:'right',color:"crimson"}}>Name is required.</p>)}
       
      <FormLabel color="white">Email</FormLabel>
          <Input
            type='email'
            value={input.email}
            name ="email"
            color="white"
            size='md'
            focusBorderColor='teal'
            errorBorderColor='crimson'
            isInvalid ={showErr.email }
            onChange={handleInputChange}
          />
           {!showErr.email?'':(<p style={{float:'right',color:"crimson"}}>Email is required.</p>)}
       
        <FormLabel color="white">Password</FormLabel>
          
           <InputGroup size='md'>
              <Input
                  pr='4.5rem'
                  type={show ? 'text' : 'password'}
                  placeholder='Enter password'
                  value={input.password}
                  name ="password"
                  color="white"
                  size='md'
                  focusBorderColor='teal'
                  isInvalid ={showErr.password}
                  errorBorderColor='crimson'
                  onChange={handleInputChange}
              />
              
              <InputRightElement width='4.5rem'>
                  <Button h='1.75rem' size='sm' onClick={handlePassworshow}>
                  {show ? 'Hide' : 'Show'}
                  </Button>
             </InputRightElement>
            </InputGroup>
            {!showErr.password?'':(<p style={{float:'right',color:"crimson"}}>Password is required.</p>)}
       
  
          <FormLabel color="white">Profile Image</FormLabel>
          <Input
            type='file'
            //value={input.image.name}
            name ="image"
            color="white"
            size='md'
            focusBorderColor='teal'
            errorBorderColor='crimson'
            isInvalid ={!isImageEmpty}
            onChange={handleInputChange}
          />
          
          {isImageEmpty?'':(<p style={{float:'right',color:"crimson"}}>Profile Image is required .</p>)}
       
      
            <Button 
            variant="solid"
             type='button'
              w={"100%"}
              colorScheme='teal'
              //variant='outline'
               mt={10} float="left"
              onClick ={submit}
              isLoading={isLoading}
               >
              Register
          </Button>
          </form>
        </FormControl>
       }    
    
      
      </>
    )
  }