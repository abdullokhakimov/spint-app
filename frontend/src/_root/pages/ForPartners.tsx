import { useTranslation } from 'react-i18next';
import '../../styles/ForPartners.css'
import InfiniteCarousel from '../../components/parts/Profile/InfiniteCarousel';
import Modal from '../../components/ui/Modal';
import { useEffect, useState } from 'react';
import { InputMask } from '@react-input/mask';

function ForPartners() {
	const { t, i18n } = useTranslation();

	const [showForPartnersModal, setShowForPartnersModal] = useState(false);

	const [phoneNumber, setPhoneNumber] = useState('+998 ');

	const handleFocus = () => {
		if (!phoneNumber) {
			setPhoneNumber('+998 ');
		}
	};

	const [isButtonDisabled, setIsButtonDisabled] = useState(true);

	useEffect(() => {
        // Check if the phone number matches the expected length without the fixed prefix
        setIsButtonDisabled(phoneNumber.replace('+998 ', '').length !== 12);
    }, [phoneNumber]);

	const images = [
		'/assets/images/ForPartnersInfiniteCarousel/basketball.png',
		'/assets/images/ForPartnersInfiniteCarousel/billiard.png',
		'/assets/images/ForPartnersInfiniteCarousel/bowling.png',
		'/assets/images/ForPartnersInfiniteCarousel/football.png',
		'/assets/images/ForPartnersInfiniteCarousel/swimming-pool.png',
		'/assets/images/ForPartnersInfiniteCarousel/table-tennis.png',
		'/assets/images/ForPartnersInfiniteCarousel/football-2.png',
		'/assets/images/ForPartnersInfiniteCarousel/tennis.png',
		'/assets/images/ForPartnersInfiniteCarousel/volleyball.png',
	];

	return (
		<section className="forpartners">
			<div className="forpartners__logo">
				<svg width={34} height={25} viewBox="0 0 34 25" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M8.5708 2.29873L4.00429 13.5446C3.96926 13.6309 4.02922 13.7269 4.11814 13.7269H10.0926C10.3976 13.7359 11.3682 13.1807 11.7338 12.06L13.437 7.58245C13.6688 6.96814 13.9057 6.82734 14.4279 6.76538H30.4577C30.4649 6.76538 30.4723 6.76466 30.4795 6.76335C31.2048 6.62477 31.5169 6.29068 31.9549 5.39269L33.9902 0.180545C34.0238 0.0944957 33.9638 0 33.8757 0H11.9816C10.1628 0.217801 9.49602 0.826311 8.58158 2.27778C8.57743 2.28436 8.57377 2.29146 8.5708 2.29873Z" fill="#2628DD" />
					<path d="M2.75262 17.205L0.0102042 23.9377C-0.024941 24.024 0.0350145 24.12 0.124 24.12H22.1079C23.8841 23.9007 24.7347 23.5159 25.6071 21.6688L30.0862 10.5096C30.1209 10.4234 30.0609 10.3278 29.9722 10.3278H23.9969C23.2358 10.3603 22.8879 10.5591 22.5105 11.4717L20.7144 16.3415C20.5297 16.8759 20.3493 17.0752 19.8474 17.1259H2.86641C2.81691 17.1259 2.77217 17.157 2.75262 17.205Z" fill="#2628DD" />
				</svg>
			</div>

			<header className="forpartners__header">
				{i18n.language == 'uz' ? (
					<h1 className="forpartners__header__title">
						<span className='forpartners__header__title__span'>{t("partners.header__title__span")} </span>
						{t("partners.header__title")}
					</h1>
				) : (
					<h1 className="forpartners__header__title">
						{t("partners.header__title")}
						<span className='forpartners__header__title__span'> {t("partners.header__title__span")}</span>
					</h1>
				)}

				<p className="forpartners__header__subtitle">
					{window.innerWidth > 500 ? (
						t("partners.header__subtitle__pc")
					) :  t("partners.header__subtitle__mobile")}
				</p>
				
				<button onClick={() => {setShowForPartnersModal(true)}} className="forpartners__header__button">{t("partners.header__button")}</button>
			</header>

			<InfiniteCarousel images={images}/>	

			<div className="benefits">
				<h3 className="benefits__title">{t("partners.benefits__title")}</h3>
			
				<div className="benefits__list">
					<div className="benefits__item blue">
						<h5 className="benefits__item__title">{t("partners.benefits__item__more_bookings")}</h5>

						<img src="/assets/images/ForPartnersBenefits/more-bookings.png" alt="" />
					</div>
					
					<div className="benefits__item red">
						<h5 className="benefits__item__title">{t("partners.benefits__item__additional_income")}</h5>

						<img src="/assets/images/ForPartnersBenefits/additional-income.png" alt="" />
					</div>

					<div className="benefits__item green">
						<h5 className="benefits__item__title">{t("partners.benefits__item__simple_management")}</h5>

						<img src="/assets/images/ForPartnersBenefits/simple-management.png" alt="" />
					</div>

					<div className="benefits__item purple">
						<h5 className="benefits__item__title">{t("partners.benefits__item__sales_analyze")}</h5>

						<img src="/assets/images/ForPartnersBenefits/sales-analyze.png" alt="" />
					</div>
				</div>
			</div>


			<Modal showModal={showForPartnersModal} onModalClose={() => setShowForPartnersModal(false)} title={t("partners.modal__title")}>
				<div className="phonenumber__modal__field">
					<InputMask
						mask="+998 __ ___ __ __"
						replacement={{ _: /\d/ }}
						value={phoneNumber}
						onChange={(e) => setPhoneNumber(e.target.value)}
						onFocus={handleFocus}
						inputMode="numeric"
						type="tel"
					/>

					<label htmlFor="phone" className="phonenumber__modal__field__label">
						{t('profile.phone.modal__number__input')}
					</label>
				</div>
			
				<button 
					disabled={isButtonDisabled}
					onClick={() => {}} 
					className={`phonenumber__modal__button ${isButtonDisabled && 'disabled'}`}>
						{/* { statusSendVerificationCode == 'pending' ? (
							<Oval
							visible={true}
							height="22"
							width="22"
							color="#fff"
							secondaryColor="#F1F4FD"
							strokeWidth="3"
							ariaLabel="oval-loading"
							wrapperStyle={{}}
							wrapperClass=""
							/>
						) : ( */}
							{t("partners.modal__button")}
						{/* )} */}
				</button>
			</Modal>

		</section>
	)
}

export default ForPartners;