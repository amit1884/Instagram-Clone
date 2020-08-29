import React,{useEffect,useState,useContext} from 'react'
import '../../App.css';
import defaultAvatar from '../../assets/6.jpg'
import {UserContext} from '../../App'
function Profile() {

    const [mypics,setPics]=useState([])
    const {state,dispatch}=useContext(UserContext)
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
    return (
        <div style={{
            maxWidth:"550px",
            margin:"0px auto"
        }}>
            <div style={{
                display:"flex",
                justifyContent:"space-around",
                margin:"18px 0px",
                borderBottom:"1px solid grey"
            }}>
                <div>
                    <img src ={state?state.pic:defaultAvatar} alt ="profile" className="profile-img"/>
                </div>
                <div>
                    <h5>{state?state.name:"Loading"}</h5>
                    <h6>{state?state.email:"Loading"}</h6>
                    <div style={{display:"flex",justifyContent:"space-between",overflow:"hidden"}}>
                        <p style={{marginLeft:"8px"}}>{mypics.length} Posts</p>
                        <p style={{marginLeft:"8px"}}>
                            {state?state.followers.length:"0"}&nbsp;
                            Followers
                        </p>
                        <p style={{marginLeft:"8px"}}>
                        {state?state.following.length:"0"}&nbsp;
                            Following
                        </p>
                    </div>
                </div>
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
