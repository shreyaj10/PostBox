import React from 'react'
import {Link, useHistory} from 'react-router-dom'
import SignUp from './SignUp'

function Home() {
    let history=useHistory()

    const handleClick=()=>{
        history.push('/signup')
    }
    const handleClick1=()=>{
        history.push('/login')
    }
    
    return (
        <div className="home">
    
            <div className="class">
                <div className="text">
                      <h1 className="text1">PostBox</h1>
                <h6 className="text2">Join PostBox Today</h6>
                </div>
            <button className="homeBtn" onClick={handleClick}> <Link to="/signup"></Link>Sign Up</button>
            <button className="homeBtn" onClick={handleClick1}> <Link to="/login"></Link>Log In</button>
            </div>
        </div>
    )
}

export default Home
