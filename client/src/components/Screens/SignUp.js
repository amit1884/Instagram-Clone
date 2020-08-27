import React ,{useState}from 'react'
import {Link} from 'react-router-dom'
function SignUp() {

    const [Name,setName]=useState('')
    const [Email,setEmail]=useState('')
    const [Password,setPassword]=useState('')

    const PostData=()=>{
        fetch("http://localhost:5000/signup",{
            method:"post",
            header:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                name:"",
                password:"",
                email:""
            })
        })
        .then(res=>res.json())
        .then(data=>{
            console.log(data)
        })
    }

    return (
        <div className="mycard">
            <div className="card auth-card input-field">
                <h2>Instagram</h2>
                <input
                type="text"
                placeholder="Name"
                value={Name}
                onChange={(e)=>setName(e.target.value)}
                />
                <input
                type="text"
                placeholder="Email"
                value={Email}
                onChange={(e)=>setEmail(e.target.value)}
                />
                <input
                type="password"
                placeholder="Password"
                value={Password}
                onChange={(e)=>setPassword(e.target.value)}
                />
                <button 
                onCLick={PostData}
                className="btn waves-effect waves-light #64b5f6 blue darken-1">
                    SignUp
                </button>
                <h5>
                    <Link to ="/signup">
                        Already Have an account ?
                    </Link>
                </h5>
            </div>
    </div>
    )
}

export default SignUp
