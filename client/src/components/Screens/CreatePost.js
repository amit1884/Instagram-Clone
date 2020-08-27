import React,{useState} from 'react'
import '../../App.css'
function CreatePost() {

  const [title,setTitle]=useState('')
  const [body,setBody]=useState('')
  const [image,setImage]=useState('')
  const PostDetails=()=>{

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
            <button className="btn waves-effect waves-light #64b5f6 blue darken-1">
                Submit Post
            </button>
        </div>
    )
}

export default CreatePost
