import React ,{useState,useContext,useRef,useEffect}from 'react'
import '../App.css'
import {Link,useHistory} from 'react-router-dom'
import {UserContext} from '../App'
import M from 'materialize-css'
export default function BottomNav() {
    const history=useHistory()
    // const SearchModal=useRef(null)
    // const [search,setSearch]=useState('')
    const [userDetails,setUserDetails]=useState([])
    const {state,dispatch}=useContext(UserContext)

    // useEffect(()=>{

    //     M.Modal.init(SearchModal.current)

    // },[])
    return (
        <div className="bottom-nav">
            <div className="single-nav-item">
                <Link to ="/">
                <i class="large material-icons">home</i>
                </Link>
            </div>
            <div className="single-nav-item">
            <Link to ="/search">
                <i class="large material-icons">search</i>
            </Link>
            </div>
            <div className="single-nav-item">
            <Link to ="/create">
                <i class="large material-icons">add_circle</i>
            </Link>
            </div>
            <div className="single-nav-item">
            <Link to ="/myfollowingpost">
                <i class="large material-icons">perm_contact_calendar</i>
            </Link>
            </div>
            <div className="single-nav-item">
            <Link to ="/profile">
                <i class="large material-icons">person</i>
            </Link>
            </div>
        </div>
    )
}
