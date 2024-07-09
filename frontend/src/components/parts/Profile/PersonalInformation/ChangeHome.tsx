import { useState } from "react";
import { typeInitialStateUpdatedUser } from "../../../../types";
import Modal from "../../../ui/Modal";
import { useTranslation } from "react-i18next";
import DetermineLocation from "./DetermineLocation";
import { useLoadAddressQuery } from "../../../../services/react-query/queries";
import { Oval } from "react-loader-spinner";

function ChangeHome({ updatedUser, setUpdatedUser }: { updatedUser: typeInitialStateUpdatedUser; setUpdatedUser: any; }) {
	const { t } = useTranslation();


	const [showHomeModal, setShowHomeModal] = useState(false);

	const [homeCoordinates, setHomeCoordinates] = useState<[number, number] | null>(updatedUser.home_coordinates);

	const { data: address, isLoading: isLoadingAddress } = useLoadAddressQuery(homeCoordinates);
	
	return (
		<div className="personal-information__item">
		<button onClick={() => setShowHomeModal(prev => !prev)} className="personal-information__item__button personal-information__item__button-home">
			<div className="personal-information__item__button__text">
				<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M12 18V15" stroke="#171717" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
					<path d="M10.0698 2.82009L3.13978 8.37009C2.35978 8.99009 1.85978 10.3001 2.02978 11.2801L3.35978 19.2401C3.59978 20.6601 4.95978 21.8101 6.39978 21.8101H17.5998C19.0298 21.8101 20.3998 20.6501 20.6398 19.2401L21.9698 11.2801C22.1298 10.3001 21.6298 8.99009 20.8598 8.37009L13.9298 2.83009C12.8598 1.97009 11.1298 1.97009 10.0698 2.82009Z" stroke="#171717" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
				</svg>
				
				<span>
					{t("profile.personal_information.change_home.title")}
				</span>
			</div>

			<svg className="personal-information__item__button__arrow" width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path d="M1.5 13L7.26 7L1.5 1" stroke="#171717" strokeWidth="1.5" />
			</svg>
		</button>

		<Modal showModal={showHomeModal} onModalClose={() => setShowHomeModal(false)} title={t("profile.personal_information.change_home.title")}>
			<div className="personal-information__item__modal">
				<p className="personal-information__item__modal__subtitle">{t("profile.personal_information.change_home.subtitle")}</p>

				<DetermineLocation actualHomeCoordinates={updatedUser.home_coordinates}  setHomeCoordinates={setHomeCoordinates}/>
				
				{isLoadingAddress ? (
					<div className="personal-information__item__modal__address">
						<Oval
						visible={true}
						height="20"
						width="20"
						color="#242424"
						secondaryColor="#A3A4A7"
						strokeWidth="3"
						ariaLabel="oval-loading"
						wrapperStyle={{}}
						wrapperClass="button__oval-loading"
						/>
					</div>
				) : (
					<div className="personal-information__item__modal__address">
						{address}
					</div>
				)}
				
				<button
					onClick={()=> {
						setUpdatedUser((prevUser: any) => ({
							...prevUser,
							home_coordinates: homeCoordinates,
						}));
						setShowHomeModal(false)}
					}
					disabled={JSON.stringify(updatedUser.home_coordinates) === JSON.stringify(homeCoordinates)}
					className={`personal-information__save__button ${JSON.stringify(updatedUser.home_coordinates) === JSON.stringify(homeCoordinates) ? 'disabled' : ''}`}
				>
					{t("profile.personal_information.ready__button")}
				</button>
			</div>
		</Modal>
    </div>
  );
}

export default ChangeHome;