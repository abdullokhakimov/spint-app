import { useState } from "react";
import NotLoggedIn from "../../components/parts/NotLoggedIn";
import { useUserContext } from "../../context/AuthContext";
import '../../styles/Profile.css'
import Modal from "../../components/ui/Modal";
import { useTranslation } from "react-i18next";
import { Languages } from "../../types";


function Profile() {
	const { t, i18n } = useTranslation();
	const lngs = {
		ru: { nativeName: 'Русский' },
		uz: { nativeName: "O'zbekcha" }
	};
	
	const { user, isAuthenticated, logout } = useUserContext();

	const [showAboutModal, setShowAboutModal] = useState(false);
	const [showContactsModal, setShowContactsModal] = useState(false);
	const [showLanguagesModal, setShowLanguagesModal] = useState(false);
	
	return isAuthenticated == true ? (
		<section className="profile">
			<h3 className="profile__title">{t("profile.title")}</h3>

			<div className="profile__logo">
				{user.username[0]}
			</div>

			<span className="profile__username">{user.username}</span>

			<div className="profile__location">
				<svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M8.5 9.51277C9.72055 9.51277 10.71 8.52332 10.71 7.30277C10.71 6.08222 9.72055 5.09277 8.5 5.09277C7.27945 5.09277 6.29 6.08222 6.29 7.30277C6.29 8.52332 7.27945 9.51277 8.5 9.51277Z" stroke="#242424" strokeWidth="1.5"/>
					<path d="M2.56416 6.01359C3.95958 -0.120578 13.0475 -0.113494 14.4358 6.02067C15.2504 9.61901 13.0121 12.6648 11.05 14.549C9.62625 15.9232 7.37375 15.9232 5.94291 14.549C3.98791 12.6648 1.74958 9.61192 2.56416 6.01359Z" stroke="#242424" strokeWidth="1.5"/>
				</svg>

				<span>{t("profile.city")}</span>
			</div>
			
			<div className="profile__email">
				<svg
					viewBox="0 0 24 24"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M17 20.5H7c-3 0-5-1.5-5-5v-7c0-3.5 2-5 5-5h10c3 0 5 1.5 5 5v7c0 3.5-2 5-5 5z"
						stroke="#171717"
						strokeWidth={2}
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
					<path
						d="M17 9l-3.13 2.5c-1.03.82-2.72.82-3.75 0L7 9"
						stroke="#171717"
						strokeWidth={2}
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
				</svg>
				<span>{user.email}</span>
			</div>

			<div className="profile__about">
				<button onClick={() => { setShowAboutModal((prev) => !prev); }} className="profile__about__button">
					<div className="profile__about__button__text">
						<svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M8.62745 9.63399L8.48366 10.281C8.67538 10.2092 9.18823 10.0798 9.70588 10.1373C10.2235 10.1948 10.2091 10.7364 10.1373 11L9.3464 13.9477C9.27451 14.5948 9.27451 14.1634 9.20261 15.0981C9.13072 16.0327 10.7843 16.536 11.5752 16.3922C12.2078 16.2771 12.8932 16.0087 13.1569 15.8889L13.3007 15.2418C13.0131 15.3569 12.4139 15.3856 12.1503 15.3856C11.4026 15.4432 11.5033 14.6427 11.6471 14.2353L12.4379 11.2876C12.7255 10.3098 12.4139 9.82571 12.2222 9.70589C11.5033 8.55556 9.27451 9.49019 8.62745 9.63399Z" fill="#242424"/>
							<circle cx="12.0065" cy="6.68633" r="1.36601" fill="#242424"/>
							<circle cx="11" cy="11" r="10.25" stroke="#242424" strokeWidth="1.5"/>
						</svg>

						<span>{t("profile.about.title")}</span>
					</div>

					<svg className="profile__about__button__arrow" width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M1.5 13L7.26 7L1.5 1" stroke="#171717" strokeWidth="1.5"/>
					</svg>
				</button>

				<Modal showModal={showAboutModal} onModalClose={() => setShowAboutModal(false)} title={t("profile.about.title")}>
					<div className="profile__about__modal">
						<div>
							<p>{t("profile.about.paragraph1")}</p>
							<p>{t("profile.about.paragraph2")}</p>
							<p>{t("profile.about.paragraph3")}</p>
						</div>

						<span>© 2024 Spint</span>
					</div>
				</Modal>
			</div>

			<div className="profile__contacts">
				<button onClick={() => { setShowContactsModal((prev) => !prev); }} className="profile__contacts__button">
					<div className="profile__contacts__button__text">
						<svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M20.1401 16.8027C20.1401 17.1327 20.0668 17.4718 19.911 17.8018C19.7551 18.1318 19.5535 18.4435 19.2876 18.7368C18.8385 19.2318 18.3435 19.5893 17.7843 19.8185C17.2343 20.0477 16.6385 20.1668 15.9968 20.1668C15.0618 20.1668 14.0626 19.9468 13.0085 19.4977C11.9543 19.0485 10.9001 18.4435 9.85514 17.6827C8.80098 16.9127 7.80181 16.0602 6.84847 15.116C5.90431 14.1627 5.05181 13.1635 4.29098 12.1185C3.53931 11.0735 2.93431 10.0285 2.49431 8.99266C2.05431 7.94766 1.83431 6.9485 1.83431 5.99516C1.83431 5.37183 1.94431 4.776 2.16431 4.226C2.38431 3.66683 2.73264 3.1535 3.21848 2.69516C3.80514 2.11766 4.44681 1.8335 5.12514 1.8335C5.38181 1.8335 5.63848 1.8885 5.86764 1.9985C6.10598 2.1085 6.31681 2.2735 6.48181 2.51183L8.60848 5.50933C8.77348 5.7385 8.89264 5.94933 8.97514 6.151C9.05764 6.3435 9.10348 6.536 9.10348 6.71016C9.10348 6.93016 9.03931 7.15016 8.91098 7.361C8.79181 7.57183 8.61764 7.79183 8.39764 8.01183L7.70097 8.736C7.60014 8.83683 7.55431 8.956 7.55431 9.10266C7.55431 9.176 7.56348 9.24016 7.58181 9.3135C7.60931 9.38683 7.63681 9.44183 7.65514 9.49683C7.82014 9.79933 8.10431 10.1935 8.50764 10.6702C8.92014 11.1468 9.36014 11.6327 9.83681 12.1185C10.3318 12.6043 10.8085 13.0535 11.2943 13.466C11.771 13.8693 12.1651 14.1443 12.4768 14.3093C12.5226 14.3277 12.5776 14.3552 12.6418 14.3827C12.7151 14.4102 12.7885 14.4193 12.871 14.4193C13.0268 14.4193 13.146 14.3643 13.2468 14.2635L13.9435 13.576C14.1726 13.3468 14.3926 13.1727 14.6035 13.0627C14.8143 12.9343 15.0251 12.8702 15.2543 12.8702C15.4285 12.8702 15.6118 12.9068 15.8135 12.9893C16.0151 13.0718 16.226 13.191 16.4551 13.3468L19.4893 15.501C19.7276 15.666 19.8926 15.8585 19.9935 16.0877C20.0851 16.3168 20.1401 16.546 20.1401 16.8027Z" stroke="#242424" strokeWidth="1.5"/>
						</svg>

						<span>{t("profile.contacts.title")}</span>
					</div>

					<svg className="profile__contacts__button__arrow" width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M1.5 13L7.26 7L1.5 1" stroke="#171717" strokeWidth="1.5"/>
					</svg>
				</button>

				<Modal showModal={showContactsModal} onModalClose={() => setShowContactsModal(false)} title={t("profile.contacts.title")}>
					<div className="profile__contacts__modal__phone">
						<span>{t("profile.contacts.phone")}</span>
						<a href="tel:+998995252055">+998 99 525 20 55</a>
					</div>
					
					<div className="profile__contacts__modal__mail">
						<span>{t("profile.contacts.mail")}</span>
						<a href="mailto:+998995252055">spint.team.uz@gmail.com</a>
					</div>
				</Modal>
			</div>

			<div className="profile__languages">
				<button onClick={() => { setShowLanguagesModal((prev) => !prev); }} className="profile__languages__button">
					<div className="profile__languages__button__text">
						<svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M11 20.1668C16.0626 20.1668 20.1667 16.0628 20.1667 11.0002C20.1667 5.93755 16.0626 1.8335 11 1.8335C5.93739 1.8335 1.83334 5.93755 1.83334 11.0002C1.83334 16.0628 5.93739 20.1668 11 20.1668Z" stroke="#242424" strokeWidth="1.5"/>
							<path d="M7.33333 2.75H8.25C6.4625 8.10333 6.4625 13.8967 8.25 19.25H7.33333" stroke="#242424" strokeWidth="1.5"/>
							<path d="M13.75 2.75C15.5375 8.10333 15.5375 13.8967 13.75 19.25" stroke="#242424" strokeWidth="1.5"/>
							<path d="M2.75 14.6667V13.75C8.10333 15.5375 13.8967 15.5375 19.25 13.75V14.6667" stroke="#242424" strokeWidth="1.5"/>
							<path d="M2.75 8.25029C8.10333 6.46279 13.8967 6.46279 19.25 8.25029" stroke="#242424" strokeWidth="1.5"/>
						</svg>
						
						<span>{lngs[i18n.resolvedLanguage as keyof Languages].nativeName}</span>
					</div>

					<svg className="profile__languages__button__arrow" width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M1.5 13L7.26 7L1.5 1" stroke="#171717" strokeWidth="1.5"/>
					</svg>
				</button>

				<Modal showModal={showLanguagesModal} onModalClose={() => setShowLanguagesModal(false)} title={t("profile.languages.title")}>
					<div className="profile__language__modal">
						{Object.keys(lngs).map((lng, index) => (
							<button key={index} className="profile__language__modal__button" type="submit" onClick={() => i18n.changeLanguage(lng)}>
								{lngs[lng as keyof Languages].nativeName}
							</button>
						))}
					</div>
				</Modal>
			</div>

			<button onClick={() => logout()} className="profile__logout">
				<svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M13.8417 6.93021C13.5575 3.63021 11.8617 2.28271 8.14917 2.28271H8.03C3.9325 2.28271 2.29167 3.92355 2.29167 8.02105V13.9977C2.29167 18.0952 3.9325 19.736 8.03 19.736H8.14917C11.8342 19.736 13.53 18.4069 13.8325 15.1619" stroke="#EB5757" strokeWidth="1.5"/>
					<path d="M8.25 11H18.6817" stroke="#EB5757" strokeWidth="1.5"/>
					<path d="M16.6375 7.92871L19.7083 10.9995L16.6375 14.0704" stroke="#EB5757" strokeWidth="1.5"/>
				</svg>

				<span>{t("profile.logout")}</span>
			</button>
		</section>
	) : (
		<NotLoggedIn/>
	)
}
 
export default Profile