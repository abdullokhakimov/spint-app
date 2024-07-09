import { useState } from "react";
import { typeInitialStateUpdatedUser } from "../../../../types";
import Modal from "../../../ui/Modal";
import { useTranslation } from "react-i18next";

const sports = [ 'Football', 'Basketball', 'Tennis', 'Volleyball', 'Billiard', 'Golf', 'Bowling', 'Table_Tennis' ];

const levels = ['Beginner', 'Intermediate', 'Advanced'];

function ChangeFavoriteSports({ actualFavoriteSports, updatedUser, setUpdatedUser }: { actualFavoriteSports: { name: string; level: 'Beginner' | 'Intermediate' | 'Advanced'; }[] | null; updatedUser: typeInitialStateUpdatedUser; setUpdatedUser: any; }) {
	const { t } = useTranslation();

	const [showFavoriteSportsModal, setShowFavoriteSportsModal] = useState(false);
	const [favoriteSports, setFavoriteSports] = useState<{ name: string; level: 'Beginner' | 'Intermediate' | 'Advanced'; }[]>(actualFavoriteSports || []);
	const [selectedSport, setSelectedSport] = useState('');
	const [selectedLevel, setSelectedLevel] = useState('');

	const addSport = (sport: string, level: 'Beginner' | 'Intermediate' | 'Advanced') => {
		if (sport && level && favoriteSports.length < 3) {
			setFavoriteSports([...favoriteSports, { name: sport, level }]);
			setSelectedSport('');
			setSelectedLevel('');
		}
	};

	const removeSport = (sportToRemove: string) => {
		setFavoriteSports(favoriteSports.filter(sport => sport.name !== sportToRemove));
	};
	
	const availableSports = sports.filter(sport => !favoriteSports.some(s => s.name === sport));
	
	return (
		<div className="personal-information__item">
			<button onClick={() => setShowFavoriteSportsModal(prev => !prev)} className="personal-information__item__button">
				<div className="personal-information__item__button__text">
					<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
						<g clipPath="url(#clip0_806_1662)">
						<path d="M1.96282 16.8808C1.95643 16.8743 1.95009 16.8678 1.94379 16.8613M5.01496 17.4947C5.01008 17.4968 5.00488 17.498 5 17.5M5 17.5C4.56983 17.6766 4.10023 17.7441 3.62556 17.6895C3.1455 17.6342 2.69848 17.4591 2.31696 17.1841L1.94379 16.8613M5 17.5L5.42868 17.2799C6.40509 16.6636 6.65863 15.7295 6.71524 15.238C6.79131 14.5775 6.62859 13.9438 6.29631 13.4226L6.02095 13.0596C5.58158 12.5685 4.96841 12.2295 4.26376 12.1483C3.40867 12.05 2.7457 12.3535 2.34484 12.635L1.99492 12.9246C1.53687 13.3708 1.24824 13.9559 1.17408 14.5998C1.11784 15.088 1.15163 16.0436 1.94379 16.8613M18.4521 11.1881C18.1173 10.9525 17.7504 10.7376 17.3619 10.5495C16.9515 10.3508 16.5225 10.1862 16.0868 10.0598L16.0828 10.0582C15.9607 10.0229 15.8384 9.99082 15.7159 9.96154C15.8705 9.36772 15.9493 8.75446 15.9493 8.13499C15.9493 4.15068 12.7078 0.90918 8.72348 0.90918C4.73917 0.90918 1.4977 4.15068 1.4977 8.13499C1.4977 9.50909 1.88144 10.8355 2.60988 11.9884C2.37496 12.0959 2.15136 12.2325 1.94379 12.3971C1.2702 12.9315 0.845033 13.6964 0.746652 14.5505C0.543564 16.3139 1.81295 17.9138 3.57633 18.1169C4.45276 18.2179 5.35141 17.963 6.06245 17.3432C6.19237 17.4838 9.43308 20.1543 13.9464 18.2846C15.7564 17.5349 17.125 16.3372 18.0141 14.7245C18.2341 14.3255 18.4216 13.9035 18.572 13.4706C18.7136 13.0632 18.8212 12.652 18.8914 12.2486C18.9623 11.8419 18.7898 11.4256 18.4521 11.1881ZM18.4675 12.1748C18.4336 12.3695 18.3904 12.5664 18.3384 12.7637L18.1386 13.4057C18.0528 13.6446 17.955 13.8796 17.8461 14.1086L17.5866 14.6065C16.7448 16.0862 15.4654 17.1897 13.7818 17.8872C12.3104 18.4967 10.8352 18.6655 9.39545 18.3903L8.88082 18.2721C8.6538 18.2114 8.42888 18.1395 8.20819 18.0574L7.64442 17.8205C7.03967 17.5374 6.47803 17.1655 6.36701 17.0391C6.60954 16.7631 6.80126 16.4496 6.93588 16.11L7.122 15.435C7.16458 15.1711 7.21167 14.6896 7.05876 14.1064C7.0772 14.0734 7.09531 14.0402 7.11429 14.0073L7.39493 13.5605C7.68646 13.1313 8.02421 12.7331 8.40135 12.3763C8.6082 12.1806 8.3123 11.868 8.10567 12.0637C7.67689 12.4694 7.29538 12.9251 6.97171 13.4183L6.96971 13.4221C6.93604 13.4735 6.90302 13.5255 6.8704 13.578C6.81084 13.4486 6.74233 13.3239 6.6666 13.204C6.05539 10.633 6.41736 8.96886 6.79929 7.42432C7.08215 6.28048 7.3092 5.3595 6.62325 4.51303C7.58583 3.89292 8.25358 3.68507 8.70764 3.54392C10.5566 5.95332 10.9283 8.51699 10.9602 10.3088C10.5794 10.4532 10.0631 10.6749 9.50536 11.0081C9.25826 11.1556 9.48445 11.5218 9.72599 11.3775C11.0355 10.5951 13.2845 9.73509 15.8622 10.4435L16.3977 10.6119C16.6366 10.6969 16.872 10.794 17.1015 10.9022L17.6968 11.2148C17.8732 11.3177 18.0429 11.4263 18.2045 11.54C18.4067 11.6822 18.5099 11.9314 18.4675 12.1748ZM15.2942 9.87273C15.1264 9.84209 14.9583 9.81709 14.7899 9.79772C14.7348 7.25637 13.4059 5.73269 12.4782 4.61714C12.0377 4.08763 11.6478 3.61806 11.4202 3.15088C12.4921 3.20501 13.3342 3.53712 14.0634 3.93659C14.9747 5.09315 15.519 6.55168 15.519 8.13499C15.519 8.72469 15.443 9.30818 15.2942 9.87273ZM11.3889 10.1577C11.345 8.45898 10.9804 5.87977 9.15072 3.41661C9.8129 3.24234 10.4075 3.15932 10.947 3.14537C11.1813 3.72999 11.6315 4.27209 12.1474 4.89227C13.1332 6.07756 14.2977 7.47855 14.3607 9.76054C13.3763 9.70291 12.3828 9.83536 11.3889 10.1577ZM13.2959 3.11214C12.6636 2.87243 11.9968 2.72561 11.2566 2.70727C11.1704 2.34745 11.2034 2.02415 11.2432 1.82399C12.0048 2.12916 12.6989 2.56819 13.2959 3.11214ZM10.8344 1.67548C10.7829 1.89957 10.7314 2.27708 10.817 2.71137C10.22 2.73669 9.57472 2.84282 8.86296 3.04625C8.24767 2.28743 7.66597 1.77644 7.30047 1.48979C7.75956 1.39157 8.23552 1.33943 8.72348 1.33943C9.46008 1.33943 10.1695 1.45771 10.8344 1.67548ZM6.76421 1.62779C6.9907 1.78567 7.67084 2.294 8.41796 3.18334C7.97286 3.33007 7.31305 3.54458 6.32021 4.19614C5.50525 3.45668 4.57322 3.31918 3.91204 3.34079C4.69679 2.55323 5.67312 1.95693 6.76421 1.62779ZM3.48086 3.81586C3.99208 3.73469 5.05425 3.68864 5.95516 4.44847C3.67719 6.10096 2.63639 8.39878 2.21152 10.0816C2.02472 9.45545 1.92795 8.80131 1.92795 8.13499C1.92795 6.49609 2.51114 4.99085 3.48086 3.81586ZM2.48851 10.8422C2.68043 9.73927 3.44366 6.76942 6.26607 4.75515C6.84613 5.44263 6.66689 6.16752 6.38163 7.32104C6.07119 8.5765 5.67447 10.1835 6.07892 12.5115C5.60149 12.0871 4.99443 11.7994 4.313 11.7209C3.87237 11.6701 3.4354 11.7101 3.0229 11.8335C2.81665 11.5163 2.63768 11.1851 2.48851 10.8422Z" stroke="#242424"/>
						<path d="M8.91142 11.8805C9.03023 11.8805 9.12654 11.7841 9.12654 11.6653C9.12654 11.5465 9.03023 11.4502 8.91142 11.4502C8.7926 11.4502 8.69629 11.5465 8.69629 11.6653C8.69629 11.7841 8.7926 11.8805 8.91142 11.8805Z" stroke="#242424" strokeWidth="0.5"/>
						<path d="M15.166 11.4899C14.6965 11.5669 14.2196 11.6709 13.738 11.8002L13.597 11.4597C13.4881 11.197 13.0905 11.3612 13.1995 11.6244L13.3212 11.9182C12.8166 12.0683 12.3073 12.246 11.7959 12.4511L11.6785 12.1676C11.5696 11.9044 11.1722 12.0696 11.281 12.3323L11.3984 12.6156C10.8924 12.832 10.4063 13.0665 9.94301 13.3173L9.82137 13.0236C9.71219 12.7601 9.31519 12.9259 9.42383 13.1883L9.56474 13.5285C9.27737 13.6941 8.99972 13.8663 8.73255 14.0445C8.49286 14.2044 8.73761 14.5585 8.97128 14.4024C9.21556 14.2395 9.4691 14.0819 9.73101 13.9296L9.89265 14.32C10.0015 14.5826 10.3996 14.4196 10.2902 14.1554L10.1086 13.7169C10.5706 13.4651 11.0565 13.2299 11.563 13.0131L11.7498 13.464C11.8586 13.7266 12.2567 13.5636 12.1473 13.2994L11.9606 12.8486C12.4726 12.6434 12.9822 12.4663 13.4866 12.3176L13.6683 12.7561C13.7772 13.0189 14.1751 12.8555 14.0658 12.5915L13.9041 12.2011C14.3533 12.0823 14.7978 11.9863 15.2357 11.9145C15.5164 11.8684 15.4473 11.4439 15.166 11.4899Z" stroke="#242424" strokeWidth="0.5"/>
						</g>
						<defs>
						<clipPath id="clip0_806_1662">
						<rect width="20" height="20" fill="white"/>
						</clipPath>
						</defs>
					</svg>

					<span>
						{updatedUser?.favorite_sports?.length === 0 
							? t("profile.personal_information.change_favorite_sports.title") 
							: updatedUser?.favorite_sports?.map(sport => t(`profile.personal_information.change_favorite_sports.sports.${sport.name}`)).join(', ')}
					</span>
				</div>

				<svg className="personal-information__item__button__arrow" width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M1.5 13L7.26 7L1.5 1" stroke="#171717" strokeWidth="1.5" />
				</svg>
			</button>

			<Modal showModal={showFavoriteSportsModal} onModalClose={() => setShowFavoriteSportsModal(false)} title={t("profile.personal_information.change_favorite_sports.title")}>
				<div className="personal-information__item__modal">
					<p className="personal-information__item__modal__subtitle">{t("profile.personal_information.change_favorite_sports.subtitle")}</p>

					{favoriteSports.length < 3 && (
						<div className="personal-information__select-favorite-sports">
							<div className="personal-information__select-favorite-sports__field">
								<select
									className="personal-information__select-favorite-sports__input"
									value={selectedSport}
									onChange={(e) => setSelectedSport(e.target.value)}
								>
									<option value="">{t("profile.personal_information.change_favorite_sports.select_sport")}</option>
									{availableSports.map(sport => (
									<option key={sport} value={sport}>{t(`profile.personal_information.change_favorite_sports.sports.${sport}`)}</option>
									))}
								</select>

								<svg className="personal-information__select-favorite-sports__arrow" width="10" height="15" viewBox="0 0 10 15" fill="none" xmlns="http://www.w3.org/2000/svg">
									<path d="M1.46997 9.52002L4.99997 13.04L8.52997 9.52002" stroke="#A3A4A7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
									<path d="M1.46997 4.52L4.99997 1L8.52997 4.52" stroke="#A3A4A7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
								</svg>
							</div>

							<div className={`personal-information__select-sports-level__field ${selectedSport && 'active'}`}>
								<select
									className="personal-information__select-sports-level__input"
									value={selectedLevel}
									onChange={(e) => {
										setSelectedLevel(e.target.value);
										if (e.target.value) {
											addSport(selectedSport, e.target.value as 'Beginner' | 'Intermediate' | 'Advanced');
										}
									}}
								>
									<option value="">{t("profile.personal_information.change_favorite_sports.select_level")}</option>
									{levels.map(level => (
										<option key={level} value={level}>{t(`profile.personal_information.change_favorite_sports.levels.${level}`)}</option>
									))}
								</select>

								<svg className="personal-information__select-sports-level__arrow" width="10" height="15" viewBox="0 0 10 15" fill="none" xmlns="http://www.w3.org/2000/svg">
									<path d="M1.46997 9.52002L4.99997 13.04L8.52997 9.52002" stroke="#A3A4A7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
									<path d="M1.46997 4.52L4.99997 1L8.52997 4.52" stroke="#A3A4A7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
								</svg>
							</div>
						</div>
					)}

					{favoriteSports.length > 0 && (
						<div className="personal-information__selected-sports">
							<h2 className="personal-information__selected-sports__title">{t("profile.personal_information.change_favorite_sports.selected_sports__title")}</h2>

							{favoriteSports.map(sport => (
								<div key={sport.name} className="personal-information__selected-sports__item">
									<div className="personal-information__selected-sports__item__content">
										<p className="personal-information__selected-sports__item__content__sport">
											<span className="personal-information__selected-sports__item__content__sport__name">{t("profile.personal_information.change_favorite_sports.sports.title")}</span>
											<span className="personal-information__selected-sports__item__content__sport__info">{t(`profile.personal_information.change_favorite_sports.sports.${sport.name}`)}</span>
										</p>

										<p className="personal-information__selected-sports__item__content__level">
											<span className="personal-information__selected-sports__item__content__level__name">{t("profile.personal_information.change_favorite_sports.levels.title")}</span>
											<span className="personal-information__selected-sports__item__content__level__info">{t(`profile.personal_information.change_favorite_sports.levels.${sport.level}`)}</span>
										</p>
									</div>
									
									<button
										 className="personal-information__selected-sports__item__remove"
										onClick={() => removeSport(sport.name)}
									>
										<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
											<path d="M15.75 4.48486C13.2525 4.23736 10.74 4.10986 8.235 4.10986C6.75 4.10986 5.265 4.18486 3.78 4.33486L2.25 4.48486" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
											<path d="M6.375 3.7275L6.54 2.745C6.66 2.0325 6.75 1.5 8.0175 1.5H9.9825C11.25 1.5 11.3475 2.0625 11.46 2.7525L11.625 3.7275" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
											<path d="M14.1373 6.85498L13.6498 14.4075C13.5673 15.585 13.4998 16.5 11.4073 16.5H6.5923C4.4998 16.5 4.4323 15.585 4.3498 14.4075L3.8623 6.85498" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
											<path d="M7.74756 12.375H10.2451" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
											<path d="M7.125 9.375H10.875" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
										</svg>
									</button>
								</div>
							))}
						</div>
					)}

					<button
						onClick={() => {
						setUpdatedUser((prevUser: typeInitialStateUpdatedUser) => ({
							...prevUser,
							favorite_sports: favoriteSports,
						}));
						setShowFavoriteSportsModal(false);
						}}
						disabled={JSON.stringify(updatedUser.favorite_sports) === JSON.stringify(favoriteSports)}
						className={`personal-information__save__button ${JSON.stringify(updatedUser.favorite_sports) === JSON.stringify(favoriteSports) ? 'disabled' : ''}`}
					>
						{t("profile.personal_information.ready__button")}
					</button>
				</div>
			</Modal>
		</div>
	);
}

export default ChangeFavoriteSports;