import React, { useState, useEffect } from 'react'
import axios from 'axios'
import "./comp.css"
import {useHistory} from 'react-router-dom'


function CreatePost() {
    let history= useHistory();
    const [user, setUser] = useState({})
    const [input, setInput] = useState({
        title: '',
        content: ''
    })

    function handleChange(event) {
        const { name, value } = event.target;

        setInput(prevInput => {
            return {
                ...prevInput,
                [name]: value
            }
        })

    }

    function handleClick(event) {
        event.preventDefault();
        const newPost = {
            username: user.username,
            timeStamp: Date.now(),
            title: input.title,
            content: input.content,

        }
        
        console.log(newPost)
        
        axios.post("http://localhost:3001/create", newPost)
        .then(result => {
                console.log("done");
            })
        .catch(error => {
                console.log(error);
            });
        history.push('/success')
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
    return (
        <div className="createPost">
            <form className='container1'>
                <h1 className='createAPost'>Create A Post!</h1>
                <div id="title5" >
                    <label form="Title"  ></label>
                    <input onChange={handleChange} id="title1" name='title'placeholder="What's on your mind?" value={input.title} className="form-control"  />
                </div>
                <div id="content5">
                    <label form="Content" ></label>
                    <textarea onChange={handleChange} placeholder="Describe it here..."  name="content" id="content1" cols="30" rows="10"></textarea> 
                </div>
                <button onClick={handleClick} type="submit"  id="postBtn" className="btn btn-primary">Post</button>
            </form>
        </div>
    )






}

export default CreatePost
