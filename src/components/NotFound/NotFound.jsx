import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function NotFound() {
  const navigate = useNavigate(); // Retrieve navigate function

  const goToHomePage = () => {
    navigate("/");
  };

  return (
    <div style={{ textAlign: 'center', paddingTop: '50px' }}>
      <div>
      <img style={{height:"25%",width:"35%"}} src={require('../../assets/images/404.jpg')} alt="Page Not Found" />
        <h1 className='text-primary' style={{ fontSize: '2rem', marginBottom: '20px' }}>Page Not Found</h1>
        <img src="" alt="" />
        <button className='mb-3 mt-2' style={{ padding: '10px 20px', fontSize: '1rem', backgroundColor: '#007bff', color: 'white', border: 'none', cursor: 'pointer' }} onClick={goToHomePage}>Go to Home Page</button>
      </div>
    </div>
  );
}
