import React from 'react';
import './FaceRecognition.css';

const FaceRecognition = ({imagemSite, boxxx}) => {
	return(
		<div className='center ma'>
			<div className='absolute mt2'>
				<img id='estaImagem' src={imagemSite} alt="" width='500px' height='auto'/>
				<div className='bounding-box' style={{top: boxxx.topRow, right: boxxx.rightCol, bottom: boxxx.bottomRow, left: boxxx.leftCol}}></div>
			</div>
		</div>
	);
};

export default FaceRecognition;