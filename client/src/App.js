import React,{useEffect,createContext,useReducer,useContext} from 'react';
import './App.css';
import {BrowserRouter,Route, Switch,useHistory} from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Screens/Home';
import Login from './components/Screens/Login';
import SignUp from './components/Screens/SignUp';
import Profile from './components/Screens/Profile';
import CreatePost from './components/Screens/CreatePost';
import {reducer,initialState} from "./Reducers/userReducer"
import UserProfile from './components/Screens/UserProfile';
export const UserContext=createContext()
const Routing=()=>{

  const history=useHistory()
  const {state,dispatch}=useContext(UserContext)
  useEffect(()=>{

    const user=JSON.parse(localStorage.getItem("user"))

    console.log(user)
    if(user){
      dispatch({type:"USER",payload:user})
      // history.push('/')
    }
    else{
      history.push("/login")
    }
  },[])
  return(
    <Switch>
      <Route exact path="/">
        <Home/>
      </Route>
      <Route path="/login">
        <Login/>
      </Route>
      <Route path="/signup">
        <SignUp/>
      </Route>
      <Route exact path="/profile">
        <Profile/>
      </Route>
      <Route path="/create">
        <CreatePost/>
      </Route>
      <Route path="/profile/:userid">
        <UserProfile/>
      </Route>
    </Switch>
  )
}

function App() {
  const [state,dispatch]=useReducer(reducer,initialState)
  return (
      <UserContext.Provider value ={{state,dispatch}}>
        <BrowserRouter>
          <Navbar/>
          <Routing/>
        </BrowserRouter>
      </UserContext.Provider>
  );
}

export default App;
