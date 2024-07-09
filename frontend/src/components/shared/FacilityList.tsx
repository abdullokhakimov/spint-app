import { useEffect, useState } from "react";
import { FacilityFilters, FacilityItem, FacilitySearch } from "../parts"
import FacilityItemSkeleton from "../parts/Home/FacilityItemSkeleton";
import { useLoadFacilitiesInfiniteQuery, useLoadGamesQuery, useLoadRegionsQuery } from "../../services/react-query/queries";
import { useInView } from "react-intersection-observer";
import { FacilityListProps } from "../../types";
import { useTranslation } from "react-i18next";

const FacilityList: React.FC<FacilityListProps> = ({selectedGameOption, setSelectedGameOption, selectedRegionOption, setSelectedRegionOption, showMapOnMobile, setShowMapOnMobile}) => {
	const { t } = useTranslation();

	const { isLoading: isLoadingGames, data: games} = useLoadGamesQuery();
    const { isLoading: isLoadingRegions, data: regions} = useLoadRegionsQuery();
	const [searchQuery, setSearchQuery] = useState('');
	
	const { status, data, fetchNextPage, isFetchingNextPage } = useLoadFacilitiesInfiniteQuery({ searchQuery, selectedGameOption, selectedRegionOption })
	
	const facilities = data?.pages.flatMap(page => page.results) || [];
	
	const { ref, inView } = useInView();
	
	useEffect(() => {
		if (inView) {
			fetchNextPage();
		}
	}, [fetchNextPage, inView]);

	useEffect(() => {
		if (searchQuery !== '') {
			setShowMapOnMobile(false);
		}
	}, [searchQuery]);
	
	return (
		<main className={`main${showMapOnMobile == false ? " active" : ""}`}>
			<section className="filters">
				<FacilitySearch onSearch={setSearchQuery}/>

				<FacilityFilters 
					games={games} 
					regions={regions} 
					isLoadingFiltersData={isLoadingGames || isLoadingRegions}
					selectedGameOption={selectedGameOption}
					setSelectedGameOption={setSelectedGameOption}
					selectedRegionOption={selectedRegionOption}
					setSelectedRegionOption={setSelectedRegionOption}
				/>
			</section>

			{/* <HomeNews/> */}

			<section className="facilities">
				<h3 className="facilities__title">{t("home.facility__list.facilities__title")}</h3>

				<div className="facilities__list">
					{ status === 'pending' ? (
						<FacilityItemSkeleton items={6}/>
					) : !facilities || facilities.length < 1 || (facilities.length === 1 && facilities[0] === undefined) ? (
						<div className="facilities__list__noresults">
							<img className="facilities__list__noresults__image" src="/assets/images/no-results-img.png" alt="Ничего нее найдено" />
						
							<h5 className="facilities__list__noresults__title">{t("home.facility__list.facilities__list__noresults__title")}</h5>
						</div>
					) :
						<FacilityItem facilities={facilities}/>
					}

					<div ref={ref} className="facilities__list__isfetching">{isFetchingNextPage && <FacilityItemSkeleton items={6}/>}</div>
				</div>

			</section>
		</main>
	)
}

export default FacilityList