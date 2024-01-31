import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Login from './components/Login';
import Register from './components/Register';
import Products from './components/Products';
import Reviews from './components/Reviews';
import ForgotPassword from './components/ForgotPassword';
import ManagerComponent from './components/ManagerComponent'; // Import ManagerComponent
import './App.css';


// Main App component where we define the routing for our application
const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/products" element={<Products />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/reviews" element={<Reviews />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/manager-area" element={<ManagerComponent />} /> {/* Add Manager Area route */}
      </Routes>
    </BrowserRouter>
  );
};

// Exporting the App component to be used in other parts of the application
export default App;
