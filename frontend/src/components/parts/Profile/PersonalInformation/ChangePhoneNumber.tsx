import { useEffect, useState } from "react";
import PhoneNumber from "../../../shared/PhoneNumber"
import { useSavePhoneNumberMutation } from "../../../../services/react-query/queries";
import { useUserContext } from "../../../../context/AuthContext";
import { useTranslation } from "react-i18next";

function ChangePhoneNumber() {
	const { t } = useTranslation();

	const { user, checkAuthUser } = useUserContext();

	const [showPhoneNumberModal, setShowPhoneNumberModal] = useState(false);

	const { mutateAsync: mutateSavePhoneNumber, status: statusSavePhoneNumber, reset: resetSavePhoneNumber } = useSavePhoneNumberMutation();
  
	useEffect(() => {
        if (statusSavePhoneNumber == 'success') {
			checkAuthUser();
		}
    }, [statusSavePhoneNumber]);

	return (
		<div>
			<button onClick={() => setShowPhoneNumberModal(prev => !prev)} className="personal-information__item__button">
				<div className="personal-information__item__button__text">
					<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M18.3093 15.2748C18.3093 15.5748 18.2426 15.8832 18.101 16.1832C17.9593 16.4832 17.776 16.7665 17.5343 17.0332C17.126 17.4832 16.676 17.8082 16.1676 18.0165C15.6676 18.2248 15.126 18.3332 14.5426 18.3332C13.6926 18.3332 12.7843 18.1332 11.826 17.7248C10.8676 17.3165 9.9093 16.7665 8.9593 16.0748C8.00097 15.3748 7.09263 14.5998 6.22597 13.7415C5.36763 12.8748 4.59263 11.9665 3.90097 11.0165C3.21763 10.0665 2.66763 9.1165 2.26763 8.17484C1.86763 7.22484 1.66763 6.3165 1.66763 5.44984C1.66763 4.88317 1.76763 4.3415 1.96763 3.8415C2.16763 3.33317 2.4843 2.8665 2.92597 2.44984C3.4593 1.92484 4.04263 1.6665 4.6593 1.6665C4.89263 1.6665 5.12597 1.7165 5.3343 1.8165C5.55097 1.9165 5.74263 2.0665 5.89263 2.28317L7.82597 5.00817C7.97597 5.2165 8.0843 5.40817 8.1593 5.5915C8.2343 5.7665 8.27597 5.9415 8.27597 6.09984C8.27597 6.29984 8.21763 6.49984 8.10097 6.6915C7.99263 6.88317 7.8343 7.08317 7.6343 7.28317L7.00097 7.9415C6.9093 8.03317 6.86763 8.1415 6.86763 8.27484C6.86763 8.3415 6.87597 8.39984 6.89263 8.4665C6.91763 8.53317 6.94263 8.58317 6.9593 8.63317C7.1093 8.90817 7.36763 9.2665 7.7343 9.69984C8.1093 10.1332 8.5093 10.5748 8.94263 11.0165C9.39263 11.4582 9.82597 11.8665 10.2676 12.2415C10.701 12.6082 11.0593 12.8582 11.3426 13.0082C11.3843 13.0248 11.4343 13.0498 11.4926 13.0748C11.5593 13.0998 11.626 13.1082 11.701 13.1082C11.8426 13.1082 11.951 13.0582 12.0426 12.9665L12.676 12.3415C12.8843 12.1332 13.0843 11.9748 13.276 11.8748C13.4676 11.7582 13.6593 11.6998 13.8676 11.6998C14.026 11.6998 14.1926 11.7332 14.376 11.8082C14.5593 11.8832 14.751 11.9915 14.9593 12.1332L17.7176 14.0915C17.9343 14.2415 18.0843 14.4165 18.176 14.6248C18.2593 14.8332 18.3093 15.0415 18.3093 15.2748Z" stroke="#242424" strokeWidth="1.5"/>
					</svg>

					<span>{user.phone_number !== null ? user.phone_number.toString().replace(/(\d{3})(\d{2})(\d{3})(\d{2})(\d{2})/, '+$1 $2 $3 $4 $5') : t("profile.phone.modal__number__title")}</span>
				</div>
				<svg className="personal-information__item__button__arrow" width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M1.5 13L7.26 7L1.5 1" stroke="#171717" strokeWidth="1.5"/>
				</svg>
			</button>

			<PhoneNumber showPhoneNumberModal={showPhoneNumberModal} setShowPhoneNumberModal={setShowPhoneNumberModal} userID={user.id} mutateSavePhoneNumber={mutateSavePhoneNumber} statusSavePhoneNumber={statusSavePhoneNumber} resetSavePhoneNumber={resetSavePhoneNumber}/>
		</div>
	)
}

export default ChangePhoneNumber