import React from 'react';
import '../features/about/About.css'; // Importing the CSS for styling


const About = () => {
  return (
    <div className="page-content">
      <h1>Best Cars, Best Prices Us</h1>
      <br></br>
      <p>Our mission is to provide the best car rental prices for customers worldwide</p>
      <p>We work with the most trusted car rental suppliers worldwide</p>
      <p>Find the best price for car rental with us</p>

      
      <br></br>
      <img src="/images/image5.png" alt="About Page Image" className="centered-image" width={500}/>

    </div>
  );
};

export default About;
