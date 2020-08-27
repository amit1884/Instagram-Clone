import React from 'react'
import image from '../../assets/1.jpg';
import '../../App.css'
function Home() {
    return (
        <div className="home">
            <div className="card home-card">
                <h5>Natsu Dragneel</h5>
                <div className="card-image">
                    <img src ={image} alt="post"/>
                </div>
                <div className="card-content">
                <i className="material-icons" style={{color:"red"}}>favorite</i>
                    <h6>Title</h6>
                    <p>This is amazing post</p>
                    <input
                    type="text"
                    placeholder="Add comment"
                    />
                </div>
            </div>

            <div className="card home-card">
                <h5>Natsu Dragneel</h5>
                <div className="card-image">
                    <img src ={image} alt="post"/>
                </div>
                <div className="card-content">
                <i className="material-icons" style={{color:"red"}}>favorite</i>
                    <h6>Title</h6>
                    <p>This is amazing post</p>
                    <input
                    type="text"
                    placeholder="Add comment"
                    />
                </div>
            </div>

            <div className="card home-card">
                <h5>Natsu Dragneel</h5>
                <div className="card-image">
                    <img src ={image} alt="post"/>
                </div>
                <div className="card-content">
                <i className="material-icons" style={{color:"red"}}>favorite</i>
                    <h6>Title</h6>
                    <p>This is amazing post</p>
                    <input
                    type="text"
                    placeholder="Add comment"
                    />
                </div>
            </div>
        </div>
    )
}

export default Home
