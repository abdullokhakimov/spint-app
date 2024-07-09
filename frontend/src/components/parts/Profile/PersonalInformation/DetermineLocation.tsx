import React, { useState } from 'react';
import { YMaps, Map, Placemark } from '@pbe/react-yandex-maps';

type DetermineLocationProps = {
	actualHomeCoordinates: [number, number] | null;
	setHomeCoordinates: (coords: [number, number]) => void;
};

const DetermineLocation: React.FC<DetermineLocationProps> = ({ actualHomeCoordinates, setHomeCoordinates }) => {	
	const [placemarkCoords, setPlacemarkCoords] = useState<[number, number] | null>(actualHomeCoordinates);

	const handleMapClick = (e: any) => {
		const coords = e.get('coords');
		setPlacemarkCoords(coords);
		setHomeCoordinates(coords);
	};

	const handlePlacemarkDragEnd = (e: any) => {
		const newCoords = e.get('target').geometry.getCoordinates();
		setPlacemarkCoords(newCoords);
		setHomeCoordinates(newCoords);
	};

	return (
		<YMaps query={{ apikey: '6718d3a3-3fc5-44ac-b05b-d726531d8892', lang: 'ru_RU' }}>
			<Map
			style={{
				width: '100%',
				height: '300px',
				borderRadius: '18px',
				overflow: 'hidden',
			}}
			onClick={handleMapClick}
			defaultState={{
				center: actualHomeCoordinates !== null ? actualHomeCoordinates : [41.32145360231076, 69.26054294711807],
				zoom: 13,
			}}
			options={{
				restrictMapArea: [
				[41.21995919178839, 68.98802733956808],
				[41.42054917876853, 69.51537108956808],
				],
			}}
			>
			{placemarkCoords && (
				<Placemark
				geometry={placemarkCoords}
				options={{
					draggable: true,
					iconLayout: 'default#image',
					iconImageHref: '/assets/images/map-icon.svg', // Path relative to the public folder
				}}
				onDragEnd={handlePlacemarkDragEnd}
				/>
			)}
			</Map>
		</YMaps>
	);
};

export default DetermineLocation;