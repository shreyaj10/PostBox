import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import Post from './Post'
import Trend from './Trend'


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
    const onDelete=(post)=>{
        setPosts(posts.filter(e=>{
            return e!==post 

        }))
        let upobj={
            id:post._id,
            user:user._id 
        }
        axios.post('https://postbox01.herokuapp.com/delete', upobj)
        .then(res=>{
            console.log(res)
        })
        .catch(err=>{
            console.log(err)
        })

    }
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
          if(post.username===user.username){
          return(
              <div>
                  <Trend post={post} user={user} onDelete={onDelete}/>

              </div>
          )}
              
          
      })}
          
         
    </div>
)}
export default Posts
