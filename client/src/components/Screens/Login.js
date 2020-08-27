import React from 'react'
import {Link} from 'react-router-dom'
function Login() {
    return (
       <div className="mycard">
            <div className="card auth-card input-field">
          <h2>Instagram</h2>
          <input
          type="text"
          placeholder="Email"
          />
          <input
          type="password"
          placeholder="Password"
          />
          <button className="btn waves-effect waves-light #64b5f6 blue darken-1">
            Login
          </button>
            <h5>
                <Link to ="/login">
                    Don't Have an account ?
                </Link>
            </h5>
        </div>
       </div>
    )
}

export default Login
