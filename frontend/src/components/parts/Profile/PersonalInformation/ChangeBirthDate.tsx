import { useEffect, useState } from "react";
import { typeInitialStateUpdatedUser } from "../../../../types";
import Modal from "../../../ui/Modal";
import { useTranslation } from "react-i18next";
import { InputMask } from "@react-input/mask";
import { isValidBirthDate } from "../../../../utils";

function ChangeBirthDate({ actualBirthDate, updatedUser, setUpdatedUser }: { actualBirthDate: string | null; updatedUser: typeInitialStateUpdatedUser, setUpdatedUser: any}) {
    const { t } = useTranslation();
	
	const [ showBirthDateModal, setShowBirthDateModal ] = useState(false);
	
	const [birthDate, setBirthDate] = useState(updatedUser.birth_date !== null ? updatedUser.birth_date : '10.02.2007');
	
	const [isValidDate, setIsValidDate] = useState(false);

    // Effect to check validity of birthDate whenever it changes
    useEffect(() => {
        setIsValidDate(isValidBirthDate(birthDate));
    }, [birthDate]);
	

	return (
		<div className="personal-information__item">
			<button onClick={() => setShowBirthDateModal(prev => !prev)} className="personal-information__item__button">
				<div className="personal-information__item__button__text">
					<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M6.66666 1.6665V4.1665" stroke="#242424" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
						<path d="M13.3333 1.6665V4.1665" stroke="#242424" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
						<path d="M2.91666 7.57471H17.0833" stroke="#242424" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
						<path d="M17.5 7.08317V14.1665C17.5 16.6665 16.25 18.3332 13.3333 18.3332H6.66667C3.75 18.3332 2.5 16.6665 2.5 14.1665V7.08317C2.5 4.58317 3.75 2.9165 6.66667 2.9165H13.3333C16.25 2.9165 17.5 4.58317 17.5 7.08317Z" stroke="#242424" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
						<path d="M13.0789 11.4167H13.0864" stroke="#242424" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
						<path d="M13.0789 13.9167H13.0864" stroke="#242424" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
						<path d="M9.99623 11.4167H10.0037" stroke="#242424" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
						<path d="M9.99623 13.9167H10.0037" stroke="#242424" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
						<path d="M6.91194 11.4167H6.91942" stroke="#242424" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
						<path d="M6.91194 13.9167H6.91942" stroke="#242424" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
					</svg>

					<span>{ updatedUser.birth_date !== null ? updatedUser.birth_date : t("profile.personal_information.change_birth_date__title")}</span>
				</div>

				<svg className="personal-information__item__button__arrow" width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M1.5 13L7.26 7L1.5 1" stroke="#171717" strokeWidth="1.5"/>
				</svg>
			</button>

			<Modal showModal={showBirthDateModal} onModalClose={() => setShowBirthDateModal(false)} title={t("profile.personal_information.change_birth_date__title")}>
				<div className="personal-information__item__modal">
					<p className="personal-information__item__modal__subtitle">{t("profile.personal_information.change_birth_date__subtitle")}</p>
					
					<div className="phonenumber__modal__field">
						<InputMask
							mask="__.__.____"
							replacement={{ _: /\d/ }}
							value={birthDate}
							onChange={(e) => setBirthDate(e.target.value)}
							inputMode="numeric"
							type="tel"
						/>
					</div>

					<button 
						onClick={()=> {
							setUpdatedUser((prevUser: any) => ({
								...prevUser,
								birth_date: birthDate,
							}));
							setShowBirthDateModal(false)}
						}
						disabled={updatedUser.birth_date === birthDate || actualBirthDate == birthDate || !isValidDate}
						className={`personal-information__save__button ${updatedUser.birth_date === birthDate || actualBirthDate == birthDate || !isValidDate ? 'disabled' : ''}`}
					>
						{t("profile.personal_information.ready__button")}
					</button>	
				</div>
			</Modal>
		</div>
	) 
}

export default ChangeBirthDate;