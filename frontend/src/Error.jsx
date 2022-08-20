import React from 'react'
class ErrorBoundary extends React.Component {
    constructor(props) {
      super(props);
      this.state = { hasError: false };
      this.error  = ''
    }
  
    static getDerivedStateFromError(error) {
      // Update state so the next render will show the fallback UI.
      return { hasError: true };
    }
  
    componentDidCatch(error, errorInfo) {
      // You can also log the error to an error reporting service
      this.setState({...this.state,errorDetails:error.message,errorName:error.name,errorStack:error.stack})
     // document.querySelector("#root").innerHTML(error)
      this.error   = error
      console.log(error,"wertyuio",typeof error)
     // logErrorToMyService(error, errorInfo);
    }
  
    render() {
      if (this.state.hasError) {
        // You can render any custom fallback UI
        return <h1 style={{background:'#000',color:'#fff'}}>{this.state.errorName}:{this.state.errorDetails} <br /> {this.state.errorStack}  </h1>;
      }
  
      return this.props.children; 
    }
  }

  export default ErrorBoundary