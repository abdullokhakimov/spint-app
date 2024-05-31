import { Link } from "react-router-dom";
import { useUserContext } from "../../context/AuthContext";
import { calculateHourDifference, formatDate, getNextHour } from "../../utils";
import { useCreateOrderMutation } from "../../services/react-query/queries";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import Modal from "../ui/Modal";


function FacilityDetailBook({selectedDate, selectedTimeRange, roomPrice, roomID, facilityTitle, roomTitle}: { selectedDate: Date; selectedTimeRange: string[]; roomPrice: number; roomID: number; facilityTitle: string; roomTitle: string;}) {
	const { t } = useTranslation();
	
	const { user, isAuthenticated } = useUserContext();

	const date = () => {
     	const year = selectedDate.getFullYear()
		const month = selectedDate.getMonth()+1;
		const day = selectedDate.getDate();
		return `${year}-${month < 10 ? '0' + month : month}-${day}`
	}
	
	const { mutateAsync: mutateCreateOrder, status } = useCreateOrderMutation();

	const [price, setPrice] = useState(roomPrice);
    const [paymentType, setPaymentType] = useState("full");
    const [paymentOption, setPaymentOption] = useState("payme");

	const [showCheckoutModal, setShowCheckoutsModal] = useState(false);
	
	useEffect(() => {
		if (paymentType == 'deposit' ) {
			if (selectedTimeRange.length <= 1 ) {
				setPrice(Math.round(roomPrice * 0.4));
			}else{
				setPrice(Math.round(roomPrice * selectedTimeRange.length * 0.4));
			}
		}else{
			if (selectedTimeRange.length <= 1 ) {
				setPrice(roomPrice);
			}else{
				setPrice(roomPrice*selectedTimeRange.length)
			}
		}
	}, [selectedTimeRange, paymentType]);
	
	return (
		<div className="facility-details__bron">
			<div className="facility-details__bron__timeduration">
				{isAuthenticated == false ? (
					<Link to="/login"><span>{t("facility__detail.book.login")}</span></Link>	
				) : (
					selectedTimeRange.length > 0 ? (
						<>
							<span>{selectedTimeRange[0]} - {getNextHour(selectedTimeRange[selectedTimeRange.length - 1])}</span>
						
							<span>{ calculateHourDifference(selectedTimeRange[0], getNextHour(selectedTimeRange[selectedTimeRange.length - 1])) }</span>
						</>
					) : user.is_owner == true ? (
						<span>{t("facility__detail.book.owner__permission")}</span>	
					) : (
						<span>{t("facility__detail.book.not__selected")}</span>	
					)
				)}
					
			</div>

			{/* <button onClick={() => {mutateCreateBooking({ user: user.id, room: roomID, date: date(), timeRange: selectedTimeRange})}}  
				className={`facility-details__bron__submit ${!isAuthenticated || selectedTimeRange.length === 0 || status === 'pending' ? 'disabled' : ''}`}
				disabled={!isAuthenticated || selectedTimeRange.length === 0 || status === 'pending' || user.is_owner == true}
			>
				{ status === 'pending' ? (
					<span className="facility-details__bron__submit__text-loading">{t("facility__detail.book.booking")}</span>
				) : (
					<>
						<span className="facility-details__bron__submit__text">{t("facility__detail.book.tobook")}</span>
						{selectedTimeRange.length > 0 ? (
							<span className="facility-details__bron__submit__price">{roomPrice * selectedTimeRange.length} 000 {t("others.som")}</span>
						) : (
							<span className="facility-details__bron__submit__price">{roomPrice} 000 {t("others.som")}</span>
						)}
					</>
				)}
				
			</button> */}

			<button onClick={() => {setShowCheckoutsModal(true)}}  
				className={`facility-details__bron__submit ${!isAuthenticated || selectedTimeRange.length === 0 || status === 'pending' ? 'disabled' : ''}`}
				disabled={!isAuthenticated || selectedTimeRange.length === 0 || status === 'pending' || user.is_owner == true}
			>
				{ status === 'pending' ? (
					<span className="facility-details__bron__submit__text-loading">{t("facility__detail.book.booking")}</span>
				) : (
					<>
						<span className="facility-details__bron__submit__text">{t("facility__detail.book.tobook")}</span>

						<span className="facility-details__bron__submit__price">{price} 000 {t("others.som")}</span>
					</>
				)}
				
			</button>

			<Modal showModal={showCheckoutModal} onModalClose={() => setShowCheckoutsModal(false)} title={t("facility__detail.checkout.title")}>
				<div className="facility-details__ckeckout__payment-type">
					<h4 className="facility-details__ckeckout__payment-type__title">{t("facility__detail.checkout.payment_type__title")}</h4>
					<ul className="facility-details__ckeckout__payment-type__list">
						<li onClick={() => {setPaymentType("deposit")}} className={`facility-details__ckeckout__payment-type__item ${paymentType == 'deposit' ? "active" : ""}`}>
							<h5 className="facility-details__ckeckout__payment-type__item__title">{t("facility__detail.checkout.payment_type__deposit")}</h5>
							<p className="facility-details__ckeckout__payment-type__item__subtitle">{t("facility__detail.checkout.payment_type__deposit__subtitle")}</p>
						</li>

						<li onClick={() => {setPaymentType("full")}} className={`facility-details__ckeckout__payment-type__item ${paymentType == 'full' ? "active" : ""}`}>
							<h5 className="facility-details__ckeckout__payment-type__item__title">{t("facility__detail.checkout.payment_type__full")}</h5>
							<p className="facility-details__ckeckout__payment-type__item__subtitle">{t("facility__detail.checkout.payment_type__full__subtitle")}</p>
						</li>
					</ul>
				</div>

				<div className="facility-details__ckeckout__payment-option">
					<h4 className="facility-details__ckeckout__payment-option__title">{t("facility__detail.checkout.payment_option__title")}</h4>
					<ul className="facility-details__ckeckout__payment-option__list">
						<li onClick={() => {setPaymentOption("payme")}} className={`facility-details__ckeckout__payment-option__item ${paymentOption == 'payme' ? "active" : ""}`}>
							<svg viewBox="0 0 68 22" fill="none" xmlns="http://www.w3.org/2000/svg">
								<g clipPath="url(#clip0_618_1214)">
								<path d="M4.28832 0H60.3924C61.035 0 61.5958 0.257037 61.9113 0.77111L67.5077 9.84918C67.9399 10.5619 67.8582 11.4264 67.2506 12.1391L59.3643 21.2172C58.932 21.7079 58.3712 22 57.7403 22H1.78806C0.678127 22 -0.11635 21.1354 0.0121688 20.0489L2.09183 1.95114C2.22035 0.841211 3.17839 0 4.27664 0" fill="#0CBBBC"/>
								<path d="M37.7614 15.5623L38.626 8.65734C39.2102 8.2601 39.8761 7.94465 40.4369 7.94465C41.173 7.94465 41.5352 8.49377 41.4184 9.44014L40.6589 15.574H43.3228L44.1523 8.87933L44.1757 8.69239C44.7598 8.29516 45.4375 7.95633 46.01 7.95633C46.746 7.95633 47.1082 8.50546 46.9914 9.45182L46.232 15.5856H48.8958L49.7253 8.89101C49.9473 7.02166 48.9893 5.88836 47.2718 5.88836C46.0801 5.88836 44.8183 6.566 43.977 7.18522C43.6149 6.3557 42.8321 5.88836 41.7104 5.88836C40.5888 5.88836 39.5256 6.43748 38.6727 6.99829L38.7896 6.14539H36.301L35.1093 15.574H37.7731L37.7614 15.5623ZM53.4874 9.97758C53.7561 8.72744 54.6557 8.00307 55.7657 8.00307C56.8756 8.00307 57.4832 8.62229 57.4832 9.62707C57.4832 9.74391 57.4832 9.87243 57.4715 9.98926H53.4874V9.97758ZM50.695 11.2394C50.66 13.5995 52.3775 15.7843 55.8825 15.7843C57.1326 15.7843 58.1842 15.5389 59.1305 14.9547L59.3175 12.7349C58.5463 13.2022 57.378 13.5294 56.3615 13.5294C55.0179 13.5294 53.8145 12.9452 53.4757 11.5899H59.9951C60.0886 11.3445 60.1704 10.7604 60.1704 10.1996C60.1704 7.71098 58.7917 5.90004 55.9643 5.90004C53.1369 5.90004 50.7418 7.58246 50.7067 11.2511M18.3201 12.805C18.3201 11.7885 19.5118 11.403 20.7386 11.403H21.9887L21.8018 12.9335C21.276 13.3541 20.3297 13.7864 19.5352 13.7864C18.8225 13.7864 18.3318 13.3892 18.3318 12.805M15.6563 13.0153C15.6329 14.5458 16.883 15.7843 18.7875 15.7843C20.1311 15.7843 21.1125 15.2118 21.6733 14.5926L21.5564 15.5506H24.1268L24.746 10.4449C25.0498 7.92128 24.2203 5.86499 20.9723 5.86499C19.652 5.86499 18.0514 6.16876 17.1868 6.72957L16.9181 8.84428C17.6191 8.47041 18.9744 8.00307 20.2128 8.00307C21.7083 8.00307 22.2341 8.75081 22.1757 9.5336H20.5867C18.2851 9.5336 15.668 10.4215 15.6446 13.0036M8.284 13.2606L8.86817 8.62229C9.44067 8.16664 10.0716 7.9797 10.6441 8.00307C11.7774 8.01475 12.3966 8.92606 12.3966 10.3398C12.3966 12.1741 11.4385 13.7397 9.81454 13.7397C9.30046 13.7397 8.71629 13.5761 8.284 13.2723M4.98926 18.6701H7.62973L8.06201 15.1066C8.48262 15.4221 9.25373 15.7843 10.2351 15.7843C13.2962 15.7843 15.1539 13.0854 15.1539 10.1411C15.1539 7.6292 13.9622 5.87667 11.7423 5.87667C10.6908 5.87667 9.72107 6.21549 8.98501 6.82304L9.07848 6.12203H6.51979L4.98926 18.6584V18.6701ZM32.7375 6.13371L29.8751 12.6531L28.3796 6.13371H25.4354L28.0525 15.5856L26.5219 18.6818H29.4194L35.5883 6.14539H32.7258L32.7375 6.13371Z" fill="white"/>
								</g>
								<defs>
								<clipPath id="clip0_618_1214">
								<rect width="67.7759" height="22" fill="white"/>
								</clipPath>
								</defs>
							</svg>
							
							<h5 className="facility-details__ckeckout__payment-option__item__title">Payme</h5>
						</li>

						<li className={`facility-details__ckeckout__payment-option__item disabled`}>
							<img src="/assets/images/click-logo.png" alt="" />
							
							<h5 className="facility-details__ckeckout__payment-option__item__title">Click Up</h5>
						</li>

						<li className={`facility-details__ckeckout__payment-option__item disabled`}>
							<svg viewBox="0 0 472 175" fill="none" xmlns="http://www.w3.org/2000/svg">
								<g clipPath="url(#clip0_148_495)">
								<rect y="0.5" width="174" height="174" rx="87" fill="#A6FC6F"/>
								<path d="M166.959 5.68649C174.791 13.5181 178.706 17.434 180.174 21.9494C181.464 25.9213 181.464 30.1998 180.174 34.1717C178.706 38.6871 174.791 42.6029 166.959 50.4346L103.049 114.345C95.2172 122.176 91.3013 126.092 86.7859 127.559C82.814 128.85 78.5355 128.85 74.5636 127.559C70.0482 126.092 66.1324 122.176 58.3007 114.345L34.2147 90.2587C26.383 82.427 22.4672 78.5112 21.0001 73.9958C19.7095 70.0239 19.7095 65.7454 21.0001 61.7735C22.4672 57.2581 26.383 53.3422 34.2147 45.5106L98.1248 -18.3995C105.956 -26.2312 109.872 -30.147 114.388 -31.6142C118.36 -32.9047 122.638 -32.9047 126.61 -31.6142C131.125 -30.147 135.041 -26.2312 142.873 -18.3995L166.959 5.68649Z" fill="#7000FF"/>
								<path d="M141.093 87.226C148.925 95.0577 152.841 98.9735 154.308 103.489C155.598 107.461 155.598 111.739 154.308 115.711C152.841 120.227 148.925 124.142 141.093 131.974L77.1831 195.884C69.3515 203.716 65.4356 207.632 60.9202 209.099C56.9483 210.389 52.6698 210.389 48.6979 209.099C44.1825 207.632 40.2667 203.716 32.435 195.884L8.34898 171.798C0.517325 163.967 -3.3985 160.051 -4.86565 155.535C-6.1562 151.563 -6.1562 147.285 -4.86565 143.313C-3.3985 138.798 0.517327 134.882 8.34898 127.05L72.2591 63.14C80.0907 55.3084 84.0066 51.3925 88.522 49.9254C92.4939 48.6348 96.7724 48.6348 100.744 49.9254C105.26 51.3925 109.176 55.3084 117.007 63.14L141.093 87.226Z" fill="#7000FF"/>
								</g>
								<rect x="4.23299" y="4.73299" width="165.534" height="165.534" rx="82.767" stroke="#A6FC6F" strokeWidth="8.46599"/>
								<path d="M111.65 60.731C114.271 61.308 116.807 61.801 119.296 62.4382C121.941 63.1114 124.562 63.929 127.183 64.6623C127.555 64.7705 127.7 64.9148 127.7 65.3356C127.688 73.5229 127.772 81.7223 127.664 89.9097C127.543 98.7102 124.766 106.669 119.416 113.666C113.453 121.469 105.651 126.494 96.105 128.779C92.342 129.68 88.5069 129.981 84.6477 129.752C75.4747 129.211 67.3477 125.977 60.3988 119.978C53.2335 113.811 48.7131 106.044 46.8977 96.7385C46.3808 94.0935 46.1764 91.4125 46.1764 88.7195C46.1644 80.9649 46.1764 73.2224 46.1523 65.4678C46.1523 64.9509 46.3207 64.7705 46.7895 64.6263C51.7908 63.0273 56.8883 61.7649 62.0458 60.8271C62.0939 60.8151 62.142 60.8271 62.2622 60.8151C62.2622 61.0195 62.2622 61.2239 62.2622 61.4162C62.2622 71.1425 62.2262 80.8807 62.2863 90.607C62.3223 95.5122 62.9836 100.357 64.6547 105.01C65.9771 108.701 67.9367 111.995 70.8582 114.664C73.5993 117.153 76.8092 118.728 80.4039 119.497C85.4893 120.591 90.5627 120.507 95.552 118.932C101.443 117.081 105.53 113.161 108.151 107.643C109.558 104.697 110.4 101.572 110.928 98.3615C111.518 94.7908 111.662 91.1841 111.662 87.5773C111.662 78.897 111.662 70.2047 111.662 61.5244C111.65 61.296 111.65 61.0796 111.65 60.731Z" fill="white"/>
								<path d="M94.0847 78.7657C89.2878 78.7657 84.539 78.7657 79.7661 78.7657C79.7661 67.5848 79.7661 56.4158 79.7661 45.2589C81.2569 44.79 91.2474 44.7539 94.0847 45.2228C94.0847 56.4038 94.0847 67.5848 94.0847 78.7657Z" fill="white"/>
								<path d="M368.811 54.7536C368.811 62.3915 364.585 65.9128 358.296 65.9128C352.006 65.9128 347.926 62.4411 347.926 54.7536V29.5586H334.352V55.2496C334.352 71.9884 348.072 78.5599 358.368 78.5599C368.665 78.5599 382.41 71.9884 382.41 55.2496V29.5586H368.835L368.811 54.7536Z" fill="#7000FF"/>
								<path d="M322.913 41.2634V29.5586H278.838V41.2634H304.919L277.77 65.9624V77.6672H324.54V65.9624H295.813L322.913 41.2634Z" fill="#7000FF"/>
								<path d="M450.331 28.6426C441.735 28.6426 435.251 32.2135 432.046 37.6443C428.767 32.2135 421.676 28.6426 414.294 28.6426C399.796 28.6426 392.244 38.0659 392.244 49.7211V77.6687H405.819V51.705C405.819 46.1253 408.684 41.2401 415.265 41.2401C416.601 41.1657 417.961 41.3641 419.199 41.86C420.462 42.356 421.603 43.1 422.551 44.0671C423.498 45.0342 424.226 46.1997 424.712 47.4893C425.173 48.7788 425.392 50.1427 425.295 51.5066V77.6935H438.869V51.4818C438.869 45.9022 442.099 41.1905 448.607 41.1905C455.115 41.1905 458.248 46.1006 458.248 51.6554V77.6191H471.823V49.7459C471.823 38.0907 464.829 28.6674 450.234 28.6674L450.331 28.6426Z" fill="#7000FF"/>
								<path d="M255.282 54.7536C255.282 62.3915 251.056 65.9128 244.815 65.9128C238.574 65.9128 234.398 62.4411 234.398 54.7536V29.5586H220.823V55.2496C220.823 71.9884 234.495 78.5599 244.84 78.5599C255.209 78.5599 268.832 71.9884 268.832 55.2496V29.5586H255.257L255.282 54.7536Z" fill="#7000FF"/>
								<path d="M336.585 137.904V106.732H323.156L323.229 114.32C320.315 109.857 315.167 105.74 306.06 105.74C290.373 105.74 282.335 118.214 282.335 130.687C282.044 143.334 291.15 155.882 305.405 155.882C312.981 155.882 319.829 152.411 323.156 146.459C323.933 148.964 325.488 151.146 327.625 152.659C329.737 154.171 332.287 154.915 334.861 154.766H342.632V143.111H340.471C337.8 143.111 336.585 142.094 336.585 137.928V137.904ZM308.902 143.88C301.228 143.88 295.424 138.449 295.424 130.811C295.424 123.173 301.252 117.941 308.902 117.941C316.867 117.941 322.622 123.223 322.622 130.811C322.622 138.375 316.867 143.88 308.902 143.88Z" fill="#7000FF"/>
								<path d="M248.652 155.932C232.406 155.932 220.823 148.096 220.823 129.002V91.8042H234.398V111.742C238.283 107.824 243.455 105.914 250.886 105.914C267.084 105.914 276.117 117.222 276.117 130.886C276.117 147.179 263.684 155.932 248.749 155.932H248.652ZM248.506 117.842C240.784 117.842 234.932 123.273 234.932 130.911C234.932 138.549 240.736 143.781 248.506 143.781C256.253 143.781 262.227 138.45 262.227 130.911C262.227 123.372 256.472 117.842 248.506 117.842Z" fill="#7000FF"/>
								<path d="M413.227 154.867H426.777V131.284L447.88 154.867H463.908L442.028 130.168L462.208 106.758H446.277L426.753 129.275V91.8794H413.203V154.867H413.227Z" fill="#7000FF"/>
								<path d="M352.395 106.758H365.97V115.388H366.723C367.524 113.776 368.69 112.337 370.196 111.073C371.458 110.031 373.158 108.99 375.319 108.072C377.481 107.155 380.249 106.659 383.673 106.659C386.442 106.659 389.016 107.055 391.444 107.849C393.872 108.643 395.961 109.882 397.758 111.569C399.555 113.255 400.939 115.412 401.959 117.991C402.955 120.571 403.465 123.645 403.465 127.241V154.792H389.89V131.159C389.89 127.043 388.797 123.993 386.612 121.984C384.426 119.975 381.512 118.983 377.942 118.983C373.984 118.983 370.997 120.124 368.981 122.406C366.99 124.687 365.946 127.613 365.946 131.159V154.792H352.371V106.758H352.395Z" fill="#7000FF"/>
								<defs>
								<clipPath id="clip0_148_495">
								<rect y="0.5" width="174" height="174" rx="87" fill="white"/>
								</clipPath>
								</defs>
							</svg>
							
							<h5 className="facility-details__ckeckout__payment-option__item__title">Uzum Bank</h5>
						</li>
					</ul>
				</div>

				<div className="facility-details__ckeckout__booking-info">
					<h4 className="facility-details__ckeckout__booking-info__title">{ facilityTitle } { roomTitle }</h4>

					<div className="facility-details__ckeckout__booking-info__date">
						<span>{ t("facility__detail.checkout.booking_info__date") }</span>
						<span>{ formatDate(date()) }</span>
					</div>

					<div className="facility-details__ckeckout__booking-info__time">
						<span>{ t("facility__detail.checkout.booking_info__time") }</span>
						{selectedTimeRange.length > 0 ? (
							<span>{selectedTimeRange[0]} - {getNextHour(selectedTimeRange[selectedTimeRange.length - 1])} { calculateHourDifference(selectedTimeRange[0], getNextHour(selectedTimeRange[selectedTimeRange.length - 1])) }</span>
						) : (
							<span>Select time</span>
						)}
					</div>
				</div>

				<button onClick={() => {mutateCreateOrder({ user: user.id, room: roomID, date: date(), timeRange: selectedTimeRange, paymentOption: paymentType, totalPrice: price})}}  
					className={`facility-details__bron__submit facility-details__pay__submit ${!isAuthenticated || selectedTimeRange.length === 0 || status === 'pending' ? 'disabled' : ''}`}
					disabled={!isAuthenticated || selectedTimeRange.length === 0 || status === 'pending' || user.is_owner == true}
				>
					{ status === 'pending' ? (
						<span className="facility-details__bron__submit__text-loading">{t("facility__detail.book.booking")}</span>
					) : (
						<>
							<span className="facility-details__bron__submit__text">{t("facility__detail.checkout.pay")}</span>
							
							<span className="facility-details__bron__submit__price">{price} 000 {t("others.som")}</span>
						</>
					)}
				</button>	
			</Modal>
		</div>
	)
}

export default FacilityDetailBook