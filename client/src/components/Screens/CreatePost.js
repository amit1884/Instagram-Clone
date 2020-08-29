import React,{useState,useEffect} from 'react'
import '../../App.css'
import {Link,useHistory} from 'react-router-dom'
import M from 'materialize-css';
function CreatePost() {

  const history=useHistory()
  const [title,setTitle]=useState('')
  const [body,setBody]=useState('')
  const [image,setImage]=useState('')
  const [url,setUrl]=useState('')


  useEffect(()=>{

    if(url){

      fetch("/createpost",{
        method:"post",
        headers:{
            "Content-Type":"application/json",
            "Authorization":"Bearer "+localStorage.getItem("jwt")
        },
        body:JSON.stringify({
            title,
            body,
            pic:url
        })
      })
  
      .then(res=>res.json())
      .then(data=>{
        console.log(data)
        if(data.error)
        {
          M.toast({html:data.error,classes:"#c62828 red darken-3"})
        }
        else{
          M.toast({html:"Post Created Successfully",classes:"#43a047 green darken-1"})
          history.push('/')
      }
      })
      .catch(err=>{
        console.log(err)
    })
    }
  },[url])

  const PostDetails=()=>{

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
    return (
        <div className="card input-field"
            style={{
                margin:"30px auto",
                maxWidth:"500px",
                padding:"20px",
                textAlign:"center"
            }}
        >
          <h2>Instagram</h2>
          <input
            type="text"
            placeholder="title"
            value={title}
            onChange={(e)=>setTitle(e.target.value)}
          /> 
          <input
            type="text"
            placeholder="body"
            value={body}
            onChange={(e)=>setBody(e.target.value)}
          />  
          <div className="file-field input-field">
              <div className="btn #64b5f6 blue darken-1">
                <span>Upload Image</span>
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
            onClick={PostDetails}
            className="btn waves-effect waves-light #64b5f6 blue darken-1">
                Submit Post
            </button>
        </div>
    )
}

export default CreatePost
