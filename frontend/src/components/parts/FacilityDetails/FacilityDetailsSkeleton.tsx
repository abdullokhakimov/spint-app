import Skeleton from "react-loading-skeleton";

function FacilityDetailsSkeleton() {
	return (
		<div className="facility-details__skeleton">
			<div className="facility-details__skeleton__content">
				<Skeleton className="facility-details__skeleton__image"/>
				<Skeleton className="facility-details__skeleton__tabs"/>

				<div className="facility-details__skeleton__datepicker">
					<Skeleton count={9} className="facility-details__skeleton__date"/>
				</div>

				<div className="facility-details__skeleton__timepicker">
					<Skeleton count={7} className="facility-details__skeleton__time"/>
				</div>

				<div className="facility-details__skeleton__benefits">
					<Skeleton className="facility-details__skeleton__benefits__title"/>
				
					<Skeleton count={4} className="facility-details__skeleton__benefits__content"/>
				</div>
			</div>

			<div className="facility-details__skeleton__map-wrap">
				<Skeleton className="facility-details__skeleton__map"/>
			</div>
			
		</div>
	)
}

export default FacilityDetailsSkeleton