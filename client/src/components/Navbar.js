import React from 'react'
import '../App.css'
import {Link} from 'react-router-dom'
export default function Navbar() {
    return (
        <nav>
        <div className="nav-wrapper white">
            <Link to="/" className="brand-logo left" style={{fontFamily: 'Grand Hotel, cursive'}}>Instagram</Link>
            <ul id="nav-mobile" className="right">
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/signup">Signup</Link></li>
            <li><Link to="/profile">Profile</Link></li>
            <li><Link to ="/create">Create</Link></li>
            </ul>
        </div>
        </nav>
    )
}