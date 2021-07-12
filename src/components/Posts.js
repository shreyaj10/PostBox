import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import Post from './Post'


function Posts() {
    let history=useHistory()
    const [user, setUser] = useState({
        username:'',
        _id:'',
        email:'',
        password:'',
        postsLiked:[],
        postsDisliked:[],
    })
    const [posts, setPosts] = useState([{
        username: '',
        _id: '',
        timeStamp: '',
        title: '',
        content: '',
        likedBy: [],
        dislikedBy: [],
        comments:[{user:'', comment:''}]
    

    }])

    useEffect(() => {
        fetch("https://postbox01.herokuapp.com/posts")
        .then(res=>{
            if(res.ok){
                return res.json()
                
            }
        })
        .then(jsonRes=>{
            jsonRes.sort(function(a,b){
                let timeA= Date.now()-a.timeStamp
                let timeB= Date.now()-b.timeStamp
                return timeA-timeB
            })
            setPosts(jsonRes)
        });
        let token=localStorage.getItem('token');
        if(token){
            axios.post('https://postbox01.herokuapp.com/auth', {token:token})
            .then(res=>{
                if(res.data===false){
                    history.push('/login')
                }else{
                    setUser(res.data)
                }
            })
            .catch(err=>{
                console.log(err)
            })
        }else{history.push('/login')}
    }, [])


        
    
return(
    <div>
      {posts.map(post=>{
          return(
              <div>
                  <Post post={post} user={user}/>
                    
              </div>
          )
              
          
      })}
          
         
    </div>
)}
export default Posts
