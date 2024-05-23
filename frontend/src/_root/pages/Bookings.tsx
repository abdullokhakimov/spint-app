import Skeleton from "react-loading-skeleton";
import BookingItem from "../../components/parts/BookingItem";
import NotLoggedIn from "../../components/parts/NotLoggedIn";
import { useUserContext } from "../../context/AuthContext";
import { useLoadBookingsQuery } from "../../services/react-query/queries";
import '../../styles/Bookings.css'
import { sortOwnerBookings, sortUserBookings } from "../../utils";
import { useTranslation } from "react-i18next";

function Bookings() {
	const { t } = useTranslation();

    const { user, isAuthenticated } = useUserContext();
	const { isLoading: isLoadingBookings, data: bookings } = useLoadBookingsQuery({ id: user.id });

    let content = null;	
	
    if (isAuthenticated) {
        if (isLoadingBookings) {
            content = 
				<section className="bookings">
                    <h3 className="bookings__title">Брони</h3>
                    <ul className="bookings__list__skeleton">
						<Skeleton count={6} className="bookings__list__item__skeleton"/>
                    </ul>
                </section>;
        } else if (bookings && bookings.length > 0 ) {
			if (user.is_owner == true) {
				const sortedBookings = sortOwnerBookings(bookings)
				
				content = (
					<section className="bookings">
						<h3 className="bookings__title">{t("bookings.owner__title")}</h3>
						<ul className="bookings__list">
							{sortedBookings.map((booking, index) => (
								<BookingItem key={index} booking={booking}/>
							))}
						</ul>
					</section>
				);
			} else{
				const sortedBookings = sortUserBookings(bookings)
				
				content = (
					<section className="bookings">
						<h3 className="bookings__title">{t("bookings.user__title")}</h3>
						<ul className="bookings__list">
							{sortedBookings.map((booking, index) => (
								<BookingItem key={index} booking={booking}/>
							))}
						</ul>
					</section>
				);
			}
        } else {
            content = 	<div className="bookings__noresult">
							<img src="/assets/images/no-results-img.png" alt="" />

							<h3>{t("bookings.noresult.title")}</h3>

							<p>{t("bookings.noresult.subtitle")}</p>
						</div>;
        }
    } else {
        content = <NotLoggedIn />;
    }

    return content;
}

export default Bookings;
