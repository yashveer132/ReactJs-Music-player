import React from 'react';
import { useNavigate } from 'react-router-dom';
import './signout.css';

export default function Signout({handleLogout}) {

    const navigate = useNavigate();

    const handleCancel = () => {
        navigate('/')
    }
    const handleContinue = () => {
        handleLogout();
    }
  return (
    <div className='screen-container signout flex'>
      <div className='color'></div>
      <div className='color'></div>
      <div className='color'></div>
      <div className='signout-box'>
        <p>You're about to signed out of Cryptic</p>
        <div className='signout-btn'>
            <button onClick={handleContinue}>Log Out</button>
            <button onClick={handleCancel}>Cancel</button>
        </div>
      </div>
    </div>
  )
}
