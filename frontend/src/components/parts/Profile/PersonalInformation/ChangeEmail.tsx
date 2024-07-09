import { useTranslation } from "react-i18next";
import { toast } from "sonner";

function ChangeEmail({ actualEmail }: { actualEmail: string; }) {	
	const { t } = useTranslation();

	
	return (
		<div className="personal-information__item">
			<button onClick={() => toast.info(t("toast.profile__personal_information__change_email__info"))} className="personal-information__item__button">
				<div className="personal-information__item__button__text">
					<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M14.1667 17.0832H5.83332C3.33332 17.0832 1.66666 15.8332 1.66666 12.9165V7.08317C1.66666 4.1665 3.33332 2.9165 5.83332 2.9165H14.1667C16.6667 2.9165 18.3333 4.1665 18.3333 7.08317V12.9165C18.3333 15.8332 16.6667 17.0832 14.1667 17.0832Z" stroke="#242424" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
					<path d="M14.1667 7.5L11.5583 9.58333C10.7 10.2667 9.29167 10.2667 8.43334 9.58333L5.83334 7.5" stroke="#242424" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
					</svg>

					<span>{actualEmail}</span>
				</div>
				<svg className="personal-information__item__button__arrow" width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M1.5 13L7.26 7L1.5 1" stroke="#171717" strokeWidth="1.5"/>
				</svg>
			</button>
		</div>
	) 
}

export default ChangeEmail;