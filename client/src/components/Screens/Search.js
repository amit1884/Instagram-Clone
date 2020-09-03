import React ,{useState,useContext}from 'react'
import {Link} from 'react-router-dom'
import {UserContext} from '../../App'
function Search() {

    const [search,setSearch]=useState('')
    const [userDetails,setUserDetails]=useState([])
    const {state,dispatch}=useContext(UserContext)
    const fetchUsers=(query)=>{

        setSearch(query);
        if(search!=='')
        {
            fetch("/search_user",{
                method:"post",headers:{
                    "Content-Type":"application/json",
                },
                body:JSON.stringify({
                    query
                })
            })
            .then(res=>res.json())
            .then(result=>{
                console.log(result)
                setUserDetails(result.user)
            })
        }
        else{
            setUserDetails([])
        }
    }
    return (
        <div style={{overflow:"hidden"}}>
             <input
                type="text"
                placeholder="search"
                value={search}
                onChange={(e)=>fetchUsers(e.target.value)}
                style={{paddingLeft:"10px"}}
            />
            <div className="search-content">
                <ul className="collection">
                    {
                        userDetails.map(item=>{
                            return(
                            <li className="collection-item" key={item._id}>
                                <Link to ={item._id!==state._id?"/profile/"+item._id:"/profile"}>
                                    <p>
                                        <img src={item.pic}alt ="" align="left" style={{width:"40px",height:"40px",borderRadius:"50%"}}/>
                                        &nbsp;&nbsp;&nbsp;{item.email}
                                    </p>
                                </Link>
                            </li>
                            )
                        })
                    }
                </ul>
            </div>
        </div>
    )
}

export default Search
