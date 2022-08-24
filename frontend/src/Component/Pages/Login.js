import {useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import {
    FormControl,
    FormLabel,
   // FormErrorMessage,
   // FormHelperText,
    Input,
    Button, 
    InputGroup,
    InputRightElement,
    useToast,
  } from '@chakra-ui/react'

import  { SaveToken,CHAT_LOGIN_STATUS } from '../../Token/Token';  


export const Login = (props)=> {   
    const history   = useNavigate()
    const [input, setInput] = useState({email:"",password:""})///if you dont indicate the 
    //field it will give error
   const [isError, setIsError]  = useState({email:false,password:false})
   const [show, setShow]  = useState(false);
   const [isLoading, setLoading] = useState(false)
   const [hasLogin, setHasLogin]  = useState(false);


   const toast = useToast()
   const  getToast   = (title, message,type='success',time=3000,potision='top')=>{
        toast(  {
          title: title,
          description: message,
          status: type,
          duration: time,
          isClosable: true,
          position:potision
        })
  }
    const handleInputChange = (e) =>{
        e.preventDefault()
     setInput({...input,[e.target.name]:e.target.value})
    } 

 
    const submit  = (e)=>{
        e.preventDefault()
    //   let  err   = {}; 
          //err  = {...isError} 
        let err  = [false];
        for(let inp in input){
            if(input[inp]===''){
                isError[inp]  = true
               setIsError({...isError})
               err[0]  = true
            }else{
                err[0]  =false
                isError[inp]  = false
                setIsError({...isError})
            }
        }
      
        if(!err[0]) sendLoginCredential(input);
        //setIsError(err) 
    } 

  const handlePassworshow =()=>{setShow(!show/*set it to oppoite value*/)}  
   
  
  const sendLoginCredential   =  async(credential)=>{
      setLoading(true)
      const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json',
                   // 'authorization':'Bearer '+GetToken() 
                   
                 },
        data: credential,
        url:'/api/chat/post-login',
      };
    
      try {  
         let d  = await axios(options)
         // let d  = await axios.post("/api/chat/post-register",formData,options)
         
          let out   = d.data
        
         if(out.suc){ 
           SaveToken(out.access_token)
          setLoading(false) 
          getToast('Login successful')
         localStorage.setItem(CHAT_LOGIN_STATUS,true)
          setTimeout(()=>{
            history('/chats')
          },3100)
         }else{  
            setLoading(false) 
           
            out.err.forEach((er,i)=>{
               let  time  = (i+1)*1000
              getToast('Login Failed',er,'error',3000+time)
             
           })
         

           
         }


      } catch (error) {
        setLoading(false)
        getToast('Login Failed',error.message,'error',3000)
         console.log(error," IS ERROR",error.message)
      }

    



   }
  const generateGuestCredential = ()=>{

  }


    return (
       
  
    
     ( <FormControl >
        <FormLabel color="white" >Email</FormLabel>
        <Input
          type='email'
          value={input.email}
          name ="email"
          color="white"
          size='md'
          focusBorderColor='teal'
          errorBorderColor='crimson'
          isInvalid ={isError.email===true}
          onChange={handleInputChange}
        />
      {!isError.email?'':(<p style={{float:'right',color:"crimson"}}>Email is required.</p>)}
     
     
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
                isInvalid ={isError.password===true }
                errorBorderColor='crimson'
                onChange={handleInputChange}
            />
           
            <InputRightElement width='4.5rem'>
                <Button h='1.75rem' size='sm' onClick={handlePassworshow}>
                {show ? 'Hide' : 'Show'}
                </Button>
           </InputRightElement>
          </InputGroup>
          {!isError.password?'':(<p style={{float:'right',color:"crimson"}}>Password is required.</p>)}
     
      
          <Button 
          type='button'
          w={"100%"}
           colorScheme='teal'
            variant='solid'
             mt={10} float="left"
            onClick ={submit}
            isLoading={isLoading}
             >
         Login
        </Button>

        <Button 
          type='button'
          color={"green"}
           w={"100%"}
           colorScheme='red'
            variant='outline'
             mt={10} float="left"
            onClick ={generateGuestCredential}
             >
          Generate short time token
        </Button>


      </FormControl>
      )
    )
  }