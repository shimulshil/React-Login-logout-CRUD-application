import {useState} from 'react';
import {Form, Button} from 'react-bootstrap';
import {useNavigate} from "react-router-dom";
import axios from "axios";

const SignupScreen = () => {

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate();

  const submitHandler = async(e)=>{
    e.preventDefault();

    if(!name || !email || !password)
            alert ("please provide value into each input field");
                       
            else{
                axios.post("http://localhost:5000/api/register", {
                    name,
                    email,
                    password,
                })
                .then((response)=>{
                    if(response.data.message){
                        if(response.data.message==="1"){
                            alert("User name & email exist");
                            setTimeout(()=>{
                                navigate('/signup');
                            }, 500);
                        }
                        else{
                            alert("User added successfully");
                            setTimeout(()=>{
                                navigate('/');
                            }, 500);
                        }
                    }
                 }
                )
            }
  };
  
  return (
    <div>
      <h1>Signup</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control type="name" placeholder="Enter Your Name" 
            value={name} onChange={e=>setName(e.target.value)}/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter Your email" 
            value={email} onChange={e=>setEmail(e.target.value)}/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" 
            value={password} onChange={e=>setPassword(e.target.value)}/>
        </Form.Group>
        {/* <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Check me out" />
        </Form.Group> */}
        <Button variant="primary" type="submit" className='my-3'>Submit</Button>
      </Form>
    </div>
  );
}

export default SignupScreen;