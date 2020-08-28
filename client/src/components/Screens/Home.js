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
                if(item._id===result._id)
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
                if(item._id===result._id)
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


    const makeComment=(text,postId)=>{

        fetch("/comment",{
            method:"put",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                postId,
                text
            })
        })
        .then(res=>res.json())
        .then(result=>{
            console.log(result)
            const newData=data.map(item=>{
                if(item._id===result._id)
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

    const deletePost=(postid)=>{
        fetch(`/deletepost/${postid}`,{
            method:"delete",
            headers:{
                Authorization:"Bearer "+localStorage.getItem("jwt")
            }
        })
        .then(res=>res.json())
        .then(result=>{
            console.log(result)
            const newData=data.filter(item=>{
                return item._id!==result._id
            })
            setData(newData);
        })
    }

    return (
        <div className="home">
            {
                data.map(item=>{
                    return(
                        <div className="card home-card" key={item._id}>
                        <h5>{item.postedBy.name}
                        {
                            item.postedBy._id===state._id
                            ?<i 
                            onClick={()=>deletePost(item._id)}
                            className="material-icons" 
                            style={{color:"grey",cursor:"pointer",float:"right"}}>delete</i>
                            :null
                        }
                        </h5>
                        <div className="card-image">
                            <img src ={item.photo} alt="post"/>
                        </div>
                        <div className="card-content">
                            <i className="material-icons" style={{color:"red"}}>favorite</i>&nbsp;&nbsp;
                            {item.likes.includes(state._id)
                                ? <i 
                                onClick={()=>unlikePost(item._id)}
                                className="material-icons" 
                                style={{color:"blue",cursor:"pointer"}}>thumb_down
                                </i>
                                : <i 
                                onClick={()=>likePost(item._id)}
                                className="material-icons" 
                                style={{color:"blue",cursor:"pointer"}}>thumb_up</i>
                            }
                            <h6>
                            <i className="material-icons" style={{color:"red",fontSize:"12px"}}>favorite</i>
                               &nbsp;&nbsp; {item.likes.length} likes</h6>
                            <h6>{item.title}</h6>
                            <p>{item.body}</p>
                            {
                                item.comments.map(record=>{
                                    return (
                                    <h6>
                                        <span key={record._id}style={{fontWeight:"500"}}>
                                            {record.postedBy.name}
                                        </span>&nbsp;
                                        {record.text}
                                    </h6>
                                    )
                                })
                            }
                            <form onSubmit={(e)=>{
                                e.preventDefault()
                                makeComment(e.target[0].value,item._id)
                            }}>
                            <input
                            type="text"
                            placeholder="Add comment"
                            />
                            </form>
                        </div>
                    </div>
                    )
                })
            }
        </div>
    )
}

export default Home
