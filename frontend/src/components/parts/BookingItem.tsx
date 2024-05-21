import { useEffect, useState } from "react"
import { FilteredBooking } from "../../types"
import { Link } from "react-router-dom";
import { formatDate, getNextHour, hideEmail } from "../../utils";
import Modal from "../ui/Modal";
import debounce from 'lodash.debounce';
import { useCreateInvitationMutation, useExcludeInvitationMutation, useLoadSearchedUsersQuery } from "../../services/react-query/queries";
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { useUserContext } from "../../context/AuthContext";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";

function BookingItem ({ booking, refetchBookings }: { booking: FilteredBooking[]; refetchBookings?: () => Promise<void>; }) {
	const { t } = useTranslation();
    
	const { user } = useUserContext();

	const [showInvitedUsersModal, setShowInvitedUsersModal] = useState(false);
	const [isFocused, setIsFocused] = useState(false);
	const [searchQuery, setSearchQuery] = useState('');
	const debouncedSearch = debounce(setSearchQuery, 700);
	
	const { data: searchedUsers, isLoading } = useLoadSearchedUsersQuery({ searchQuery })
	
	const [isCopied, setCopied] = useState(false);

	useEffect(() => {
		const timeout = setTimeout(() => {
		setCopied(false);
		}, 5000);

		return () => clearTimeout(timeout);
	}, [isCopied]);

	const { mutateAsync: mutateCreateInvitation, status } = useCreateInvitationMutation();	

	const { mutateAsync: mutateExcludeInvitation, status: excludeInvitationStatus, data } = useExcludeInvitationMutation();	
	
	useEffect(() => {
        if (excludeInvitationStatus === 'success') {
			toast.success(data.message)
            refetchBookings();
        }
    }, [ excludeInvitationStatus, refetchBookings ]);	
	
	
	return (
		<li className="bookings__item">
			<Link to={`/facility/${booking[0].facility_id}`} className="bookings__item__title">
				{ booking[0].facility_title } {booking[0].room_title}
			</Link>

			<ul className="bookings__item__info__list">
				{ user.is_owner == true ? (
				<li className="bookings__item__info__list__item">
					<span>{t("bookings.item.owner__info__user")}:</span>
					<span>{ booking[0].user }</span>
				</li>
				) : null}

				<li className="bookings__item__info__list__item">
					<span>{t("bookings.item.date")}:</span>
					<span>{ formatDate(booking[0].date) }</span>
				</li>
				<li className="bookings__item__info__list__item">
					<span>{t("bookings.item.time")}:</span>
					{ booking.length == 1 ? (
						<span>{booking[0].time} - {getNextHour(booking[0].time)}</span>
					) : (
						<span>{booking[booking.length - 1].time} - {getNextHour(booking[0].time)}</span>
					)}
					
				</li>
				<li className="bookings__item__info__list__item">
					<span>{t("bookings.item.payment")}:</span>
					<span>Депозит/Полная оплата</span>
				</li>
				<li className="bookings__item__info__list__item">
					<span>{t("bookings.item.sum")}:</span>
					<span>{booking.length * booking[0].room_price} 000 {t("others.som")}</span>
				</li>
			</ul>

			{ user.is_owner == false ? (
			<div className="bookings__item__invate">
				<button onClick={() => { setShowInvitedUsersModal((prev) => !prev); }} className="bookings__item__invate__button">
					<span>{t("bookings.item.invite")}</span>
					<svg
						viewBox="0 0 20 20"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
						d="M10.0002 10.0001C12.3013 10.0001 14.1668 8.1346 14.1668 5.83341C14.1668 3.53223 12.3013 1.66675 10.0002 1.66675C7.69898 1.66675 5.8335 3.53223 5.8335 5.83341C5.8335 8.1346 7.69898 10.0001 10.0002 10.0001Z"
						strokeWidth={2}
						strokeLinecap="round"
						strokeLinejoin="round"
						/>
						<path
						d="M2.50846 18C2.50846 14.775 6.04996 12.5 9.99996 12.5C10.8 12.5 11.575 12.6083 12.3 12.8083"
						strokeWidth={2}
						strokeLinecap="round"
						strokeLinejoin="round"
						/>
						<path
						d="M18.3332 15.0001C18.3332 15.2667 18.2998 15.5251 18.2332 15.7751C18.1582 16.1084 18.0248 16.4334 17.8498 16.7167C17.2748 17.6834 16.2165 18.3334 14.9998 18.3334C14.1415 18.3334 13.3665 18.0084 12.7832 17.4751C12.5332 17.2584 12.3165 17.0001 12.1498 16.7167C11.8415 16.2167 11.6665 15.6251 11.6665 15.0001C11.6665 14.1001 12.0248 13.2751 12.6082 12.6751C13.2165 12.0501 14.0665 11.6667 14.9998 11.6667C15.9832 11.6667 16.8748 12.0918 17.4748 12.7751C18.0082 13.3668 18.3332 14.1501 18.3332 15.0001Z"
						strokeWidth="1.5"
						strokeMiterlimit={10}
						strokeLinecap="round"
						strokeLinejoin="round"
						/>
						<path
						d="M16.2416 14.9834H13.7583"
						stroke="#2628DD"
						strokeWidth="1.5"
						strokeMiterlimit={10}
						strokeLinecap="round"
						strokeLinejoin="round"
						/>
						<path
						d="M15 13.7666V16.2583"
						stroke="#2628DD"
						strokeWidth="1.5"
						strokeMiterlimit={10}
						strokeLinecap="round"
						strokeLinejoin="round"
						/>
					</svg>
				</button>
					
				<Modal showModal={showInvitedUsersModal} onModalClose={() => setShowInvitedUsersModal(false)} title={t("bookings.item.find__user")}>
					<div className="filters__search bookings__item__invate__modal__main__search">
						<svg
							className="filter__search__icon"
							viewBox="0 0 20 20"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
							d="M9.58317 17.5C13.9554 17.5 17.4998 13.9556 17.4998 9.58335C17.4998 5.2111 13.9554 1.66669 9.58317 1.66669C5.21092 1.66669 1.6665 5.2111 1.6665 9.58335C1.6665 13.9556 5.21092 17.5 9.58317 17.5Z"
							strokeLinecap="round"
							strokeLinejoin="round"
							/>
							<path
							d="M18.3332 18.3334L16.6665 16.6667"
							strokeLinecap="round"
							strokeLinejoin="round"
							/>
						</svg>
						<input
							onChange={e => debouncedSearch(e.target.value)} 
							aria-label="Search"
							type="text"
							className="filter__search__input"
							placeholder={t("bookings.item.search")}
							onFocus={() => setIsFocused(true)}
        					onBlur={() => setIsFocused(false)}
						/>
						<CopyToClipboard text="http://spint.uz" onCopy={() => setCopied(true)}>
							<button
								className={`bookings__item__invate__modal__main__search__link ${isFocused ? 'focused' : ''} ${isCopied ? "copied" : ""}`}
							>
								<span>{isCopied ? t("bookings.item.link__copied") : t("bookings.item.invite__by__link")}</span>
								<svg
								width={20}
								height={20}
								viewBox="0 0 20 20"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
								>
								<path
									d="M12.8022 14.7891H13.9977C16.3885 14.7891 18.3518 12.8337 18.3518 10.435C18.3518 8.04414 16.3964 6.08081 13.9977 6.08081H12.8022"
									width="10.08"
									height="10.08"
									stroke="#242424"
									strokeWidth={2}
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
								<path
									d="M8.05998 6.08081H6.87248C4.47373 6.08081 2.51831 8.03623 2.51831 10.435C2.51831 12.8258 4.47373 14.7891 6.87248 14.7891H8.05998"
									width="10.08"
									height="10.08"
									stroke="#242424"
									strokeWidth={2}
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
								<path
									d="M7.26831 10.4351H13.6016"
									stroke="#242424"
									strokeWidth={2}
									strokeLinecap="round"
									width="4.48"
									height="4.48"
									strokeLinejoin="round"
								/>
								</svg>
							</button>
						</CopyToClipboard>
					</div>
					
					<h4 className="bookings__item__invate__modal__main__users-invited__title">
						{booking[0].invited_users.length > 0 ? (
							searchQuery !== '' ? (t("bookings.item.search")) : (t("bookings.item.invited__users"))
						) : (
							t("bookings.item.noone__invited")
						)}
					</h4>
					
					<ul className="bookings__item__invate__modal__main__users__list">
                        { booking[0].invited_users.length > 0 && searchQuery == '' ? (
							booking[0].invited_users.map((invitedUser, index) => (
								<li key={index} className="bookings__item__invate__modal__main__users__item">
									<div className="bookings__item__invate__modal__main__users__item__info">
										<div className="bookings__item__invate__modal__main__users__item__info__logo">
											{invitedUser.username[0]}
										</div>
										<div className="bookings__item__invate__modal__main__users__item__info__text">
											<span className="bookings__item__invate__modal__main__users__item__info__text__name">
												{invitedUser.username}
											</span>
											<span className="bookings__item__invate__modal__main__users__item__info__text__phone">
												{hideEmail(invitedUser.email)}
											</span>
										</div>
									</div>

									<button 
										onClick={() => {mutateExcludeInvitation({ bookingID: booking[0].id, excludeUserID: invitedUser.id })}}
										className="bookings__item__invate__modal__main__users__item__remove"
									>
										{t("bookings.item.exclude")}
									</button>

								</li>
							))
						) : searchQuery !== '' ? (
							searchedUsers?.length > 0 ? (
								searchedUsers.map((searchedUser, index) => (
									searchedUser.id == user.id ? (
										null
									) : (
										<li key={index} className="bookings__item__invate__modal__main__users__item">
											<div className="bookings__item__invate__modal__main__users__item__info">
												<div className="bookings__item__invate__modal__main__users__item__info__logo">
													{searchedUser.username[0]}
												</div>
												<div className="bookings__item__invate__modal__main__users__item__info__text">
													<span className="bookings__item__invate__modal__main__users__item__info__text__name">
														{searchedUser.username}
													</span>
													<span className="bookings__item__invate__modal__main__users__item__info__text__phone">
														{hideEmail(searchedUser.email)}
													</span>
												</div>
											</div>

											<button onClick={() => {mutateCreateInvitation({ senderID: user.id, receiverID: searchedUser.id, bookingID: booking[0].id})}} className={`bookings__item__invate__modal__main__users__item__add ${status === 'pending' ? 'disabled' : ''} ${status === 'success' ? 'disabled-success' : ''}`} disabled={status === 'success' || status === 'pending'}>
												{ status === 'success' ? (
													<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
														<path d="M2 10.1316L6.99412 15.2632L17 5" strokeWidth="2"/>
													</svg>
												) : (
													<svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
														<path d="M9.99998 10.0001C12.3012 10.0001 14.1666 8.1346 14.1666 5.83341C14.1666 3.53223 12.3012 1.66675 9.99998 1.66675C7.69879 1.66675 5.83331 3.53223 5.83331 5.83341C5.83331 8.1346 7.69879 10.0001 9.99998 10.0001Z" strokeWidth="1.5"/>
														<path d="M2.84167 18.3333C2.84167 15.1083 6.05001 12.5 10 12.5C10.8 12.5 11.575 12.6083 12.3 12.8083" strokeWidth="1.5"/>
														<path d="M18.3334 15.0001C18.3334 15.2667 18.3 15.5251 18.2334 15.7751C18.1584 16.1084 18.025 16.4334 17.85 16.7167C17.275 17.6834 16.2167 18.3334 15 18.3334C14.1417 18.3334 13.3667 18.0084 12.7834 17.4751C12.5334 17.2584 12.3167 17.0001 12.15 16.7167C11.8417 16.2167 11.6667 15.6251 11.6667 15.0001C11.6667 14.1001 12.025 13.2751 12.6084 12.6751C13.2167 12.0501 14.0667 11.6667 15 11.6667C15.9834 11.6667 16.875 12.0918 17.475 12.7751C18.0084 13.3668 18.3334 14.1501 18.3334 15.0001Z" strokeWidth="1.5"/>
														<path d="M16.2417 14.9834H13.7584" strokeWidth="1.5"/>
														<path d="M15 13.7666V16.2583" strokeWidth="1.5"/>
													</svg>
												)}
												
											</button>
										</li>
									)	
							))
						) : (
							<div className="users__list__noresults">
								<img className="users__list__noresults__image" src="/assets/images/no-results-img.png" alt="Ничего не найдено" />
							
								<h5 className="users__list__noresults__title">{t("home.facility__list.facilities__list__noresults__title")}</h5>
							</div>
						)   
					) : null}
					</ul>
				</Modal>
					
			</div>
			) : null}
		</li>	
	)
}

export default BookingItem