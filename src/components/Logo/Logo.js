import React from 'react';
import Tilt from 'react-tilt';
import brain from './brain.png';
import './Logo.css';

const Logo = () => {
    const body = document.querySelector('body');
    const gradientBg = 'linear-gradient(89deg, #FF5EDF 0%, #04C8DE 100%)';
    return(
        <div className="logo mh4" onClick={ () => body.style.background = gradientBg }>
            <Tilt className="Tilt br2 shadow-2" options={{ max: 35, reverse: 'false' }} style={{ height: 150, width: 150 }}>
                <div className="Tilt-inner pa3">
                    <img style={{ paddingTop: '5px' }} alt="logo" src={ brain } />
                </div>
            </Tilt>
        </div>
    )
}

export default Logo;