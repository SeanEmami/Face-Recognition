import React from 'react';
import Tilt from 'react-tilt';
import Face from './Face.png'
import './Logo.css';


const Logo = () => {
    return (
        <div className='ma2 mt4' style={{display: "flex", justifyContent: "center" }}>
            <Tilt className="Tilt br-100 h3 w3 dib" options={{ max: 65 }} style={{ height: 100, width: 100 }}  >
            <div className="Tilt-inner pa3">  
            <img style={{paddingTop: '3px'}} alt='logo' src={Face}/> 
            </div>
            </Tilt>
        </div>
        );
    }
export default Logo;