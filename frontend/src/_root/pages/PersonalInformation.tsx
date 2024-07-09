import { useState, useEffect } from 'react';
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { useUserContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Oval } from "react-loader-spinner";
import UpdateLogo from "../../components/parts/Profile/PersonalInformation/UpdateLogo";
import { typeInitialStateUpdatedUser } from "../../types";
import '../../styles/PersonalInformation.css';
import ChangeUsername from '../../components/parts/Profile/PersonalInformation/ChangeUsername';
import ChangePhoneNumber from '../../components/parts/Profile/PersonalInformation/ChangePhoneNumber';
import ChangeEmail from '../../components/parts/Profile/PersonalInformation/ChangeEmail';
import ChangePassword from '../../components/parts/Profile/PersonalInformation/ChangePassword';
import ChangeBirthDate from '../../components/parts/Profile/PersonalInformation/ChangeBirthDate';
import ChangeFavoriteSports from '../../components/parts/Profile/PersonalInformation/ChangeFavoriteSports';
import ChangeFreeTime from '../../components/parts/Profile/PersonalInformation/ChangeFreeTime';
import ChangeHome from '../../components/parts/Profile/PersonalInformation/ChangeHome';
import { useUpdateUserInformationMutation } from '../../services/react-query/queries';
import { toast } from 'sonner';

function PersonalInformation() {
    const { t } = useTranslation();
    const { user, isAuthenticated, isLoading, checkAuthUser } = useUserContext();
    const navigate = useNavigate();

	const initialStateUpdatedUser: typeInitialStateUpdatedUser = {
        username: user.username,
        logo: user.logo_url,
        birth_date: user.birth_date,
        favorite_sports: user.favorite_sports,
        free_time: user.free_time,
        home_coordinates: user.home_coordinates,
    };

    const [updatedUser, setUpdatedUser] = useState<typeInitialStateUpdatedUser>(initialStateUpdatedUser);
	
    useEffect(() => {
        if (!isLoading && !isAuthenticated) {
            navigate('/profile');
        }
    }, [isLoading, isAuthenticated]);

	const { mutateAsync: mutateUpdateUserInformation, isPending: isUpdatingUserInformation } = useUpdateUserInformationMutation();
	
    return isAuthenticated && !isLoading ? (
		<section className="personal-information">
			<Helmet>
				<title>{t('helmet.profile.personal_information.title')}</title>
				<meta name="description" content={t("helmet.profile.personal_information.meta__description")} />
				<link rel="canonical" href="https://www.spint.uz/teams" />
			</Helmet> 

			<h3 className="personal-information__title">{t("profile.personal_information.title")}</h3>

			<div className="personal-information__logo">
				<div className="personal-information__logo__img">
					{ updatedUser && updatedUser.logo != null ? (
						<img
							src={
								typeof updatedUser.logo === 'string'
									? updatedUser.logo // If logo is already a URL string
									: updatedUser.logo instanceof File
									? URL.createObjectURL(updatedUser.logo) // If logo is a File object
									: ''
							}
							alt=""
						/>
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

				<UpdateLogo setUpdatedUser={setUpdatedUser}/>

					
			</div>

			<div className="personal-information__content">
				<div className='personal-information__content__header'>
					<h5 className="personal-information__content__title">{t("profile.personal_information.profile__title")}</h5>
				
					<p className="personal-information__content__subtitle">{t("profile.personal_information.profile__subtitle")}</p>
				</div>

				<div className="personal-information__content__list">
					<ChangeUsername actualUsername={user.username} updatedUser={updatedUser} setUpdatedUser={setUpdatedUser}/>
				
					<ChangePhoneNumber/>

					<ChangeEmail actualEmail={user.email}/>

					<ChangePassword actualEmail={user.email}/>

					<ChangeBirthDate actualBirthDate={user.birth_date} updatedUser={updatedUser} setUpdatedUser={setUpdatedUser}/>
				
					<ChangeFavoriteSports actualFavoriteSports={user.favorite_sports} updatedUser={updatedUser} setUpdatedUser={setUpdatedUser}/>
				
					<ChangeFreeTime updatedUser={updatedUser} setUpdatedUser={setUpdatedUser}/>
				
					<ChangeHome updatedUser={updatedUser} setUpdatedUser={setUpdatedUser}/>
				</div>

			</div>

			<div className="personal-information__save">
				<button 
					onClick={() => {
						mutateUpdateUserInformation(updatedUser).then(() => {
							navigate('/profile');
							checkAuthUser();
							toast.success(t("toast.update__user__success"));
						});
					}}
					disabled={(JSON.stringify(initialStateUpdatedUser) === JSON.stringify(updatedUser)) || isUpdatingUserInformation == true}
					className={`personal-information__save__button ${(JSON.stringify(initialStateUpdatedUser) === JSON.stringify(updatedUser)) || isUpdatingUserInformation == true ? 'disabled' : ''}`}
				>
					{isUpdatingUserInformation ? (
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
						t("profile.personal_information.save__button")
					)}
				</button>
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
	

export default PersonalInformation;