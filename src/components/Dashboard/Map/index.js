import React, { useState, useEffect, useRef } from 'react';

import ReactMapGL, { FlyToInterpolator, Popup, Layer } from 'react-map-gl';
import Markers from './Markers';
import './styles.css';
import Input from '../Input';
import DropDown from '../DropDown';
import useDataApi from '../../../hooks/useDataApi';




const transitionInterpolator = new FlyToInterpolator()

const Map = (props) => {
	// console.log('Map - props', props);
	const mapRef = useRef({});
	const [viewport, setViewport] = useState({
		width: 0,
		height: 0,
		latitude: 40.973805,
		longitude: 29.017138,
		zoom: 9,
		transitionInterpolator,
		transitionDuration: 2000
	});

	useEffect(() => {
		const height = mapRef.current.clientHeight;
		const width = mapRef.current.clientWidth;
		let latitude;
		let longitude;
		let zoom;
		switch (true) {

			///Bakırköy :40.977448, 28.822524
			//Kadıköy : 40.989672, 29.057947
			//Şişli:41.058175, 28.988526
			case props.activeParks.length === 1:
				latitude = parseFloat(props.activeParks[0].lat)
				longitude = parseFloat(props.activeParks[0].lon)
				zoom = 19
				break

			case props.activeBorough === 'all':
				latitude = 40.973805
				longitude = 29.017138
				zoom = 9
				break

			case props.activeBorough === 'BAKIRKÖY':
				latitude = 40.977448
				longitude = 28.822524
				zoom = 12
				break
			case props.activeBorough === 'SISLI':
				latitude = 41.058175
				longitude = 28.988526
				zoom = 12
				break

			default:
				latitude = 40.973805
				longitude = 29.017138
				zoom = 12
		}

		setViewport({
			...viewport,
			transitionInterpolator,
			transitionDuration: 2000,
			zoom,
			latitude,
			longitude,
			width,
			height
		});

	}, [props.activeParks]);

	const handleViewPort = (nextViewport) => {
		//console.log('handleViewPort', nextViewport);
		setViewport(nextViewport)
	};


	const [showPopup, setShowPopup] = useState(null);

	const markers = () => {
		return props.activeParks.map((park, index) => (
			
			<Markers
				key={index}
				park={park}
				isShowing={props.activeParks.includes(park)

				}


			/>
		
		))
	};





	

	return (


		<div id='boroughs-map' ref={mapRef}>

			<ReactMapGL
				mapboxApiAccessToken={"pk.eyJ1IjoiZXlwdHVuYWhudW5sIiwiYSI6ImNsYTZyMG5sdzBicnAzdnJ4ZXVoMjgxaXIifQ.RVsA59BhVWlTp6e55OO6YQ"}

				// mapboxApiAccessToken={process.env.REACT_APP_MAPBOXACCESSTOKEN}
				//mapStyle='mapbox://styles/mapbox/satellite-v9'
				// mapStyle='mapbox://styles/mapbox/light-v9'
				mapStyle='mapbox://styles/mapbox/dark-v9'
				// mapStyle='mapbox://styles/mapbox/streets-v9'
				// mapStyle='mapbox://styles/shihab-bounce/cjxvmqu4a6hzu1cocdsdfw9ln'
				{...viewport}
				onViewportChange={(nextViewport) => handleViewPort(nextViewport)}
			>

				{markers()}
				{/* {popups()} */}
				
				

				
					

			</ReactMapGL>
		</div>

	);
};

export default Map;

