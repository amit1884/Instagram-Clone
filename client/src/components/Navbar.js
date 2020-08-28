import React ,{useContext}from 'react'
import '../App.css'
import {Link} from 'react-router-dom'
import {UserContext} from '../App'
export default function Navbar() {

    const {state,dispatch}=useContext(UserContext)
    const renderList=()=>{
        if(state)
        {
            return [
                <li><Link to="/profile">Profile</Link></li>,
                <li><Link to ="/create">Create</Link></li>
            ]
        }
        else{
            return [
                <li><Link to="/login">Login</Link></li>,
                <li><Link to="/signup">Signup</Link></li>
            ]
        }
    }
    return (
        <nav>
        <div className="nav-wrapper white">
            <Link to={state?"/":"/login"} className="brand-logo left" style={{fontFamily: 'Grand Hotel, cursive'}}>Instagram</Link>
            <ul id="nav-mobile" className="right">
            {renderList()}
            </ul>
        </div>
        </nav>
    )
}
