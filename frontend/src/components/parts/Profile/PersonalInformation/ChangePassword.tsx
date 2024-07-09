import { useEffect, useState } from "react";
import Modal from "../../../ui/Modal";
import { useTranslation } from "react-i18next";
import { useResetPasswordMutation } from "../../../../services/react-query/queries";
import { toast } from "sonner";
import { Oval } from "react-loader-spinner";

function ChangePassword({ actualEmail }: { actualEmail: string; }) {
    const { t, i18n } = useTranslation();
	
	const { mutateAsync: mutateResetPassword, status } = useResetPasswordMutation();
	
	const [ showPasswordModal, setShowPasswordModal ] = useState(false);
	
	useEffect(() => {
		if (status === "success" || status === "error") {
			setShowPasswordModal(false);
		}
		if (status === "success") {
			if (i18n.language == 'uz') {
				toast.success(`${actualEmail} ${t("toast.reset__password__success")}`)
			}else{
				toast.success(`${t("toast.reset__password__success")} ${actualEmail}`)
			}
		}else if (status === "error"){
			toast.error(t("toast.reset__password__error"))
		}
	}, [ status ]);
	
	return (
		<div className="personal-information__item">
			<button onClick={() => setShowPasswordModal(prev => !prev)} className="personal-information__item__button">
				<div className="personal-information__item__button__text">
					<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M20.91 11.1198C20.91 16.0098 17.36 20.5898 12.51 21.9298C12.18 22.0198 11.82 22.0198 11.49 21.9298C6.63999 20.5898 3.09 16.0098 3.09 11.1198V6.72979C3.09 5.90979 3.71001 4.97979 4.48001 4.66979L10.05 2.38982C11.3 1.87982 12.71 1.87982 13.96 2.38982L19.53 4.66979C20.29 4.97979 20.92 5.90979 20.92 6.72979L20.91 11.1198Z" stroke="#242424" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
					<path d="M12 12.5C13.1046 12.5 14 11.6046 14 10.5C14 9.39543 13.1046 8.5 12 8.5C10.8954 8.5 10 9.39543 10 10.5C10 11.6046 10.8954 12.5 12 12.5Z" stroke="#242424" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
					<path d="M12 12.5V15.5" stroke="#242424" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
					</svg>

					<span>{t("profile.personal_information.change_password__title")}</span>
				</div>
				<svg className="personal-information__item__button__arrow" width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M1.5 13L7.26 7L1.5 1" stroke="#171717" strokeWidth="1.5"/>
				</svg>
			</button>

			<Modal showModal={showPasswordModal} onModalClose={() => setShowPasswordModal(false)} title={t("profile.personal_information.change_password__title")}>
				<div className="personal-information__item__modal">
					<p className="personal-information__item__modal__subtitle">{t("profile.personal_information.change_password__subtitle")}</p>

					<div className="personal-information__item__modal__buttons">
						<button 
							onClick={()=> {mutateResetPassword(actualEmail)}}
							disabled={status == 'pending'}
							className={`personal-information__yes__button ${status == 'pending' && 'disabled'}`}
						>
							{ status == 'pending' ? (
								<Oval
									visible={true}
									height="20"
									width="20"
									color="#fff"
									secondaryColor="#F1F4FD"
									strokeWidth="3"
									ariaLabel="oval-loading"
									wrapperStyle={{}}
									wrapperClass="button__oval-loading"
								/>
							) : (
								t("profile.personal_information.yes__button")
							)}
						</button>

						<button 
							onClick={()=> {setShowPasswordModal(false)}}
							disabled={status == 'pending'}
							className={`personal-information__no__button ${status == 'pending' && 'disabled'}`}
						>
							{t("profile.personal_information.no__button")}
						</button>	
					</div>
					
				</div>
			</Modal>
		</div>
	) 
}

export default ChangePassword;