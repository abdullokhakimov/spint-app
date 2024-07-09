import { useTranslation } from "react-i18next";
import Modal from "../../ui/Modal"
import { FilteredOrder } from "../../../types";
import { Link, useParams } from "react-router-dom";
import { calculateHourDifference, formatDate, getNextHour } from "../../../utils";
import { useUserContext } from "../../../context/AuthContext";
import { useInviteByUuidMutation } from "../../../services/react-query/queries";
import { Oval } from "react-loader-spinner";
import { useEffect } from "react";
import { toast } from "sonner";

function BookingByUuid({ showOrderByUuidModal, setShowOrderByUuidModal, orderByUUID}: { showOrderByUuidModal: boolean; setShowOrderByUuidModal: (newValue: boolean) => void; orderByUUID: FilteredOrder | null | undefined;}) {
	const { t } = useTranslation();

    const { uuid } = useParams<{ uuid: string | undefined}>();

    const { user, isAuthenticated } = useUserContext();

	const { mutateAsync: mutateInviteByUuid, status } = useInviteByUuidMutation();
	
	useEffect(() => {
        if (status == 'success') {
			setShowOrderByUuidModal(false)
		}
    }, [status]);
	
	if (orderByUUID) {
		return (
			<Modal showModal={showOrderByUuidModal} onModalClose={() => setShowOrderByUuidModal(false)} title={t("bookings.by_uuid.title")}>
				<div className="bookings__byuuid__content">
					<li className="bookings__item">
						<Link to={`/facility/${orderByUUID.facility_id}`} className="bookings__item__title">
							{ orderByUUID.facility_title } {orderByUUID.room_title}
						</Link>

						<ul className="bookings__item__info__list">
							<li className="bookings__item__info__list__item">
								<span>{t("bookings.item.owner__info__user")}:</span>

								<span>{ orderByUUID.id }</span>
							</li>

							<li className="bookings__item__info__list__item">
								<span>{t("bookings.item.date")}:</span>
								<span>{ formatDate(orderByUUID.date) }</span>
							</li>
							<li className="bookings__item__info__list__item">
								<span>{t("bookings.item.time")}:</span>

								<span>{orderByUUID.time[0]} - {getNextHour(orderByUUID.time[orderByUUID.time.length - 1])} { calculateHourDifference(orderByUUID.time[0], getNextHour(orderByUUID.time[orderByUUID.time.length - 1])) }</span>
								
							</li>
							<li className="bookings__item__info__list__item">
								<span>{t("bookings.item.payment")}:</span>

								<span>{ orderByUUID.status == "deposit" ? t("bookings.item.deposit") : orderByUUID.status == "full" ? t("bookings.item.deposit") : "Error" }</span>
							</li>
							<li className="bookings__item__info__list__item">
								<span>{t("bookings.item.sum")}:</span>
								<span>{ orderByUUID.total_price.toLocaleString('en-US').replace(/,/g, ' ') } {t("others.som")}</span>
							</li>
							<li className="bookings__item__info__list__item">
								<span>{t("bookings.item.state")}:</span>
								<span>{ orderByUUID.is_finished == true ? t("bookings.item.finished") : orderByUUID.is_finished == false ? t("bookings.item.not_finished") : "Error" }</span>
							</li>
						</ul>
					</li>

					<div className="bookings__byuuid__content__join">
						{ !isAuthenticated ? (
							<Link className="bookings__byuuid__content__join__auth-required" to="/login"><span>{t("facility__detail.book.login")}</span></Link>	
						) : null}	

						<button 
							onClick={() => {mutateInviteByUuid({ senderID: orderByUUID.user, receiverID: user.id, orderID: orderByUUID.id})}} 
							className={`bookings__byuuid__content__join__button ${!isAuthenticated || status == 'pending' ? 'disabled' : ''}`}
							disabled={!isAuthenticated || status == 'pending'}
						>
							{ status == 'pending' ? (
								<Oval
								visible={true}
								height="22"
								width="22"
								color="#fff"
								secondaryColor="#F1F4FD"
								strokeWidth="3"
								ariaLabel="oval-loading"
								wrapperStyle={{}}
								wrapperClass=""
								/>
							) : (
								t("bookings.by_uuid.join")
							)}
						</button>
					</div>

				</div>
			</Modal>
		)	
	}else{
		if (uuid !== undefined) {			
			toast.error(t("toast.booking__byuuid__404__error"))
		}
		return null
	}
	
}

export default BookingByUuid