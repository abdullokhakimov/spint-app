import { Clusterer, Map, Placemark, YMaps } from "@pbe/react-yandex-maps";
import '../../styles/Maps.css'
import { useLoadFacilityMapCoordinatesQuery } from "../../services/react-query/queries";
import Skeleton from "react-loading-skeleton";
import { Game, Region } from "../../types";
import { useTranslation } from "react-i18next";

function Maps({selectedGameOption, selectedRegionOption, showMapOnMobile}: {selectedGameOption: Game | null, selectedRegionOption: Region | null; showMapOnMobile: boolean;}) {	
	const { t } = useTranslation();
	
	const { isLoading: isLoadingFacilityMapCoordinates, data: facilityMapCoordinates} = useLoadFacilityMapCoordinatesQuery({ selectedGameOption, selectedRegionOption });
	
	return (
		<div className={`map-wrap${showMapOnMobile == true ? " active" : ""}`}>
			{ isLoadingFacilityMapCoordinates 
				?
				<Skeleton className="map-wrap__skeleton"/>
				:
				
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
						<Clusterer
							options={{
								preset: "islands#darkBlueClusterIcons",
								groupByCoordinates: false,
							}}
						>
							{facilityMapCoordinates?.map(( facilityCoordinate ) => (
								<Placemark 
									key={facilityCoordinate.id}
									geometry={facilityCoordinate.address_coordinates.split(',').map(parseFloat)} 
									options={{
										iconLayout: 'default#image',
										iconImageHref: '/assets/images/map-icon.svg', // Path relative to the public folder
									}}
									properties={{
										balloonContentHeader: `<h5 class='map__cluster__title'>${facilityCoordinate.title}</h5>`, 
										balloonContentBody: `<div class='map__cluster__block'><p class='map__cluster__gametype'>${t("home.maps.maps__working__time")}: ${facilityCoordinate.start_time}-${facilityCoordinate.end_time}</p><a href='/facility/${facilityCoordinate.id}' class='map__cluster__btn'>${t("home.maps.maps__detail")}</a></div>`, 
										balloonContentFooter: '',
										hintContent: "<strong>Текст  <s>подсказки</s></strong>"
									}}
									modules={['geoObject.addon.balloon']}
								/>
							))}
						</Clusterer>
					</Map>
				</YMaps>
			}
		</div>
		
	)
}

export default Maps