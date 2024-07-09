import { useState } from "react";
import { typeInitialStateUpdatedUser } from "../../../../types";
import Modal from "../../../ui/Modal";
import { useTranslation } from "react-i18next";

const freeTimeOptions = ['Morning', 'Day', 'Evening', 'Flexible'];


function ChangeFreeTime({ updatedUser, setUpdatedUser }: { updatedUser: typeInitialStateUpdatedUser; setUpdatedUser: any; }) {
	const { t } = useTranslation();

	const [showFavoriteSportsModal, setShowFavoriteSportsModal] = useState(false);
	const [freeTime, setFreeTime] = useState<string | null>(updatedUser.free_time);
	
	return (
		<div className="personal-information__item">
		<button onClick={() => setShowFavoriteSportsModal(prev => !prev)} className="personal-information__item__button">
			<div className="personal-information__item__button__text">
				<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M18.3333 9.99984C18.3333 14.5998 14.6 18.3332 9.99999 18.3332C5.39999 18.3332 1.66666 14.5998 1.66666 9.99984C1.66666 5.39984 5.39999 1.6665 9.99999 1.6665C14.6 1.6665 18.3333 5.39984 18.3333 9.99984Z" stroke="#171717" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
					<path d="M13.0917 12.65L10.5083 11.1083C10.0583 10.8416 9.69168 10.2 9.69168 9.67497V6.2583" stroke="#171717" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
				</svg>
				
				<span>
					{updatedUser?.free_time !== null
						? t(`profile.personal_information.change_free_time.options.${updatedUser.free_time}`)
						: t("profile.personal_information.change_free_time.title")
					}
				</span>
			</div>

			<svg className="personal-information__item__button__arrow" width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path d="M1.5 13L7.26 7L1.5 1" stroke="#171717" strokeWidth="1.5" />
			</svg>
		</button>

		<Modal showModal={showFavoriteSportsModal} onModalClose={() => setShowFavoriteSportsModal(false)} title={t("profile.personal_information.change_free_time.title")}>
			<div className="personal-information__item__modal">
				<p className="personal-information__item__modal__subtitle">{t("profile.personal_information.change_free_time.subtitle")}</p>

				<div className="personal-information__select-favorite-sports__field">
					<select
					className="personal-information__select-favorite-sports__input"
					value={freeTime ?? ""}
					onChange={(e) => setFreeTime(e.target.value || null)}
					>
						<option value="">{t("profile.personal_information.change_free_time.button__title")}</option>
						
						{freeTimeOptions.map(option => (
							<option key={option} value={option}>{t(`profile.personal_information.change_free_time.options.${option}`)}</option>
						))}
					</select>
					<svg className="personal-information__select-favorite-sports__arrow" width="10" height="15" viewBox="0 0 10 15" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M1.46997 9.52002L4.99997 13.04L8.52997 9.52002" stroke="#A3A4A7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
						<path d="M1.46997 4.52L4.99997 1L8.52997 4.52" stroke="#A3A4A7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
					</svg>
				</div>

				<button
					onClick={()=> {
						setUpdatedUser((prevUser: any) => ({
							...prevUser,
							free_time: freeTime,
						}));
						setShowFavoriteSportsModal(false)}
					}
					disabled={JSON.stringify(updatedUser.free_time) === JSON.stringify(freeTime)}
					className={`personal-information__save__button ${JSON.stringify(updatedUser.free_time) === JSON.stringify(freeTime) ? 'disabled' : ''}`}
				>
					{t("profile.personal_information.ready__button")}
				</button>
			</div>
		</Modal>
    </div>
  );
}

export default ChangeFreeTime;