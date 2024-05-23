import { useUserContext } from "../../context/AuthContext";
import NotLoggedIn from "../../components/parts/NotLoggedIn";
import { useAcceptInvitationMutation, useLoadNotificationsQuery, useRejectInvitationMutation } from "../../services/react-query/queries";
import '../../styles/Notifications.css'
import { formatDateTime } from "../../utils";
import { useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import { useTranslation } from "react-i18next";

function Notifications() {
	const { t } = useTranslation();

	const { user, isAuthenticated } = useUserContext();
	
	const { isLoading: isLoadingBookings, data: notifications, refetch: refetchNotifications } = useLoadNotificationsQuery({ id: user.id });

	const { mutateAsync: mutateAcceptInvitation, status: acceptInvitationStatus } = useAcceptInvitationMutation();	
	const { mutateAsync: mutateRejectInvitation, status: rejectInvitationStatus } = useRejectInvitationMutation();	
	
	useEffect(() => {
        if (acceptInvitationStatus === 'success' || rejectInvitationStatus === 'success') {
            refetchNotifications();
        }
    }, [acceptInvitationStatus, rejectInvitationStatus, refetchNotifications]);
	
	return isAuthenticated === true ? (
		<section className="notifications">
			<h3 className="notifications__title">{t("notifications.title")}</h3>
			{ isLoadingBookings === true ? (
				<ul className="notifications__list__skeleton">
					<Skeleton count={6} className="notifications__list__skeleton__item"/>
				</ul>
			) : notifications == undefined || notifications == null || notifications.length < 1 ? (
				<div className="notifications__noresult">
					<img src="/assets/images/no-results-img.png" alt="" />

					<h3>{t("notifications.noresult.title")}</h3>

					<p>{t("notifications.noresult.subtitle")}</p>
				</div>
			) : (
				<ul className="notifications__list">
					{ notifications.map((notification, index) => (
						<li className="notifications__list__item" key={index}>
							<div className="notifications__list__item__header">
								<h5 className="notifications__list__item__header__title">{t("notifications.item.title")}</h5>

								<span className="notifications__list__item__header__datetime">{ formatDateTime(notification.created_at) }</span>
							</div>
							
							<div className="notifications__list__item__content">
								<span dangerouslySetInnerHTML={{ __html: notification.message }}></span>

								{notification.type == "invite_user_action" ? (
									<div className="notifications__list__item__content__buttons">
										<button onClick={() => {mutateAcceptInvitation({ invitationID: notification.invitation})}} className={`notifications__list__item__content__buttons__accept ${acceptInvitationStatus === 'pending' ? 'disabled' : ''}`} disabled={acceptInvitationStatus === 'pending' || rejectInvitationStatus === 'pending'}>{acceptInvitationStatus === 'pending' ? `${t("notifications.item.accepting")}...` : t("notifications.item.accept")}</button>
										<button onClick={() => {mutateRejectInvitation({ invitationID: notification.invitation})}} className={`notifications__list__item__content__buttons__reject ${rejectInvitationStatus === 'pending' ? 'disabled' : ''}`} disabled={rejectInvitationStatus === 'pending' || acceptInvitationStatus === 'pending'}>{acceptInvitationStatus === 'pending' ? `${t("notifications.item.rejecting")}...` : t("notifications.item.reject")}</button>
									</div>
								) : (
									null
								)}
							</div>
						</li>
					))}
				</ul>	
			)}
			
		</section>
	) : (
		<NotLoggedIn/>
	)
}

export default Notifications