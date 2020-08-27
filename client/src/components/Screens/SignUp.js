import React ,{useState}from 'react'
import {Link,useHistory} from 'react-router-dom'
import M from 'materialize-css';
function SignUp() {

    const history=useHistory();
    const [name,setName]=useState('')
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')

    const PostData=()=>{
        if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
            M.toast({html:"Invalid Email",classes:"#c62828 red darken-3"})
        }
        else{

            fetch("/signup",{
                method:"post",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({
                    name,
                    password,
                    email
                })
            })
            .then(res=>res.json())
            .then(data=>{
                console.log(data)
                if(data.error){
                    M.toast({html:data.error,classes:"#c62828 red darken-3"})
                }
                else{
                    M.toast({html:data.message,classes:"#43a047 green darken-1"})
                    history.push('/login')
                }
            })
            .catch(err=>{
                console.log(err)
            })
        }
    }

    return (
        <div className="mycard">
            <div className="card auth-card input-field">
                <h2>Instagram</h2>
                <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e)=>setName(e.target.value)}
                />
                <input
                type="text"
                placeholder="Email"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                />
                <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                />
                <button 
                onClick={PostData}
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
