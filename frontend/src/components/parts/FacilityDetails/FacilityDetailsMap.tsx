import { Map, Placemark, YMaps } from "@pbe/react-yandex-maps";
import '../../../styles/Maps.css'

function FacilityDetailsMaps({addressCoordinates}: {addressCoordinates: string}) {			
	return (
		<div className="facility-details__map">
			<YMaps
				query={{ apikey: '6718d3a3-3fc5-44ac-b05b-d726531d8892', lang: 'ru_RU' }}
			>
				<Map
					style={{
						width: '100%',
						height: '100%',
						borderRadius: '18px',
						overflow: 'hidden',
					}}
					defaultState={{ 
						center: [41.32145360231076,69.26054294711807], 
						zoom: 13,
					}}
					options={{
						restrictMapArea: [
							[41.21995919178839,68.98802733956808],
							[41.42054917876853,69.51537108956808]
						],
					}} 
				>
					<Placemark 
						geometry={addressCoordinates.split(',').map(parseFloat)} 
						options={{
							iconLayout: 'default#image',
							iconImageHref: '/assets/images/map-icon.svg', // Path relative to the public folder
						}}
					/>
				</Map>
			</YMaps>
		</div>
		
	)
}

export default FacilityDetailsMaps