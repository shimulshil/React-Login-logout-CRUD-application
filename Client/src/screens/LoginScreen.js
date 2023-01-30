import { useState} from 'react';
import {Form, Button} from 'react-bootstrap';
import {useNavigate} from "react-router-dom";
import axios from "axios";


const LoginScreen = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  // const [loginStatus, setLoginStatus]= useState('');

  const navigate = useNavigate();

  
  const submitHandler =async(e) =>{
    e.preventDefault();
    if(!email || !password){
      alert ("please provide value into Email & Password field");
      } else{
          axios.post("http://localhost:5000/api/login",{
               email:email,
              password:password,
          })
          .then((response)=>{
              if(response.data.message){
                  // setLoginStatus(response.data.message)
                  alert("Email & Password Not match");
              }
              else{
                  console.log(response.data[0].name);
                  // alert("Login Successfull");
                  localStorage.setItem('token', response.data[0].token);
                  window.localStorage.setItem("isLoggedin", true);
          setTimeout(()=>{
              // navigate('/home');
              navigate("/", { state: response.data[0].name })
          }, 100);
              }
          })
      }
};

  return (
    <div>
      <Form onSubmit={submitHandler}>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter Your email" 
          value={email}
          onChange={e=>setEmail(e.target.value)}/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" 
          value={password}
          onChange={e=>setPassword(e.target.value)}/>
        </Form.Group>
        {/* <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Check me out" />
        </Form.Group> */}
        <Button variant="primary" type="submit" className='my-3'>
          Submit
        </Button>
        {/* <h3>{loginStatus}</h3> */}
      </Form>
    </div>
  );
}

export default LoginScreen;