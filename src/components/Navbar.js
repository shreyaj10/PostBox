import React, {useEffect, useState} from 'react';
import {useHistory, Link} from 'react-router-dom';
import axios from 'axios'
import Welcome from './Welcome'
import { BsFillHouseDoorFill } from "react-icons/bs";
import { BsFillBarChartFill } from "react-icons/bs";
import { BsPlusCircleFill } from "react-icons/bs";
import { HiDuplicate } from "react-icons/hi";
import { IoLogOut } from "react-icons/io5";
import { GiMailbox, GiHamburgerMenu } from "react-icons/gi";




function Navbar() {
    let history=useHistory()

    const [user, setUser] = useState({})
    const [Style1, setStyle1] = useState({display:"none"})

    const authToken=() =>{
        
        let token = localStorage.getItem("token")

        if(token){
            
            axios.post('http://localhost:3001/auth', {token:token})
            .then(res=>{
                if(res.data === false){
                    history.push('/login')
                }else{
                    setUser(res.data)
                    history.push('/posts')
                }
            
            })
            .catch(errors=>{
                console.log(errors)
            })
        }else{
            history.push('/login')
        }
    }
    const authToken1=() =>{
        let token = localStorage.getItem("token")
        if(token){
            
            
            axios.post('http://localhost:3001/auth', {token:token})
            .then(res=>{
                if(res.data === false){
                    history.push('/login')
                }else{
                    setUser(res.data)
                    history.push('/create')
                }
            
            })
            .catch(errors=>{
                console.log(errors)
            })
        }else{
            history.push('/login')
        }
    }
        const logOut=()=>{
            alert('Aap Sure Hain?')
            localStorage.removeItem('token')
            history.push('./login')
        }

        useEffect(() => {
            let token = localStorage.getItem("token")

        if(token){
            console.log(token)
            axios.post('http://localhost:3001/auth', {token:token})
            .then(res=>{
                if(res.data === false){
                    history.push('/login')
                }else{
                    setUser(res.data)
                    
                }
            
            })
            .catch(errors=>{
                console.log(errors)
            })
        }else{
            
            history.push('/login')
        }
            
        },[] )

        const authToken2=() =>{
            let token = localStorage.getItem("token")
            if(token){
                
                
                axios.post('http://localhost:3001/auth', {token:token})
                .then(res=>{
                    if(res.data === false){
                        history.push('/login')
                    }else{
                        setUser(res.data)
                        history.push('/trending')
                    }
                
                })
                .catch(errors=>{
                    console.log(errors)
                })
            }else{
                history.push('/login')
            }
        }

        const authToken3=() =>{
            let token = localStorage.getItem("token")
            if(token){
                
                
                axios.post('http://localhost:3001/auth', {token:token})
                .then(res=>{
                    if(res.data === false){
                        history.push('/login')
                    }else{
                        setUser(res.data)
                        history.push('/yourpost')
                    }
                
                })
                .catch(errors=>{
                    console.log(errors)
                })
            }else{
                history.push('/login')
            }
        }
        
        


    return (
        <div>
        <nav className="navbar">
        <h2 id="brand"><GiMailbox/>PostBox</h2>
        <h4><Link to='/posts' className='navItem'> <BsFillHouseDoorFill/> Home</Link></h4>
        {/* <h4 onClick={authToken}><Link to='/posts'>Posts</Link></h4> */}
        <h4 onClick={authToken1}><Link to='/create' className='navItem'><BsPlusCircleFill/> Create Post</Link></h4>
        <h2 id="item">Hey, {user.username}!</h2>
        <h4 onClick={authToken2}><Link to='/trending'className='navItem'><BsFillBarChartFill/> Trending</Link></h4>
        <h4 onClick={authToken3}><Link to='/yourpost'className='navItem'><HiDuplicate/> Your Posts</Link></h4>
        <h4 onClick={logOut}><Link to='/login'className='navItem'><IoLogOut/> Log Out</Link></h4>
        <button className='navItem1' ><Link to='/dropdown' id="navItem1"><GiHamburgerMenu id="dropIcon"/></Link></button>
        
        
     
        
    </nav>
        </div>

    )
}

export default Navbar
