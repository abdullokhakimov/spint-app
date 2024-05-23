import Skeleton from "react-loading-skeleton"

function BookingSearchUsersSkeleton({ items }: { items: number }) {
	return Array(items).fill(0).map(( _, i ) => (
		<div key={i} className="bookings__item__invate__modal__main__users__list__item__skeleton">
			<Skeleton className="bookings__item__invate__modal__main__users__list__item__skeleton__logo" />
			<div className="bookings__item__invate__modal__main__users__list__item__skeleton__content">
				<Skeleton className="bookings__item__invate__modal__main__users__list__item__skeleton__title"/>
				<Skeleton className="bookings__item__invate__modal__main__users__list__item__skeleton__email"/>
			</div>
		</div>
	))
}

export default BookingSearchUsersSkeleton