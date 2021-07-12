import axios from 'axios'
import React, {useState, useEffect} from 'react'
import { useHistory } from 'react-router'
import {FaArrowCircleUp} from 'react-icons/fa'
import {FaArrowCircleDown} from 'react-icons/fa'



function Post(props) {
    const [user1, setUser1] = useState(props.user)
    const [post1, setPost1] = useState(props.post)

    const [msg, setMsg] = useState('upvote')
    const [msgD, setMsgD] = useState('downvote')
    const [upvotes, setUpvotes] = useState(props.post.likes)
    const [downvotes, setDownvotes] = useState(props.post.dislikes)
    const [comments, setComments] = useState(props.post.comments)
    const [nocomments, setNocomments] = useState(props.post.nocomments)
    const [input, setInput] = useState({
        comment:'',
    })

    useEffect(() => {
        setPost1(props.post)
        setUser1(props.user)
        setComments(props.post.comments)
        setNocomments(props.post.nocomments)
        setUpvotes(props.post.likes)
        setDownvotes(props.post.dislikes)
        if(props.user.postsLiked.includes(props.post._id)){
            setMsg('upvoted')
        }
        if(props.user.postsDisliked.includes(props.post._id)){
            setMsgD('downvoted')
        }

    }, [props.post, props.user])

    const upvote=()=>{
        let upobj={
            id:post1._id,
            user:user1._id
        }
        setMsg('upvoted')
        setUpvotes(upvotes=>{return upvotes+1})

        setUser1(user=>{
            user.postsLiked.push(post1._id)
            return user 
        })
        axios.post('http://localhost:3001/upvote', upobj)
        .then(res=>{
            console.log(res)
        })
        .catch(err=>{
            console.log(err)
        })
    }

    const downvote=()=>{
        let upobj={
            id:post1._id,
            user:user1._id
        }
        setMsgD('downvoted')
        setDownvotes(downvotes=>{return downvotes+1})

        setUser1(user=>{
            user.postsDisliked.push(post1._id)
            return user 
        })
        axios.post('http://localhost:3001/downvote', upobj)
        .then(res=>{
            console.log(res)
        })
        .catch(err=>{
            console.log(err)
        })
    }

    const unupvote=()=>{
        let upobj={
            id:post1._id,
            user:user1._id
        }
        setMsg('upvote')
        setUpvotes(upvotes=>{return upvotes-1})

        setUser1(user=>{
            user.postsLiked.filter(e=>{
                return e!==post1._id
            })
            return user 
        })
        axios.post('http://localhost:3001/unupvote', upobj)
        .then(res=>{
            console.log(res)
        })
        .catch(err=>{
            console.log(err)
        })
    }
    const undownvote=()=>{
        let upobj={
            id:post1._id,
            user:user1._id
        }
        setMsgD('downvote')
        setDownvotes(downvotes=>{return downvotes-1})

        setUser1(user=>{
            user.postsDisliked.filter(e=>{
                return e!==post1._id
            })
            return user 
        })
        axios.post('http://localhost:3001/undownvote', upobj)
        .then(res=>{
            console.log(res)
        })
        .catch(err=>{
            console.log(err)
        })
    }
    const handleClick=()=>{
        const newComment= {
            user:user1.username,
            comment:input.comment
        }
        let upobj={
            id:post1._id,
            user:user1.username,
            comment:input.comment
        }
        setComments(comms=>{
            comms.push(newComment)
            return comms
        })
        setNocomments(prev=>{
            return prev+1
        })
        axios.post('http://localhost:3001/comment', upobj)
        .then(res=>{
            console.log(res)
        })
        .catch(err=>{
            console.log(err)
        })
    }
    const handleChange=(e)=>{
        const {value}=e.target 
        setInput({comment:value})
    }

    return (
        <div>
        <div className="Post">
            <div className="intro">
                <h5 className="PostProp" id="usern">@{post1.username}</h5>
                <h5 className="PostProp" id="time">Posted {timeSince(post1.timeStamp)} ago</h5>
                </div>
                    <div>
                   <h2 className="PostProp" id="title">{post1.title}</h2>
                   <p className="PostProp" id="desc">{post1.content}</p>

                   <div className="actions">
                   <button onClick={()=>{
                       if(msg==='upvote' && msgD==='downvoted'){
                           undownvote()
                           upvote()
                       }
                       else if(msg==='upvoted' && msgD==='downvote'){
                           unupvote()
                           
                       }
                       else if(msg==='upvote' && msgD==='downvote'){
                           upvote()
                       }

                   }} id="upBtn"><FaArrowCircleUp/> {msg}</button>
                   <button onClick={()=>{
                       if(msg==='upvote' && msgD==='downvoted'){
                           undownvote()
                       }
                       else if(msg==='upvoted' && msgD==='downvote'){
                           unupvote()
                           downvote()

                       }
                       else if(msg==='upvote' && msgD==='downvote'){
                           downvote()
                       }
                   }} id="downBtn"><FaArrowCircleDown/> {msgD}</button>

                   <div className="count">
                       <div id="upvote">{upvotes}upvotes</div>
                       <div id="downvote">{downvotes}downvotes</div>
                       <div id="comment">{nocomments}comments</div>
                       </div>
                    
                
                   <form action=''>
                       <div id="comms">
                       <input id="comment1" placeholder="Add a Public Comment" onChange={handleChange} type="text" />
                        <button id="commBtn" onClick={handleClick}>comment</button> 
                       </div>
                   </form>
                   </div>
                   {comments.map(comm=>{
                       return(
                        <div id="commSec">
                            <div className="PostProp" id="commUser">@{comm.user}</div>
                            <div className="PostProp" id="commComm">{comm.comment}</div>
                        </div> 
                       )
                   })}

                </div>

            
        </div>
        </div>
    )
    function timeSince(date) {

        var seconds = Math.floor((new Date() - date) / 1000);
      
        var interval = seconds / 31536000;
      
        if (interval > 1) {
          return Math.floor(interval) + " years";
        }
        interval = seconds / 2592000;
        if (interval > 1) {
          return Math.floor(interval) + " months";
        }
        interval = seconds / 86400;
        if (interval > 1) {
          return Math.floor(interval) + " days";
        }
        interval = seconds / 3600;
        if (interval > 1) {
          return Math.floor(interval) + " hours";
        }
        interval = seconds / 60;
        if (interval > 1) {
          return Math.floor(interval) + " minutes";
        }
        return Math.floor(seconds) + " seconds";
      }
}

export default Post
