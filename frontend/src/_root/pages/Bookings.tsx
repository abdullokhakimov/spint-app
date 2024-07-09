import Skeleton from "react-loading-skeleton";
import BookingItem from "../../components/parts/Bookings/BookingItem";
import NotLoggedIn from "../../components/parts/Profile/NotLoggedIn";
import { useUserContext } from "../../context/AuthContext";
import { useLoadBookingsQuery, useLoadOrderByUUIDQuery } from "../../services/react-query/queries";
import '../../styles/Bookings.css'
// import { sortOwnerBookings, sortUserBookings } from "../../utils";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet-async";
import { sortOwnerOrders } from "../../utils";
import { Oval } from "react-loader-spinner";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import BookingByUuid from "../../components/parts/Bookings/BookingByUuid";
import { toast } from "sonner";
import { orderIsEnded } from "../../utils"

function Bookings() {
	const { t } = useTranslation();

    const { user, isAuthenticated, isLoading } = useUserContext();

    const { uuid } = useParams<{ uuid: string | undefined}>();
	const { isLoading: isLoadingOrderByUUID, data: orderByUUID } = useLoadOrderByUUIDQuery({ uuid: uuid });
	const [showOrderByUuidModal, setShowOrderByUuidModal] = useState(false);
	
	useEffect(() => {
		const onLoadingOrderByUUIDCompleted = async () => { 
			if (!isLoadingOrderByUUID && !isLoading && orderByUUID) {	
				if (user.is_owner) {
					toast.error(t('toast.booking__byuuid__owner__error'));

				}else if (orderIsEnded(orderByUUID.date, orderByUUID.time)) {
					toast.error(t('toast.booking__byuuid__late__error'));

				}else if (user.id == orderByUUID.user) {
					toast.error(t('toast.booking__byuuid__organizer__error'));

				}else if (orderByUUID.invited_users.some(user => user.id === user.id)) {
					toast.error(t('toast.booking__byuuid__invited__users__error'));

				}else{
					await new Promise((res) => setTimeout(res, 750));
					setShowOrderByUuidModal(true);					
				}				
			}			
		}
		onLoadingOrderByUUIDCompleted()
    }, [isLoadingOrderByUUID, isLoading]); 
	
	const { isLoading: isLoadingBookings, data: orders } = useLoadBookingsQuery({ id: user.id, is_owner: user.is_owner });

    let content = null;	
	
    if (isAuthenticated && !isLoading && !isLoadingOrderByUUID) {
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

					<BookingByUuid showOrderByUuidModal={showOrderByUuidModal} setShowOrderByUuidModal={setShowOrderByUuidModal} orderByUUID={orderByUUID}/>
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

						<BookingByUuid showOrderByUuidModal={showOrderByUuidModal} setShowOrderByUuidModal={setShowOrderByUuidModal} orderByUUID={orderByUUID}/>
					</section>
				);
			} else{				
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

						<BookingByUuid showOrderByUuidModal={showOrderByUuidModal} setShowOrderByUuidModal={setShowOrderByUuidModal} orderByUUID={orderByUUID}/>
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

							<BookingByUuid showOrderByUuidModal={showOrderByUuidModal} setShowOrderByUuidModal={setShowOrderByUuidModal} orderByUUID={orderByUUID}/>
						</div>;
        }
    } else if (!isAuthenticated && !isLoading && !isLoadingOrderByUUID) {
        content = 
			<>
				<Helmet>
					<title>{t('helmet.bookings.title')}</title>
					<meta name="description" content={t("helmet.bookings.meta__description")} />
					<link rel="canonical" href="https://www.spint.uz" />
				</Helmet>

				<NotLoggedIn />

				<BookingByUuid showOrderByUuidModal={showOrderByUuidModal} setShowOrderByUuidModal={setShowOrderByUuidModal} orderByUUID={orderByUUID}/>
			</>;
    } else if (isLoading || isLoadingOrderByUUID) {
		content = <Oval
			visible={true}
			height="30"
			width="30"
			color="#242424"
			secondaryColor="#A3A4A7"
			strokeWidth="3"
			ariaLabel="oval-loading"
			wrapperStyle={{}}
			wrapperClass="oval-loading"
		/>
	}

    return content;
}

export default Bookings;
