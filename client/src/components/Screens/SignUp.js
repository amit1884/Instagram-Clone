import React ,{useState,useEffect}from 'react'
import {Link,useHistory} from 'react-router-dom'
import M from 'materialize-css';
function SignUp() {

    const history=useHistory();
    const [name,setName]=useState('')
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const [image,setImage]=useState('')
    const [url,setUrl]=useState(undefined)

    useEffect(()=>{

        if(url){
            UploadFields()
        }
    },[url])

    const UploadPic=()=>{

        const data=new FormData()
        data.append("file",image)
        data.append("upload_preset","instagram-clone")
        data.append("cloud_name","webarts")
    
        fetch("https://api.cloudinary.com/v1_1/webarts/image/upload",{
          method:"post",
          body:data
        })
        .then(res=>res.json())
        .then(data=>{
          console.log(data)
          setUrl(data.url)
        })
        .catch(err=>{
          console.log(err)
        })
      }

      const UploadFields=()=>{

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
                    email,
                    pic:url
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

    const PostData=()=>{

        if(image){
            UploadPic()
        }
        else{
            UploadFields()
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
                 <div className="file-field input-field">
                    <div className="btn #64b5f6 blue darken-1">
                        <span>Upload Dp</span>
                        <input 
                        type="file"
                        onChange={(e)=>setImage(e.target.files[0])}
                        />
                    </div>
                    <div className="file-path-wrapper">
                        <input type="text" className="file-path validate"/>
                    </div>
                </div>
                <button 
                onClick={PostData}
                className="btn waves-effect waves-light #64b5f6 blue darken-1">
                    SignUp
                </button>
                <h5>
                    <Link to ="/login">
                        Already Have an account ?
                    </Link>
                </h5>
            </div>
    </div>
    )
}

export default SignUp
