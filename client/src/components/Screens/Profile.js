import React from 'react'
import '../../App.css';
import defaultAvatar from '../../assets/6.jpg'
function Profile() {
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
                    <img src ={defaultAvatar} alt ="profile" className="profile-img"/>
                </div>
                <div>
                    <h5>Natsu Dragneel</h5>
                    <div style={{display:"flex",justifyContent:"space-between",overflow:"hidden"}}>
                        <p style={{marginLeft:"8px"}}>45 Posts</p>
                        <p style={{marginLeft:"8px"}}>40 Followers</p>
                        <p style={{marginLeft:"8px"}}>45 Following</p>
                    </div>
                </div>
            </div>
            <div className="gallery">
                <img className="item" src ={defaultAvatar} alt="yourposts"/>
                <img className="item" src ={defaultAvatar} alt="yourposts"/>
                <img className="item" src ={defaultAvatar} alt="yourposts"/>
                <img className="item" src ={defaultAvatar} alt="yourposts"/>
                <img className="item" src ={defaultAvatar} alt="yourposts"/>
                <img className="item" src ={defaultAvatar} alt="yourposts"/>
                <img className="item" src ={defaultAvatar} alt="yourposts"/>
            </div>
        </div>
    )
}

export default Profile
