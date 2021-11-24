import React from 'react';

const Navigation = ({ routeChange }) => {
    const body = document.querySelector('body');
    const gradientBg = 'linear-gradient(89deg, #FF5EDF 0%, #04C8DE 100%)';
    return(
        <nav className="end">
            <p onClick={ () => {routeChange('signin'); body.style.background = gradientBg} }
            className="f3 link dim black underline ph3 pointer">Sign Out</p>
        </nav>
    )
}

export default Navigation;