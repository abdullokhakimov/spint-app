import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'


function FacilityItemSkeleton({ items }: { items: number }) {
  	return Array(items).fill(0).map(( _, i ) => (
		<div key={i} className="facilities__item__skeleton">
			<Skeleton className="facilities__item__skeleton__image" />
			
			<Skeleton className="facilities__item__skeleton__title"/>
			<Skeleton count={2} className="facilities__item__skeleton__content"/>
		</div>
	))
}

export default FacilityItemSkeleton