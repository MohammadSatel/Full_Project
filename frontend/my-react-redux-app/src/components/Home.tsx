import React from 'react';
import './Home.css'; // Importing the CSS for styling

const Home = () => {
  return (
    <div className="page-content">
      
      <h1>Car Rental</h1>

      <br></br>
      <p>We provide the best cars at the best price</p>
      <p>We work with the most trusted car rental suppliers worldwide</p>
      <p>Check out our car collection and book a car today!</p>


      <br></br>
      <img src="/images/image5.png" alt="About Page Image" className="centered-image" width={500}/>

    </div>
  );
};

export default Home;
