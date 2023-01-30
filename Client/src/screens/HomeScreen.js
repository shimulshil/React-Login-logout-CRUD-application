import React, { useEffect} from "react"
import { useNavigate, useLocation } from 'react-router-dom';
import Dashboard from "../pages/DeshBoard";


const HomeScreen = () => {

  const navigate = useNavigate();
  useEffect(()=>{
      if(!localStorage.getItem('token')){
        navigate('/login')
      }
    },[navigate])

    let location = useLocation();
    console.log(location.state);

  return (
    <div>
      {/* <h3>Mr./Mrs. "{location.state}" <br/> Welcome to the Home page</h3> */}
      <h3>Welcome to the Home page</h3>
      <Dashboard/>
    </div>
  )
}

export default HomeScreen;