import Skeleton from "react-loading-skeleton";
import BookingItem from "../../components/parts/BookingItem";
import NotLoggedIn from "../../components/parts/NotLoggedIn";
import { useUserContext } from "../../context/AuthContext";
import { useLoadBookingsQuery } from "../../services/react-query/queries";
import '../../styles/Bookings.css'
// import { sortOwnerBookings, sortUserBookings } from "../../utils";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet-async";
import { sortOwnerOrders } from "../../utils";

function Bookings() {
	const { t } = useTranslation();

    const { user, isAuthenticated } = useUserContext();
	const { isLoading: isLoadingBookings, data: orders } = useLoadBookingsQuery({ id: user.id, is_owner: user.is_owner });

    let content = null;	
	
    if (isAuthenticated) {
        if (isLoadingBookings) {
            content = 
				<section className="bookings">
					<Helmet>
						<title>{t('helmet.bookings.title')}</title>
						<meta name="description" content={t("helmet.bookings.meta__description")} />
						<link rel="canonical" href="https://www.spint.uz" />
					</Helmet>

                    <h3 className="bookings__title">{t("bookings.user__title")}</h3>
                    <ul className="bookings__list__skeleton">
						<Skeleton count={6} className="bookings__list__item__skeleton"/>
                    </ul>
                </section>;
        } else if (orders && orders.length > 0 ) {
			if (user.is_owner == true) {
				const sortedOrders = sortOwnerOrders(orders)
				
				content = (
					<section className="bookings">
						<Helmet>
							<title>{t('helmet.bookings.title')}</title>
							<meta name="description" content={t("helmet.bookings.meta__description")} />
							<link rel="canonical" href="/bookings" />
						</Helmet>

						<h3 className="bookings__title">{t("bookings.owner__title")}</h3>
						<ul className="bookings__list">
							{sortedOrders.map((order, index) => (
								<BookingItem key={index} order={order}/>
							))}
						</ul>
					</section>
				);
			} else{
				// const sortedBookings = sortUserBookings(bookings)
				
				content = (
					<section className="bookings">
						<Helmet>
							<title>{t('helmet.bookings.title')}</title>
							<meta name="description" content={t("helmet.bookings.meta__description")} />
							<link rel="canonical" href="https://www.spint.uz" />
						</Helmet>

						<h3 className="bookings__title">{t("bookings.user__title")}</h3>
						<ul className="bookings__list">
							{orders.map((order, index) => (
								<BookingItem key={index} order={order}/>
							))}
						</ul>
					</section>
				);
			}
        } else {
            content = 	<div className="bookings__noresult">
							<Helmet>
								<title>{t('helmet.bookings.title')}</title>
								<meta name="description" content={t("helmet.bookings.meta__description")} />
								<link rel="canonical" href="https://www.spint.uz" />
							</Helmet>

							<img src="/assets/images/no-results-img.png" alt="" />

							<h3>{t("bookings.noresult.title")}</h3>

							<p>{t("bookings.noresult.subtitle")}</p>
						</div>;
        }
    } else {
        content = 
			<>
				<Helmet>
					<title>{t('helmet.bookings.title')}</title>
					<meta name="description" content={t("helmet.bookings.meta__description")} />
					<link rel="canonical" href="https://www.spint.uz" />
				</Helmet>

				<NotLoggedIn />
			</>;
    }

    return content;
}

export default Bookings;
