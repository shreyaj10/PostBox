import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Navbar from './components/Navbar'
import Home from './components/Home'
import Posts from './components/Posts'
import CreatePost from './components/CreatePost'
import SignUp from './components/SignUp'
import Login from './components/Login'
import Welcome from './components/Welcome';
import Trending from './components/Trending'
import YourPost from './components/YourPost'
import Menu from './components/Menu';
import PostSuccessful from './components/PostSuccessful';





function App() {
  return (

    <Router>
      <div className="BigContainer">

      <Route path='/welcome'>
      <Navbar/>
      </Route>

    <Route path='/' exact >
      <Home />
    </Route>
    <Route path='/posts'>
      <Navbar/>
      <Posts />
    </Route>
    <Route path='/create'>
      <Navbar/>
      <CreatePost/>
    </Route>
     <Route path='/signup' exact>
      <SignUp/>
    </Route>

    <Route path='/login'>
      <Login/>
    </Route> 
     
    <Route path='/trending'>
      <Navbar/>
      <Trending/>
    </Route>

    <Route path='/yourpost'>
      <Navbar/>
      <YourPost/>
    </Route>

    <Route path='/dropdown'>
      <Navbar/>
      <Menu/>
    </Route>

    <Route path='/success'>
      <Navbar/>
      <PostSuccessful/>
    </Route>
  
  
    </div>
    </Router>
  
   
  )
    
  
}

export default App;
