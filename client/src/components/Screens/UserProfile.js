import React,{useEffect,useState,useContext} from 'react'
import '../../App.css';
import defaultAvatar from '../../assets/6.jpg'
import {UserContext} from '../../App'
import {useParams} from 'react-router-dom'
function UserProfile() {

    const [userProfile,setProfile]=useState(null)
    const {state,dispatch}=useContext(UserContext)
    const{userid}=useParams()
    useEffect(()=>{

        fetch(`/user/${userid}`,{
            headers:{
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            }
        })
        .then(res=>res.json())
        .then(result=>{
            console.log(result)
            setProfile(result)
        })
    },[])
    return (
    <>
    {userProfile?

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
                <img src ={defaultAvatar} alt ="profile" className="profile-img"/>
            </div>
            <div>
                <h5>{userProfile.user.name}</h5>
                <h6>{userProfile.user.email}</h6>
                <div style={{display:"flex",justifyContent:"space-between",overflow:"hidden"}}>
                    <p style={{marginLeft:"8px"}}>{userProfile.posts.length}&nbsp; Posts</p>
                    <p style={{marginLeft:"8px"}}>40 Followers</p>
                    <p style={{marginLeft:"8px"}}>45 Following</p>
                </div>
            </div>
        </div>
        <div className="gallery">
            {
            userProfile.posts.map(item=>{
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
    </div>

    :
    <h2>Loading.........!</h2>}
           </>
    )
}

export default UserProfile
