import React from 'react';
import './App.css';
import {BrowserRouter,Route} from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Screens/Home';
import Login from './components/Screens/Login';
import SignUp from './components/Screens/SignUp';
import Profile from './components/Screens/Profile';
import CreatePost from './components/Screens/CreatePost';
function App() {
  return (
      <BrowserRouter>
      <Navbar/>
      <Route exact path="/">
        <Home/>
      </Route>
      <Route path="/login">
        <Login/>
      </Route>
      <Route path="/signup">
        <SignUp/>
      </Route>
      <Route path="/profile">
        <Profile/>
      </Route>
      <Route path="/create">
        <CreatePost/>
      </Route>

      </BrowserRouter>
  );
}

export default App;
