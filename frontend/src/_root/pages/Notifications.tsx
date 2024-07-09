import { useUserContext } from "../../context/AuthContext";
import NotLoggedIn from "../../components/parts/Profile/NotLoggedIn";
import { useAcceptInvitationMutation, useLoadNotificationsQuery, useReadNotificationsMutation, useRejectInvitationMutation } from "../../services/react-query/queries";
import '../../styles/Notifications.css'
import { formatDateTime } from "../../utils";
import { useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import { useTranslation } from "react-i18next";
import { Oval } from "react-loader-spinner";

function Notifications() {
	const { t } = useTranslation();

	const { user, isAuthenticated, isLoading } = useUserContext();
	
	const { isLoading: isLoadingBookings, data: notifications, refetch: refetchNotifications } = useLoadNotificationsQuery({ id: user.id });

	const { mutateAsync: mutateReadNotifications } = useReadNotificationsMutation();

	useEffect(() => {
		if (user?.id || user?.id !== 0) { // Ensure user.id is not null or undefined
            mutateReadNotifications({ userID: user.id });
        }
    }, [mutateReadNotifications, user?.id]); 
	
	
	const { mutateAsync: mutateAcceptInvitation, status: acceptInvitationStatus } = useAcceptInvitationMutation();	
	const { mutateAsync: mutateRejectInvitation, status: rejectInvitationStatus } = useRejectInvitationMutation();	
	
	useEffect(() => {
        if (acceptInvitationStatus === 'success' || rejectInvitationStatus === 'success') {
            refetchNotifications();
        }
    }, [acceptInvitationStatus, rejectInvitationStatus, refetchNotifications]);
	
	return isAuthenticated && !isLoading ? (
		<section className="notifications">
			{ isLoadingBookings === true ? (
				<>
					<h3 className="notifications__title">{t("notifications.title")}</h3>
					
					<ul className="notifications__list__skeleton">
						<Skeleton count={6} className="notifications__list__skeleton__item"/>
					</ul>
				</>
			) : notifications == undefined || notifications == null || notifications.length < 1 ? (
				<div className="notifications__noresult">
					<img src="/assets/images/no-results-img.png" alt="" />

					<h3>{t("notifications.noresult.title")}</h3>

					<p>{t("notifications.noresult.subtitle")}</p>
				</div>
			) : (
				<>
					<h3 className="notifications__title">{t("notifications.title")}</h3>

					<ul className="notifications__list">
						{ notifications.map((notification, index) => (
							<li className="notifications__list__item" key={index}>
								{ notification.is_read == false && (
									<span className="notifications_new"></span>
								)}

								<div className="notifications__list__item__header">
									<h5 className="notifications__list__item__header__title">{t("notifications.item.title")}</h5>

									<span className="notifications__list__item__header__datetime">{ formatDateTime(notification.created_at) }</span>
								</div>
								
								<div className="notifications__list__item__content">
									<span dangerouslySetInnerHTML={{ __html: notification.message }}></span>

									{notification.type == "invite_user_action" ? (
										<div className="notifications__list__item__content__buttons">
											<button 
												onClick={() => {mutateAcceptInvitation({ invitationID: notification.invitation})}} 
												className={`notifications__list__item__content__buttons__accept ${acceptInvitationStatus === 'pending' ? 'disabled' : ''}`} 
												disabled={ acceptInvitationStatus === 'pending' || rejectInvitationStatus === 'pending'}>
													{ acceptInvitationStatus === 'pending' ? 
														<Oval
															visible={true}
															height="20"
															width="20"
															color="#fff"
															secondaryColor="#F1F4FD"
															strokeWidth="3"
															ariaLabel="oval-loading"
															wrapperStyle={{}}
															wrapperClass="button__oval-loading"
														/>
													: 
														t("notifications.item.accept")
													}
											</button>
											<button 
												onClick={() => {mutateRejectInvitation({ invitationID: notification.invitation})}} 
												className={`notifications__list__item__content__buttons__reject ${rejectInvitationStatus === 'pending' ? 'disabled' : ''}`} 
												disabled={ rejectInvitationStatus === 'pending' || acceptInvitationStatus === 'pending'}>
													{ rejectInvitationStatus === 'pending' ? 
														<Oval
															visible={true}
															height="20"
															width="20"
															color="#fff"
															secondaryColor="#F1F4FD"
															strokeWidth="3"
															ariaLabel="oval-loading"
															wrapperStyle={{}}
															wrapperClass="button__oval-loading"
														/>
													: 
														t("notifications.item.reject")
													}
											</button>
										</div>
									) : (
										null
									)}
								</div>
							</li>
						))}
					</ul>
				</>
			)}
			
		</section>
	) : !isAuthenticated && !isLoading ? (
		<NotLoggedIn/>
	) : (
		<Oval
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
	)
}

export default Notifications