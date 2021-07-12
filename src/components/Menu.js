import React from 'react'
import {Link} from 'react-router-dom'

function Menu() {
    return (
        <div className="Menu">
            <button className="menuItem"><Link to='/posts' className="menuItem1">Home</Link></button>
            <button className="menuItem"><Link to='/create' className="menuItem1">Create A Post</Link></button>
            <button className="menuItem"><Link to='/yourpost' className="menuItem1">Your Posts</Link></button>
            <button className="menuItem"><Link to='/trending' className="menuItem1">Trending</Link></button>
            <button className="menuItem"><Link to='/login' className="menuItem1">Log Out</Link></button>
            
        </div>
    )
}

export default Menu
