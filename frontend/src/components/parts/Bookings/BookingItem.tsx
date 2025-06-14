import { useEffect, useState } from "react"
import { FilteredOrder } from "../../../types"
import { Link } from "react-router-dom";
import { calculateHourDifference, formatDate, getNextHour, hideEmail } from "../../../utils";
import Modal from "../../ui/Modal";
import debounce from 'lodash.debounce';
import { useCreateInvitationMutation, useExcludeInvitationMutation, useLoadBookingsQuery, useLoadSearchedUsersQuery } from "../../../services/react-query/queries";
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { useUserContext } from "../../../context/AuthContext";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";
import BookingSearchUsersSkeleton from "./BookingSearchUsersSkeleton";

function BookingItem ({ order }: { order: FilteredOrder;}) {
	const { t } = useTranslation();
    
	const { user } = useUserContext();

	const [showInvitedUsersModal, setShowInvitedUsersModal] = useState(false);
	const [isFocused, setIsFocused] = useState(false);
	const [searchQuery, setSearchQuery] = useState('');
	const debouncedSearch = debounce(setSearchQuery, 700);
	
	const { refetch: refetchBookings } = useLoadBookingsQuery({ id: user.id, is_owner: user.is_owner });
	const { data: searchedUsers, isLoading: isLoadingSearchedUsers } = useLoadSearchedUsersQuery({ searchQuery })
	
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
			{ user.is_owner == false ? (
				<span className={`bookings__item__role ${user.id == order.user ? 'organizer' : 'participant'}`}>{user.id == order.user ? t("bookings.item.organizer") : t("bookings.item.participant")}</span>
			) : null}

			<Link to={`/facility/${order.facility_id}`} className="bookings__item__title">
				{ order.facility_title } {order.room_title}
			</Link>

			<ul className="bookings__item__info__list">
				<li className="bookings__item__info__list__item">
					<span>{t("bookings.item.owner__info__user")}:</span>

					<span>{ order.id }</span>
				</li>

				<li className="bookings__item__info__list__item">
					<span>{t("bookings.item.date")}:</span>
					<span>{ formatDate(order.date) }</span>
				</li>
				<li className="bookings__item__info__list__item">
					<span>{t("bookings.item.time")}:</span>

					<span>{order.time[0]} - {getNextHour(order.time[order.time.length - 1])} { calculateHourDifference(order.time[0], getNextHour(order.time[order.time.length - 1])) }</span>
					
				</li>
				<li className="bookings__item__info__list__item">
					<span>{t("bookings.item.payment")}:</span>

					<span>{ order.status == "deposit" ? t("bookings.item.deposit") : order.status == "full" ? t("bookings.item.deposit") : "Error" }</span>
				</li>
				<li className="bookings__item__info__list__item">
					<span>{t("bookings.item.sum")}:</span>
					<span>{ order.total_price.toLocaleString('en-US').replace(/,/g, ' ') } {t("others.som")}</span>
				</li>
				<li className="bookings__item__info__list__item">
					<span>{t("bookings.item.state")}:</span>
					<span>{ order.is_finished == true ? t("bookings.item.finished") : order.is_finished == false ? t("bookings.item.not_finished") : "Error" }</span>
				</li>
			</ul>

			{ user.is_owner == false && order.is_finished == true ? (
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
						<CopyToClipboard text={`http://spint.uz/bookings/${ order.order_uuid }/`} onCopy={() => setCopied(true)}>
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
						{ order.invited_users.length > 0 ? (
							searchQuery !== '' ? (t("bookings.item.search")) : (t("bookings.item.invited__users"))
						) : (
							t("bookings.item.noone__invited")
						)}
					</h4>
					
					<ul className="bookings__item__invate__modal__main__users__list">
                        { order.invited_users.length > 0 && searchQuery == '' ? (
							order.invited_users.map((invitedUser, index) => (
								<li key={index} className="bookings__item__invate__modal__main__users__item">
									<div className="bookings__item__invate__modal__main__users__item__info">
										<div className="bookings__item__invate__modal__main__users__item__info__logo">
											{invitedUser.logo_url !== null ? (
												<img src={invitedUser.logo_url} alt="" />
											) : (
												<svg width="110" height="110" viewBox="0 0 110 110" fill="none" xmlns="http://www.w3.org/2000/svg">
													<rect width="110" height="110" rx="55" fill="#C9D7FF"/>
													<path d="M91.6141 97.1762C91.6141 83.6941 84.382 81.5512 67.1498 73.8726L66.9713 74.0514C61.0784 80.0336 48.6677 79.9443 43.0427 74.1407L42.7748 73.8726C25.5427 81.8193 18.132 83.605 18.3998 97.1762C36.9285 113.143 72.2857 113.928 91.6141 97.1762Z" fill="white"/>
													<path d="M44.382 69.9444C48.2213 76.7301 61.7927 76.8195 65.5427 69.9444V65.5695C68.0856 62.6734 68.6779 60.68 69.6498 57.0874C73.5534 53.371 73.6677 49.6767 71.7034 46.1945C75.4506 34.7268 73.0427 24.1411 64.2927 22.266C53.4891 14.3197 31.0784 20.5695 38.132 46.1945C35.9891 50.391 36.4115 53.1843 40.2749 57.0874C41.131 60.7299 41.7868 62.695 44.382 65.5695V69.9444Z" fill="white"/>
													<path d="M91.6141 97.1762C91.6141 83.6941 84.382 81.5512 67.1498 73.8726L66.9713 74.0514C61.0784 80.0336 48.6677 79.9443 43.0427 74.1407L42.7748 73.8726C25.5427 81.8193 18.132 83.605 18.3998 97.1762C36.9285 113.143 72.2857 113.928 91.6141 97.1762Z" stroke="white"/>
													<path d="M44.382 69.9444C48.2213 76.7301 61.7927 76.8195 65.5427 69.9444V65.5695C68.0856 62.6734 68.6779 60.68 69.6498 57.0874C73.5534 53.371 73.6677 49.6767 71.7034 46.1945C75.4506 34.7268 73.0427 24.1411 64.2927 22.266C53.4891 14.3197 31.0784 20.5695 38.132 46.1945C35.9891 50.391 36.4115 53.1843 40.2749 57.0874C41.131 60.7299 41.7868 62.695 44.382 65.5695V69.9444Z" stroke="white"/>
												</svg>	
											)}
										</div>
										<div className="bookings__item__invate__modal__main__users__item__info__text">
											<span className="bookings__item__invate__modal__main__users__item__info__text__name">
												{invitedUser.username}
											</span>
											<span className="bookings__item__invate__modal__main__users__item__info__text__phone">
												{ invitedUser.phone_number != null ? `+${String(user.phone_number).replace(/(\d{3})(\d{2})(\d{3})(\d{2})(\d{2})/, '$1 $2 $3 $4 $5')}` : invitedUser.email}
											</span>
										</div>
									</div>

									<button 
										onClick={() => {mutateExcludeInvitation({ orderID: order.id, excludeUserID: invitedUser.id })}}
										className={`bookings__item__invate__modal__main__users__item__remove ${user.id !== order.user ? 'disabled' : ""}`}
										disabled={user.id !== order.user}
									>
										{t("bookings.item.exclude")}
									</button>

								</li>
							))
						) : searchQuery !== '' ? (
							isLoadingSearchedUsers == true ? (
								<BookingSearchUsersSkeleton items={4}/>
							) : searchedUsers !== undefined && searchedUsers.length > 0 && isLoadingSearchedUsers == false ? (
								searchedUsers.map((searchedUser, index) => (
									searchedUser.id == user.id ? (
										null
									) : (
										<li key={index} className="bookings__item__invate__modal__main__users__item">
											<div className="bookings__item__invate__modal__main__users__item__info">
												<div className="bookings__item__invate__modal__main__users__item__info__logo">
													{searchedUser.logo_url !== null ? (
														<img src={searchedUser.logo_url} alt="" />
													) : (
														<svg width="30" height="30" viewBox="0 0 110 110" fill="none" xmlns="http://www.w3.org/2000/svg">
															<rect width="110" height="110" rx="55" fill="#C9D7FF"/>
															<path d="M91.6141 97.1762C91.6141 83.6941 84.382 81.5512 67.1498 73.8726L66.9713 74.0514C61.0784 80.0336 48.6677 79.9443 43.0427 74.1407L42.7748 73.8726C25.5427 81.8193 18.132 83.605 18.3998 97.1762C36.9285 113.143 72.2857 113.928 91.6141 97.1762Z" fill="white"/>
															<path d="M44.382 69.9444C48.2213 76.7301 61.7927 76.8195 65.5427 69.9444V65.5695C68.0856 62.6734 68.6779 60.68 69.6498 57.0874C73.5534 53.371 73.6677 49.6767 71.7034 46.1945C75.4506 34.7268 73.0427 24.1411 64.2927 22.266C53.4891 14.3197 31.0784 20.5695 38.132 46.1945C35.9891 50.391 36.4115 53.1843 40.2749 57.0874C41.131 60.7299 41.7868 62.695 44.382 65.5695V69.9444Z" fill="white"/>
															<path d="M91.6141 97.1762C91.6141 83.6941 84.382 81.5512 67.1498 73.8726L66.9713 74.0514C61.0784 80.0336 48.6677 79.9443 43.0427 74.1407L42.7748 73.8726C25.5427 81.8193 18.132 83.605 18.3998 97.1762C36.9285 113.143 72.2857 113.928 91.6141 97.1762Z" stroke="white"/>
															<path d="M44.382 69.9444C48.2213 76.7301 61.7927 76.8195 65.5427 69.9444V65.5695C68.0856 62.6734 68.6779 60.68 69.6498 57.0874C73.5534 53.371 73.6677 49.6767 71.7034 46.1945C75.4506 34.7268 73.0427 24.1411 64.2927 22.266C53.4891 14.3197 31.0784 20.5695 38.132 46.1945C35.9891 50.391 36.4115 53.1843 40.2749 57.0874C41.131 60.7299 41.7868 62.695 44.382 65.5695V69.9444Z" stroke="white"/>
														</svg>	
													)}
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

											<button onClick={() => {mutateCreateInvitation({ senderID: user.id, receiverID: searchedUser.id, orderID: order.id})}} className={`bookings__item__invate__modal__main__users__item__add ${status === 'pending' ? 'disabled' : ''} ${status === 'success' ? 'disabled-success' : ''}`} disabled={status === 'success' || status === 'pending'}>											
													<svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
														<path d="M9.99998 10.0001C12.3012 10.0001 14.1666 8.1346 14.1666 5.83341C14.1666 3.53223 12.3012 1.66675 9.99998 1.66675C7.69879 1.66675 5.83331 3.53223 5.83331 5.83341C5.83331 8.1346 7.69879 10.0001 9.99998 10.0001Z" strokeWidth="1.5"/>
														<path d="M2.84167 18.3333C2.84167 15.1083 6.05001 12.5 10 12.5C10.8 12.5 11.575 12.6083 12.3 12.8083" strokeWidth="1.5"/>
														<path d="M18.3334 15.0001C18.3334 15.2667 18.3 15.5251 18.2334 15.7751C18.1584 16.1084 18.025 16.4334 17.85 16.7167C17.275 17.6834 16.2167 18.3334 15 18.3334C14.1417 18.3334 13.3667 18.0084 12.7834 17.4751C12.5334 17.2584 12.3167 17.0001 12.15 16.7167C11.8417 16.2167 11.6667 15.6251 11.6667 15.0001C11.6667 14.1001 12.025 13.2751 12.6084 12.6751C13.2167 12.0501 14.0667 11.6667 15 11.6667C15.9834 11.6667 16.875 12.0918 17.475 12.7751C18.0084 13.3668 18.3334 14.1501 18.3334 15.0001Z" strokeWidth="1.5"/>
														<path d="M16.2417 14.9834H13.7584" strokeWidth="1.5"/>
														<path d="M15 13.7666V16.2583" strokeWidth="1.5"/>
													</svg>										
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
			) : order.is_finished == false && user.is_owner == false ? (
				<a className="bookings__item__pay" href={`${order.payme_checkout_link}`}>{t("bookings.item.pay")}</a>
			) : null}
		</li>	
	)
}

export default BookingItem