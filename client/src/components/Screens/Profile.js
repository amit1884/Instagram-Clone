import React,{useEffect,useState,useContext} from 'react'
import '../../App.css';
import defaultAvatar from '../../assets/6.jpg'
import {UserContext} from '../../App'
function Profile() {

    const [mypics,setPics]=useState([])
    const {state,dispatch}=useContext(UserContext)
    const [image,setImage]=useState('')
    // const [url,setUrl]=useState('')
    useEffect(()=>{

        fetch("/mypost",{
            headers:{
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            }
        })
        .then(res=>res.json())
        .then(result=>{
            console.log(result)
            setPics(result.mypost)
        })
    },[])
    useEffect(()=>{

        if(image)
        {
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
        //   setUrl(data.url)
          fetch("/updatepic",{
              method:"put",
              headers:{
                  "Content-Type":"application/json",
                  Authorization:"Bearer "+localStorage.getItem("jwt")
              },
              body:JSON.stringify({
                  pic:data.url
              })
          })
          .then(res=>res.json())
          .then(result=>{
              console.log(result)
              localStorage.setItem("user",JSON.stringify({...state,pic:result.pic}))
              dispatch({type:"UPDATEPIC",payload:result.pic})
          })
        })
        .catch(err=>{
          console.log(err)
        })
        }
    },[image])

    const updatePhoto=(file)=>{
        setImage(file)
    }
    return (
        <div className="card" style={{
            maxWidth:"550px",
            margin:"10px auto",
            minHeight:"100vh"
        }}>
            <div style={{
                display:"flex",
                justifyContent:"space-evenly",
                margin:"20px 0px",
                borderBottom:"1px solid grey"
            }}>
                <div>
                    <img src ={state?state.pic:defaultAvatar} alt ="profile" className="profile-img"/>
                </div>
                <div>
                    <h5 style={{marginLeft:"30px"}}>{state?state.name:"Loading"}</h5>
                    <h6 style={{marginLeft:"30px"}}>{state?state.email:"Loading"}</h6>
                    <div style={{display:"flex",justifyContent:"space-evenly",overflow:"hidden"}}>
                        <p>{mypics.length} Posts</p>
                        <p>
                            {state?state.followers.length:"0"}&nbsp;
                            Followers
                        </p>
                        <p>
                        {state?state.following.length:"0"}&nbsp;
                            Following
                        </p>
                    </div>
                    <div className="file-field input-field">
                        <div className="btn #64b5f6 blue darken-1">
                            <span>Update Pic</span>
                            <input 
                            type="file"
                            onChange={(e)=>updatePhoto(e.target.files[0])}
                            />
                        </div>
                        <div className="file-path-wrapper">
                            <input type="text" className="file-path validate"/>
                        </div>
                    </div>
                </div>
                <br/><br/>
            </div>
            {
                mypics.length===0?
                <div style={{textAlign:"center"}}>
                    <p><b>No Posts Uploaded Yet !</b></p>
                </div>
                :
                <div className="gallery">
                {
                    mypics.map(item=>{
                        return(
                            <img 
                            className="item" 
                            src ={item.photo} 
                            alt={item.title} 
                            key={item._id}/>
                        )
                    })
                }
            </div>
            }
           
        </div>
    )
}

export default Profile
