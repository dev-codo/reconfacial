import React from 'react';
import Tilt from 'react-tilt'; //library 'react-tilt.js'
import faceFunny from './face_funny.png';
import './Logo.css';

const Logo = () => {
	return (
		<div className='ma4 mt0'>
			<Tilt className="Tilt br2 shadow-2" options={{ max : 55 }} style={{ height: 130, width: 130 }} >
			 <div className="Tilt-inner pa3"><img style={{paddingTop: '10px'}} src={faceFunny} alt="logo"/></div>
			</Tilt>
		</div>	
	)
};

export default Logo;