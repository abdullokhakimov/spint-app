import { useState } from "react";
import FacilityList from "../../components/shared/FacilityList";
import Maps from "../../components/parts/Maps";
import { useTranslation } from "react-i18next";
import { Game, Region } from "../../types";
import { Helmet } from "react-helmet-async";


function Home() {
	const { t } = useTranslation();

	const [selectedGameOption, setSelectedGameOption] = useState<Game | null>(null);
	const [selectedRegionOption, setSelectedRegionOption] = useState<Region | null>(null);

	const [showMapOnMobile, setShowMapOnMobile] = useState<boolean>(false);

	return(
		<section className="home-wrapper">
			<Helmet>
				<title>{t('helmet.home.title')}</title>
				<meta name="description" content={t("helmet.home.meta__description")} />
				<link rel="canonical" href="" />
			</Helmet>

			<FacilityList 
				selectedGameOption={selectedGameOption}
				setSelectedGameOption={setSelectedGameOption}
				selectedRegionOption={selectedRegionOption}
				setSelectedRegionOption={setSelectedRegionOption}
				showMapOnMobile={showMapOnMobile}
			/>

			<Maps 
				selectedGameOption={selectedGameOption}
				selectedRegionOption={selectedRegionOption}
				showMapOnMobile={showMapOnMobile}
			/>

			<button onClick={()=>setShowMapOnMobile(!showMapOnMobile)} className="map-list list">
				{ showMapOnMobile == true ? (
					<svg className="map-list__list-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M12 17V19.38C12 21.25 11.25 22 9.37 22H4.62C2.75 22 2 21.25 2 19.38V14.63C2 12.75 2.75 12 4.62 12H7V14.37C7 16.25 7.75 17 9.62 17H12Z" stroke="white" strokeWidth={2}/>
						<path d="M17 12V14.37C17 16.25 16.25 17 14.37 17H9.62C7.75 17 7 16.25 7 14.37V9.62C7 7.75 7.75 7 9.62 7H12V9.37C12 11.25 12.75 12 14.62 12H17Z" stroke="white" strokeWidth={2}/>
						<path d="M22 4.62V9.37C22 11.25 21.25 12 19.37 12H14.62C12.75 12 12 11.25 12 9.37V4.62C12 2.75 12.75 2 14.62 2H19.37C21.25 2 22 2.75 22 4.62Z" stroke="white" strokeWidth={2}/>
					</svg>	
				) : (
					<svg className="map-list__map-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M2.28999 7.77998V17.51C2.28999 19.41 3.63999 20.19 5.27999 19.25L7.62999 17.91C8.13999 17.62 8.98999 17.59 9.51999 17.86L14.77 20.49C15.3 20.75 16.15 20.73 16.66 20.44L20.99 17.96C21.54 17.64 22 16.86 22 16.22V6.48998C22 4.58998 20.65 3.80998 19.01 4.74998L16.66 6.08998C16.15 6.37998 15.3 6.40998 14.77 6.13998L9.51999 3.51998C8.98999 3.25998 8.13999 3.27998 7.62999 3.56998L3.29999 6.04998C2.73999 6.36998 2.28999 7.14998 2.28999 7.77998Z" stroke="white" strokeWidth={2}/>
						<path d="M8.56 4V17" stroke="white" strokeWidth={2}/>
						<path d="M15.73 6.62012V20.0001" stroke="white" strokeWidth={2}/>
					</svg>
				)}
						
				<span>{ showMapOnMobile == true ?  t('home.list__button') : t('home.map__button')}</span>
			</button>
		</section>
	);
}

export default Home