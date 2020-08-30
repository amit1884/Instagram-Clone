import React,{useEffect,useState,useContext} from 'react'
import '../../App.css';
import defaultAvatar from '../../assets/6.jpg'
import {UserContext} from '../../App'
import {useParams} from 'react-router-dom'
function UserProfile() {

    const [userProfile,setProfile]=useState(null)
    const {state,dispatch}=useContext(UserContext)
    const{userid}=useParams()
    const [showfollow,setShowFollow]=useState(state?!state.following.includes(userid):true)
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


    const followUser=()=>{
        fetch("/follow",{
            method:"put",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                followId:userid
            })
        })
        .then(res=>res.json())
        .then(data=>{
            console.log(data)
            dispatch({type:"UPDATE",payload:{following:data.following,followers:data.followers}})
            localStorage.setItem("user",JSON.stringify(data))
            setProfile((prevState)=>{
                return {
                    ...prevState,
                    user:{
                        ...prevState.user,
                        followers:[...prevState.user.followers,data._id]
                    }
                }
            })
            setShowFollow(false)
        })
    }



    const unfollowUser=()=>{
        fetch("/unfollow",{
            method:"put",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                unfollowId:userid
            })
        })
        .then(res=>res.json())
        .then(data=>{
            console.log(data)
            dispatch({type:"UPDATE",payload:{following:data.following,followers:data.followers}})
            localStorage.setItem("user",JSON.stringify(data))
            setProfile((prevState)=>{
            const newFollower=prevState.user.followers.filter(item=>item!==data._id)
                return {
                    ...prevState,
                    user:{
                        ...prevState.user,
                        followers:newFollower
                    }
                }
            })
            setShowFollow(true)
        })
    }
    return (
    <>
    {userProfile?

    <div className="card"style={{
        maxWidth:"550px",
        margin:"0px auto",
        minHeight:"100vh"
    }}>
        <div style={{
            display:"flex",
            justifyContent:"space-around",
            margin:"20px 0px",
            borderBottom:"1px solid grey"
        }}>
            <div>
                <img src ={userProfile.user.pic} alt ="profile" className="profile-img"/>
            </div>
            <div>
                <h5>{userProfile.user.name}</h5>
                <h6>{userProfile.user.email}</h6>
                <div style={{display:"flex",justifyContent:"space-between",overflow:"hidden"}}>
                    <p style={{marginLeft:"8px"}}>{userProfile.posts.length}&nbsp; Posts</p>
                    <p style={{marginLeft:"8px"}}>{userProfile.user.followers.length} Followers</p>
                    <p style={{marginLeft:"8px"}}>{userProfile.user.following.length} Following</p>
                </div>

                {
                showfollow?
                <button 
                onClick={followUser}
                style={{width:"100%"}}
                className="btn waves-effect waves-light #64b5f6 blue darken-1">
                Follow
                </button>
                :
                <button 
                onClick={unfollowUser}
                style={{width:"100%"}}
                className="btn waves-effect waves-light #64b5f6 blue darken-1">
                Unfollow
                </button>
                }
                <br/><br/>
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
