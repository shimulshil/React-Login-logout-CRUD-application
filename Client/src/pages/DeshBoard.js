import { Routes, Link, Route} from "react-router-dom"
import React , { useState, useEffect}from 'react';
import "./DeshBoard.css";
import {toast} from "react-toastify";
import axios from 'axios';
import Add from "./Add";
import View from "./View";
import Update from "./Update";


const Dashboard = () => {
    const [data, setData]= useState([]);

    const loadData = async ()=>{
        const response = await axios.get("http://localhost:5000/api/get/all");
        setData(response.data);
    };

    useEffect(() =>{
        loadData();
    }, []);

    const deleteContact =(id) =>{
        if(window.confirm("Are you sure that you wanted to delete that contact?")){
            axios.delete(`http://localhost:5000/api/remove/${id}`);
            toast.success("Contact Deleted Successfully");
            setTimeout(() => loadData(),500);
        };
    }
  return (
    <div>
      <div style={{marginTop: "50px"}}>
        <h2>React CRUD Application with MySQL</h2>

        <div>
        <Routes>
            <Route path="/addContact" element={<Add />}></Route>
            <Route path="/update/:id" element={<Update/>}></Route>
            <Route path="/view/:id" element={<View/>}></Route>
        </Routes>
      </div>

        <Link to="/addContact">
        <button className='btn btn-contact'>Add Contact</button>
        </Link>
        <table className='styled-table'>
            <thead>
                <tr>
                    <th style={{textAlign: "center"}}>No.</th>
                    <th style={{textAlign: "center"}}>Name</th>
                    <th style={{textAlign: "center"}}>Email</th>
                    <th style={{textAlign: "center"}}>Contact</th>
                    <th style={{textAlign: "center"}}>Action</th>                    
                </tr>
            </thead>
            <tbody>
                {data.map((item, index)=>{
                    return(
                        <tr key={item.id}>
                            <th scope='row'>{index+1}</th>
                            <td>{item.name}</td>
                            <td>{item.email}</td>
                            <td>{item.contact}</td>
                            <td>
                                <Link to={`/update/${item.id}`}>
                                <button className='btn btn-edit'>Edit</button>
                                </Link>
                                <button className='btn btn-delete' onClick={()=>deleteContact(item.id)}>Delete</button>
                                <Link to={`/view/${item.id}`}>
                                <button className='btn btn-view'>View</button>
                                </Link>
                            </td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    </div>
    </div>
  )
}

export default Dashboard;