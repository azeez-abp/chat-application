import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import { BrowserRouter } from 'react-router-dom';
import ChartProvider from './Context/ChartProvider';
import ErrorBoundary  from './Error'

//import { SaveToken,GetToken } from './Token/Token';
const root = ReactDOM.createRoot(document.getElementById('root'));

const theme = extendTheme({
  colors: {
    brand: {
      100: "#f7fafc",
      // ...
      900: "#1a202c",
    },
  },
})

// SaveToken('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiYnVTb0VNbGJjNEhKelJpVnZoY1JnTmplWkRsZ3VJeVVtcG9IVGZ2TVVDTnJXWnNoazExVkJHZ2FhQVlmT1V0RyIsImlkIjoiNjJlZTA0ZDBiMzBmYjE5YjQzOTU3OGVkIiwiaWF0IjoxNjU5ODc5MDA4LCJleHAiOjE2NTk4ODYyMDh9.sIay2CQoZ0HuKiQDDOgDFOtPBDYPeF-fvekUIQZ9PVoz')
// let a = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiYnVTb0VNbGJjNEhKelJpVnZoY1JnTmplWkRsZ3VJeVVtcG9IVGZ2TVVDTnJXWnNoazExVkJHZ2FhQVlmT1V0RyIsImlkIjoiNjJlZTA0ZDBiMzBmYjE5YjQzOTU3OGVkIiwiaWF0IjoxNjU5ODc5MDA4LCJleHAiOjE2NTk4ODYyMDh9.sIay2CQoZ0HuKiQDDOgDFOtPBDYPeF-fvekUIQZ9PVoz".split(".")
// console.log(atob(a[1]));

//console.log(GetToken(),"tyui")

root.render(
<React.StrictMode> 
    <ErrorBoundary>
  <ChartProvider theme={theme}>
    <BrowserRouter>
    
     <ChakraProvider>
     
        <App />
     </ChakraProvider>
    
    </BrowserRouter>
  </ChartProvider>
  </ErrorBoundary>
  </React.StrictMode>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
