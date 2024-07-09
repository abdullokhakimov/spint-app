import { useState } from "react";
import { useUserContext } from "../../context/AuthContext";
import '../../styles/Profile.css'
import Modal from "../../components/ui/Modal";
import { useTranslation } from "react-i18next";
import { Languages } from "../../types";
import { Helmet } from "react-helmet-async";
import { Oval } from "react-loader-spinner";
import { Link } from "react-router-dom";

function Profile() {
	const { t, i18n } = useTranslation();
	const lngs = {
		ru: { nativeName: 'Русский' },
		uz: { nativeName: "O'zbekcha" }
	};
	
	const { user, isAuthenticated, logout, isLoading } = useUserContext();
	
	const [showAboutModal, setShowAboutModal] = useState(false);
	const [showContactsModal, setShowContactsModal] = useState(false);
	const [showLanguagesModal, setShowLanguagesModal] = useState(false);
	
	return isAuthenticated && !isLoading ? (
		<section className="profile">
			<Helmet>
				<title>{t('helmet.profile.title')}</title>
				<meta name="description" content={t("helmet.profile.meta__description")} />
				<link rel="canonical" href="https://www.spint.uz/profile" />
			</Helmet> 

			<h3 className="profile__title">{t("profile.title")}</h3>

			<div className="profile__info">
				<div className="profile__info__logo">
					{ user.logo_url != null ? (
						<img src={user.logo_url} alt="" />
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
				
				<div className="profile__info__content">
					<span className="profile__username">{user.username}</span>

					{ user.is_owner ? (
						<span className="profile__owner">{t("profile.owner")}</span>
					) : (
						<span className="profile__team">Не в команде</span>
					)}
				</div>
			</div>

			<Link to='/for-partners' className="profile__partners">
				<div className="profile__partners__text">
					<h3>{t("partners.become_partner")}</h3>
					<p>{t("partners.become_partner_subtitle")}</p>
				</div>

				<img className="profile__partners__img" src="/assets/images/partners-img.png" alt="" />
			</Link>
			
			<div className="profile__content">
				<h5 className="profile__content__title">{t("profile.settings")}</h5>
			
				<div className="profile__content__list">
					<Link to={'/profile/personal-information'} className="profile__perosnal-information">
						<div className="profile__perosnal-information__text">
							<svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path d="M11 11.0002C13.5313 11.0002 15.5833 8.94813 15.5833 6.41683C15.5833 3.88552 13.5313 1.8335 11 1.8335C8.4687 1.8335 6.41667 3.88552 6.41667 6.41683C6.41667 8.94813 8.4687 11.0002 11 11.0002Z" stroke="#171717" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
								<path d="M18.8742 20.1667C18.8742 16.6192 15.345 13.75 11 13.75C6.655 13.75 3.12584 16.6192 3.12584 20.1667" stroke="#171717" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
							</svg>
							
							<span>{t("profile.personal_information.title")}</span>
						</div>

						<svg className="profile__perosnal-information__arrow" width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M1.5 13L7.26 7L1.5 1" stroke="#171717" strokeWidth="1.5"/>
						</svg>
					</Link>

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
								
								<span>{t("profile.languages.button")}</span>
							</div>

							<svg className="profile__languages__button__arrow" width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path d="M1.5 13L7.26 7L1.5 1" stroke="#171717" strokeWidth="1.5"/>
							</svg>
						</button>

						<Modal showModal={showLanguagesModal} onModalClose={() => setShowLanguagesModal(false)} title={t("profile.languages.title")}>
							<div className="profile__language__modal">
								{Object.keys(lngs).map((lng, index) => (
									<button key={index} className="profile__language__modal__button" type="submit" onClick={() => {i18n.changeLanguage(lng); setShowLanguagesModal(false)}}>
										{lngs[lng as keyof Languages].nativeName}
									</button>
								))}
							</div>
						</Modal>
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

								<span>© {t("profile.about.company_name")} 2024</span>
							</div>
						</Modal>
					</div>

					<div className="profile__contacts">
						<button onClick={() => { setShowContactsModal((prev) => !prev); }} className="profile__contacts__button">
							<div className="profile__contacts__button__text">
								<svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path d="M19.1712 9.28444C19.1712 4.91617 15.6301 1.375 11.2618 1.375C6.89353 1.375 3.35236 4.91617 3.35236 9.28444" stroke="#242424" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
								<path d="M1.375 13.6721V11.8165C1.375 10.9091 1.99252 10.1183 2.87278 9.89819L4.59264 9.46821C4.96704 9.37458 5.32972 9.65774 5.32972 10.0437V15.4449C5.32972 15.8309 4.96704 16.114 4.59264 16.0204L2.87278 15.5904C1.99252 15.3703 1.375 14.5795 1.375 13.6721Z" stroke="#242424" strokeWidth="1.5"/>
								<path d="M21.1486 13.6721V11.8165C21.1486 10.9091 20.531 10.1183 19.6508 9.89819L17.9309 9.46821C17.5565 9.37458 17.1938 9.65774 17.1938 10.0437V15.4449C17.1938 15.8309 17.5565 16.114 17.9309 16.0204L19.6508 15.5904C20.531 15.3703 21.1486 14.5795 21.1486 13.6721Z" stroke="#242424" strokeWidth="1.5"/>
								<path d="M19.1713 16.2051V16.6994C19.1713 17.7915 18.286 18.6768 17.1939 18.6768H13.7335" stroke="#242424" strokeWidth="1.5"/>
								<path d="M12.7448 20.1604H9.7788C8.95974 20.1604 8.29578 19.4964 8.29578 18.6774C8.29578 17.8583 8.95974 17.1943 9.7788 17.1943H12.7448C13.5639 17.1943 14.2279 17.8583 14.2279 18.6774C14.2279 19.4964 13.5639 20.1604 12.7448 20.1604Z" stroke="#242424" strokeWidth="1.5"/>
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
				</div>
			</div>

			<button onClick={() => logout()} className="profile__logout">
				{t("profile.logout")}
			</button>

		</section>
	) : !isAuthenticated && !isLoading ? (
		<section className="profile">
			<Helmet>
				<title>{t('helmet.profile.title')}</title>
				<meta name="description" content={t("helmet.profile.meta__description")} />
				<link rel="canonical" href="/profile" />
			</Helmet>

			<h3 className="profile__title">{t("profile.title")}</h3>

			<div className="profile__logo">
				<svg width="110" height="110" viewBox="0 0 110 110" fill="none" xmlns="http://www.w3.org/2000/svg">
				<rect width="110" height="110" rx="55" fill="#C9D7FF"/>
				<path d="M91.6141 97.1762C91.6141 83.6941 84.382 81.5512 67.1498 73.8726L66.9713 74.0514C61.0784 80.0336 48.6677 79.9443 43.0427 74.1407L42.7748 73.8726C25.5427 81.8193 18.132 83.605 18.3998 97.1762C36.9285 113.143 72.2857 113.928 91.6141 97.1762Z" fill="white"/>
				<path d="M44.382 69.9444C48.2213 76.7301 61.7927 76.8195 65.5427 69.9444V65.5695C68.0856 62.6734 68.6779 60.68 69.6498 57.0874C73.5534 53.371 73.6677 49.6767 71.7034 46.1945C75.4506 34.7268 73.0427 24.1411 64.2927 22.266C53.4891 14.3197 31.0784 20.5695 38.132 46.1945C35.9891 50.391 36.4115 53.1843 40.2749 57.0874C41.131 60.7299 41.7868 62.695 44.382 65.5695V69.9444Z" fill="white"/>
				<path d="M91.6141 97.1762C91.6141 83.6941 84.382 81.5512 67.1498 73.8726L66.9713 74.0514C61.0784 80.0336 48.6677 79.9443 43.0427 74.1407L42.7748 73.8726C25.5427 81.8193 18.132 83.605 18.3998 97.1762C36.9285 113.143 72.2857 113.928 91.6141 97.1762Z" stroke="white"/>
				<path d="M44.382 69.9444C48.2213 76.7301 61.7927 76.8195 65.5427 69.9444V65.5695C68.0856 62.6734 68.6779 60.68 69.6498 57.0874C73.5534 53.371 73.6677 49.6767 71.7034 46.1945C75.4506 34.7268 73.0427 24.1411 64.2927 22.266C53.4891 14.3197 31.0784 20.5695 38.132 46.1945C35.9891 50.391 36.4115 53.1843 40.2749 57.0874C41.131 60.7299 41.7868 62.695 44.382 65.5695V69.9444Z" stroke="white"/>
				</svg>

				<Link className="profile__logo__login" to='/login'>{t("authentication.login")}</Link>
			</div>

			<Link to='/for-partners' className="profile__partners">
				<div className="profile__partners__text">
					<h3>{t("partners.become_partner")}</h3>
					<p>{t("partners.become_partner_subtitle")}</p>
				</div>

				<img className="profile__partners__img" src="/assets/images/partners-img.png" alt="" />
			</Link>

			<div className="profile__content">
				<h5 className="profile__content__title">{t("profile.settings")}</h5>
			
				<div className="profile__content__list">
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
								
								<span>{t("profile.languages.button")}</span>
							</div>

							<svg className="profile__languages__button__arrow" width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path d="M1.5 13L7.26 7L1.5 1" stroke="#171717" strokeWidth="1.5"/>
							</svg>
						</button>

						<Modal showModal={showLanguagesModal} onModalClose={() => setShowLanguagesModal(false)} title={t("profile.languages.title")}>
							<div className="profile__language__modal">
								{Object.keys(lngs).map((lng, index) => (
									<button key={index} className="profile__language__modal__button" type="submit" onClick={() => {i18n.changeLanguage(lng); setShowLanguagesModal(false)}}>
										{lngs[lng as keyof Languages].nativeName}
									</button>
								))}
							</div>
						</Modal>
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

								<span>© {t("profile.about.company_name")} 2024</span>
							</div>
						</Modal>
					</div>

					<div className="profile__contacts">
						<button onClick={() => { setShowContactsModal((prev) => !prev); }} className="profile__contacts__button">
							<div className="profile__contacts__button__text">
								<svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path d="M19.1712 9.28444C19.1712 4.91617 15.6301 1.375 11.2618 1.375C6.89353 1.375 3.35236 4.91617 3.35236 9.28444" stroke="#242424" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
								<path d="M1.375 13.6721V11.8165C1.375 10.9091 1.99252 10.1183 2.87278 9.89819L4.59264 9.46821C4.96704 9.37458 5.32972 9.65774 5.32972 10.0437V15.4449C5.32972 15.8309 4.96704 16.114 4.59264 16.0204L2.87278 15.5904C1.99252 15.3703 1.375 14.5795 1.375 13.6721Z" stroke="#242424" strokeWidth="1.5"/>
								<path d="M21.1486 13.6721V11.8165C21.1486 10.9091 20.531 10.1183 19.6508 9.89819L17.9309 9.46821C17.5565 9.37458 17.1938 9.65774 17.1938 10.0437V15.4449C17.1938 15.8309 17.5565 16.114 17.9309 16.0204L19.6508 15.5904C20.531 15.3703 21.1486 14.5795 21.1486 13.6721Z" stroke="#242424" strokeWidth="1.5"/>
								<path d="M19.1713 16.2051V16.6994C19.1713 17.7915 18.286 18.6768 17.1939 18.6768H13.7335" stroke="#242424" strokeWidth="1.5"/>
								<path d="M12.7448 20.1604H9.7788C8.95974 20.1604 8.29578 19.4964 8.29578 18.6774C8.29578 17.8583 8.95974 17.1943 9.7788 17.1943H12.7448C13.5639 17.1943 14.2279 17.8583 14.2279 18.6774C14.2279 19.4964 13.5639 20.1604 12.7448 20.1604Z" stroke="#242424" strokeWidth="1.5"/>
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

					<Link to='/login' className="profile__login-redirect">
						{t('authentication.login')}
					</Link>
				</div>
			</div>
		</section>
	) : isLoading ? (
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
	) : null
}
 
export default Profile