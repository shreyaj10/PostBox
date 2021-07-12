import React, { useState } from 'react'
import axios from 'axios'
import {Link, useHistory, userHistory} from 'react-router-dom'




function SignUp() {
    const [usernameError, setusernameError] = useState("")
    const [passwordError, setpasswordError] = useState("")
    const [emailError, setemailError] = useState("")
    let history= useHistory();
    const [input, setInput] = useState({
        username: '',
        password: '',
        email: '',
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
        const newUser = {
            username: input.username,
            email: input.email,
            password: input.password,

          


        }
        console.log(newUser)
        axios.post("https://postbox01.herokuapp.com/signup", newUser)
            .then(async (res) =>{
                const data = await res.data;
                if(data.errors){
                    setusernameError(data.errors.username)
                    setemailError(data.errors.email)
                    setpasswordError(data.errors.password)
                }
                else{
                    
                    history.push('/login')
                }
            })
            
            .catch(error => {
                console.log(error);
            });
            
    }
    const handleClick1=()=>{
        history.push('/login')
    }
    return (
        <div className="createUser">
            <form className="SignUp">
                <h1 id="h1">Sign Up</h1>
                <div className="Input" >
                    <label form="username" ></label>
                    <input onChange={handleChange}  name='username' value={input.username} placeholder= "Username"  id="username" />
                    <div>{usernameError}</div>
                </div>
                <div  className="Input">
                    <label form="Email"   ></label>
                    <input onChange={handleChange}  name='email' value={input.email} placeholder="Email"  id="Email" />
                    <div>{emailError}</div>
                </div>
                <div className="Input">
                    <label form="password"   ></label>
                    <input type="password" onChange={handleChange}  name='password' placeholder="Password"  id="password" value={input.password}   />
                    <div>{passwordError}</div>
                </div>
                <button onClick={handleClick} type="submit" className="btn1" >Submit</button>
                <h5 onClick={handleClick1} > <Link to="/login" id="remark">already a user? Click here to Log in</Link></h5>
            </form>
        </div>
    )






}

export default SignUp
