import React ,{useContext}from 'react'
import '../App.css'
import {Link,useHistory} from 'react-router-dom'
import {UserContext} from '../App'
export default function Navbar() {
    const history=useHistory()
    const {state,dispatch}=useContext(UserContext)
    const renderList=()=>{
        if(state)
        {
            return [
                <li><Link to="/profile">Profile</Link></li>,
                <li><Link to ="/create">Create</Link></li>,
                <li><Link to ="/myfollowingpost">FPosts</Link></li>,
                <li>
                    <button 
                    style={{marginRight:"20px"}}
                        onClick={()=>{
                            localStorage.clear()
                            dispatch({type:"CLEAR"})
                            history.push("/login")
                        }}
                    className="btn #c62828 red darken-3">
                        {/* <i className="material-icons">power_settings_new</i> */}
                        Logout
                    </button>
                </li>,
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
