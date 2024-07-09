import React, { useState } from "react";
import { typeInitialStateUpdatedUser } from "../../../../types";
import Modal from "../../../ui/Modal";
import { useTranslation } from "react-i18next";
import { useLoadUsersQuery } from "../../../../services/react-query/queries";
import { Oval } from "react-loader-spinner";

function ChangeUsername({ actualUsername, updatedUser, setUpdatedUser }: { actualUsername: string; updatedUser: typeInitialStateUpdatedUser, setUpdatedUser: any}) {
    const { t } = useTranslation();

	const { data: users, isLoading: isLoadingUsers } = useLoadUsersQuery()
	
	const [ showUsernameModal, setShowUsernameModal ] = useState(false);
	const [ username, setUsername ] = useState(updatedUser.username);
	const [ usernameExistError, setUsernameExistError ] = useState(false);
	
	const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setUsername(event.target.value);
		if (!isLoadingUsers && users && updatedUser.username !== event.target.value && actualUsername !== event.target.value) {
			const usernames = users.map(user => user.username);
		    const usernameExists = usernames.includes(event.target.value)
			setUsernameExistError(usernameExists);	
		}
	};
	
	return (
		<div className="personal-information__item">
			<button onClick={() => setShowUsernameModal(prev => !prev)} className="personal-information__item__button">
				<div className="personal-information__item__button__text">
					<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M10 9.99984C12.3012 9.99984 14.1667 8.13436 14.1667 5.83317C14.1667 3.53198 12.3012 1.6665 10 1.6665C7.69882 1.6665 5.83334 3.53198 5.83334 5.83317C5.83334 8.13436 7.69882 9.99984 10 9.99984Z" stroke="#242424" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
						<path d="M17.1583 18.3333C17.1583 15.1083 13.95 12.5 10 12.5C6.05001 12.5 2.84167 15.1083 2.84167 18.3333" stroke="#242424" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
					</svg>
					<span>{updatedUser.username}</span>
				</div>
				<svg className="personal-information__item__button__arrow" width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M1.5 13L7.26 7L1.5 1" stroke="#171717" strokeWidth="1.5"/>
				</svg>
			</button>
			<Modal showModal={showUsernameModal} onModalClose={() => setShowUsernameModal(false)} title={t("profile.personal_information.change_username")}>
				{isLoadingUsers == false ? (
					<div className="personal-information__item__modal">
						<div className="authentication__form__field">
							<input 
								type="text"
								className="authentication__form__field__input" 
								autoComplete="off"
								value={username}
								onChange={handleUsernameChange}
							/>
							<label htmlFor="" className="authentication__form__field__label">
								{t('authentication.login__username')}
							</label>

							 
							<p className={`personal-information__item__modal__field__error-message ${usernameExistError && 'active'}`}>{t("profile.personal_information.username_exist_error")}</p>
						</div>
						<button 
							onClick={()=> {
								setUpdatedUser((prevUser: any) => ({
									...prevUser,
									username: username,
								}));
								setShowUsernameModal(false)}
							}
							disabled={updatedUser.username === username || usernameExistError == true || username == ''}
							className={`personal-information__save__button ${updatedUser.username === username || usernameExistError == true || username == '' ? 'disabled' : ''}`}
						>
							{t("profile.personal_information.ready__button")}
						</button>
					</div>
				) : isLoadingUsers == true ? (
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
				): null}
			</Modal>
		</div>
	) 
}

export default ChangeUsername;