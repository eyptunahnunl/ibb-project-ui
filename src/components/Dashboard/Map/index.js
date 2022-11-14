import React, { useState, useEffect, useRef } from 'react';

import ReactMapGL, { FlyToInterpolator, Popup, Layer } from 'react-map-gl';
import Markers from './Markers';
import './styles.css';


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

			case props.activeBorough === 'ARNAVUTKÖY':
				latitude = 41.186394
				longitude = 28.738890
				zoom = 11
				break

			case props.activeBorough === 'ATASEHIR':
				latitude = 40.9834436
				longitude = 29.1026657
				zoom = 12
				break
			case props.activeBorough === 'AVCILAR':
				latitude = 41.015347
				longitude = 28.731462
				zoom = 12
				break
			case props.activeBorough === 'BAGCILAR':
				latitude = 41.045647
				longitude = 28.824722
				zoom = 12
				break
			case props.activeBorough === 'BASAKSEHIR':
				latitude = 41.083332
				longitude = 28.816668
				zoom = 12
				break

			case props.activeBorough === 'BAKIRKÖY':
				latitude = 40.977448
				longitude = 28.822524
				zoom = 12
				break
			case props.activeBorough === 'BESIKTAS':
				latitude = 41.043999
				longitude = 29.002001
				zoom = 14
				break
			case props.activeBorough === 'BEYKOZ':
				latitude = 41.132717
				longitude = 29.105690
				zoom = 12
				break
			case props.activeBorough === 'BEYOGLU':
				latitude = 41.036945
				longitude = 28.977501
				zoom = 14
				break
			case props.activeBorough === 'CEKMEKOY':
				latitude = 41.104237
				longitude = 29.317726
				zoom = 11
				break

			case props.activeBorough === 'FATIH':
				latitude = 41.020168
				longitude = 28.933865
				zoom = 13
				break
			case props.activeBorough === 'KARTAL':
				latitude = 40.899651
				longitude = 29.193649
				zoom = 13
				break
			case props.activeBorough === 'MALTEPE':
				latitude = 40.948411
				longitude = 29.1549943
				zoom = 12
				break
			case props.activeBorough === 'PENDIK':
				latitude = 40.879326
				longitude = 29.258135
				zoom = 12
				break
			case props.activeBorough === 'TUZLA':
				latitude = 40.898232
				longitude = 29.359879
				zoom = 11
				break
			case props.activeBorough === 'UMRANIYE':
				latitude = 41.018234
				longitude = 29.127434
				zoom = 12
				break
			case props.activeBorough === 'USKUDAR':
				latitude = 41.032234
				longitude = 29.031939
				zoom = 13
				break
			case props.activeBorough === 'SISLI':
				latitude = 41.058175
				longitude = 28.988526
				zoom = 13
				break
			case props.activeBorough === 'ZEYTINBURNU':
				latitude = 40.990635
				longitude = 28.896139
				zoom = 12
				break

			default:
				latitude = 40.9811925
				longitude = 29.0280335
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

		setViewport(nextViewport)
	};
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
				mapStyle='mapbox://styles/mapbox/dark-v9'
				{...viewport}
				onViewportChange={(nextViewport) => handleViewPort(nextViewport)}
			>
				{markers()}
			</ReactMapGL>
		</div>

	);
};

export default Map;

