import React ,{useState,useContext,useRef,useEffect}from 'react'
import '../App.css'
import {Link,useHistory} from 'react-router-dom'
import {UserContext} from '../App'
import M from 'materialize-css'
export default function Navbar() {
    const history=useHistory()
    const SearchModal=useRef(null)
    const [search,setSearch]=useState('')
    const [userDetails,setUserDetails]=useState([])
    const {state,dispatch}=useContext(UserContext)

    useEffect(()=>{

        M.Modal.init(SearchModal.current)

    },[])

    const renderList=()=>{
        if(state)
        {
            return [
                <li key={1}><i data-target="modal1" className="large material-icons modal-trigger" style={{color:"black",cursor:"pointer"}}>search</i></li>,
                <li key={2}><Link to="/profile">Profile</Link></li>,
                <li key={3}><Link to ="/create">Create</Link></li>,
                <li key={4}><Link to ="/myfollowingpost">FPosts</Link></li>,
                <li>
                    <button 
                    style={{marginRight:"20px"}}
                        onClick={()=>{
                            localStorage.clear()
                            dispatch({type:"CLEAR"})
                            history.push("/login")
                        }}
                    className="btn #c62828 red darken-3">
                        {/* <i className="material-icons">power_settings_new</i> */}
                        Logout
                    </button>
                </li>,
            ]
        }
        else{
            return [
                <li key={5}><Link to="/login">Login</Link></li>,
                <li key={6}><Link to="/signup">Signup</Link></li>
            ]
        }
    }

    const fetchUsers=(query)=>{

        setSearch(query);
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
    return (
        <nav>
        <div className="nav-wrapper white">
            <Link to={state?"/":"/login"} className="brand-logo left" style={{fontFamily: 'Grand Hotel, cursive'}}>Instagram</Link>
            <ul id="nav-mobile" className="right">
            {renderList()}
            </ul>
        </div>
        <div id="modal1" class="modal" ref={SearchModal} style={{color:"black"}}>
            <div className="modal-content">
            <input
                type="text"
                placeholder="search"
                value={search}
                onChange={(e)=>fetchUsers(e.target.value)}
            />
            <ul class="collection">
                {
                    userDetails.map(item=>{
                        return(
                        <li key={item._id}className="collection-item" style={{width:"100%"}}>
                            <Link to={item._id!==state._id?"/profile/"+item._id:"/profile"} onClick={()=>{
                                M.Modal.getInstance(SearchModal.current).close()
                            }}>
                            {item.email}
                            </Link>
                        </li>
                        )
                    })
                }
            </ul>
            </div>
            <div className="modal-footer">
            <button className="modal-close waves-effect waves-green btn-flat" onClick={()=>setSearch('')}>Clear</button>
            </div>
        </div>
        </nav>
    )
}
