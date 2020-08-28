import React ,{useState,useEffect,useContext}from 'react'
import image from '../../assets/1.jpg';
import {UserContext} from '../../App'
import '../../App.css'
function Home() {
    const {state,dispatch}=useContext(UserContext)

    const [data,setData]=useState([])
    useEffect(()=>{

        fetch("/allpost",{
            headers:{
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            }
        })
        .then(res=>res.json())
        .then(result=>{
            console.log(result)
            setData(result.posts)
        })
    },[])



    const likePost=(id)=>{

        fetch("/like",{
            method:"put",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                postId:id
            })
        })
        .then(res=>res.json())
        .then(result=>{
            console.log(result)
            const newData=data.map(item=>{
                if(item._id==result._id)
                {
                    return result
                }
                else
                {
                    return item
                }
            })
            setData(newData);
        })
        .catch(err=>{
            console.log(err)
        })
    }



    const unlikePost=(id)=>{

        fetch("/unlike",{
            method:"put",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                postId:id
            })
        })
        .then(res=>res.json())
        .then(result=>{
            console.log(result)
            const newData=data.map(item=>{
                if(item._id==result._id)
                {
                    return result
                }
                else
                {
                    return item
                }
            })
            setData(newData);
        })
        .catch(err=>{
            console.log(err)
        })
    }
    return (
        <div className="home">
            {
                data.map(item=>{
                    return(
                        <div className="card home-card" key={item._id}>
                        <h5>{item.postedBy.name}</h5>
                        <div className="card-image">
                            <img src ={item.photo} alt="post"/>
                        </div>
                        <div className="card-content">
                            <i className="material-icons" style={{color:"red"}}>favorite</i>&nbsp;&nbsp;
                            {item.likes.includes(state._id)
                                ? <i 
                                onClick={()=>unlikePost(item._id)}
                                className="material-icons" 
                                style={{color:"blue"}}>thumb_down
                                </i>
                                : <i 
                                onClick={()=>likePost(item._id)}
                                className="material-icons" 
                                style={{color:"blue"}}>thumb_up</i>
                            }
                            <h6>
                            <i className="material-icons" style={{color:"red",fontSize:"12px"}}>favorite</i>
                               &nbsp;&nbsp; {item.likes.length} likes</h6>
                            <h6>{item.title}</h6>
                            <p>{item.body}</p>
                            <input
                            type="text"
                            placeholder="Add comment"
                            />
                        </div>
                    </div>
                    )
                })
            }
        </div>
    )
}

export default Home
