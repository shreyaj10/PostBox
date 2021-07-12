import React, { useState } from 'react'
import axios from 'axios'
import {Redirect , useHistory} from 'react-router-dom'




function Login() {
    const [passwordError, setpasswordError] = useState("")
    const [emailError, setemailError] = useState("")
    let history = useHistory();
    const [input, setInput] = useState({
       
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
            email: input.email,
            password: input.password,

        }
        console.log(newUser)
        axios.post("https://postbox01.herokuapp.com/login", newUser)
            .then(async (res) =>{
                const data = await res.data;
                if(data.errors){
                    setemailError(data.errors.email)
                    setpasswordError(data.errors.password)
                }else{
                history.push('./posts')}
                localStorage.setItem('token', res.data)
                console.log(res)
            })
            
            .catch(error => {
                console.log(error);
            });
            
            
    }
    return (
        <div className="createUser">
            <form className="SignUp">
                <h1 id="h2">Log in</h1>
                <div className="Input">
                    <label form="Email" placeholder="Enter Email" className="email"></label>
                    <input onChange={handleChange} name='email' value={input.email} placeholder="Email" className="form-control" id="Email" />
                </div>
                <div className="Input">
                    <label form="password" ></label>
                    <input type="password" onChange={handleChange} name='password' placeholder="Password" value={input.password} className="form-control" id="password" />
                </div>
                <button onClick={handleClick} type="submit" className="btn1">Log In</button>
            </form>
        </div>
    )






}

export default Login
