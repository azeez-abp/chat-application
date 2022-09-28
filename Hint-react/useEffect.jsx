//Data fetching, setting up a subscription, and manually changing the DOM in React components are all examples of side effects

// Similar to componentDidMount and componentDidUpdate:
//componentDidMount, componentDidUpdate, and componentWillUnmount

///There are two common kinds of side effects in React components: those that don’t require cleanup, and those that do. What is the clean up

//component needs to do something after render.
// Hooks embrace JavaScript closures function inside function
//Placing useEffect inside the component lets us access the state variable (or any props) right from the effect
useEffect(() => {
    // Update the document title using the browser API
    document.title = `You clicked ${count} times`;


    ///////////////componentWillUnmount
    return function cleanup() {
        ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
      };
  [count]}); // Only re-run the effect if count changes