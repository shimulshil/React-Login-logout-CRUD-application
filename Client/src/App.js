import React from 'react';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import {Container} from 'react-bootstrap';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import HomeScreen from './screens/HomeScreen'
import LoginScreen from './screens/LoginScreen'
import SignupScreen from './screens/SignupScreen'
import Dashboard from './pages/DeshBoard'



function App() {

  return (
    <BrowserRouter>
      <Header/>
        <main>
            <Container>
              <Routes>
                <Route path="/" element={<HomeScreen />}></Route> 
                <Route path="/login" element={<LoginScreen />}></Route>
                <Route path="/signup" element={<SignupScreen/>}></Route>
                <Route path="/*" element={<Dashboard />}></Route>
              </Routes>
            </Container>
          </main>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;
