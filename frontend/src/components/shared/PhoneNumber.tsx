import { useEffect, useState } from "react";
import Modal from "../ui/Modal";
import { useTranslation } from "react-i18next";
import { InputMask } from '@react-input/mask';
import { useSendVerificationCodeMutation } from "../../services/react-query/queries";
import { Oval } from 'react-loader-spinner'
import CountdownTimer from "../parts/Profile/PersonalInformation/CountdownTimer";
import VerificationInput from "react-verification-input";
import { toast } from "sonner";

function PhoneNumber({ showPhoneNumberModal, setShowPhoneNumberModal, userID, mutateSavePhoneNumber, statusSavePhoneNumber, resetSavePhoneNumber }: { showPhoneNumberModal: boolean; setShowPhoneNumberModal: React.Dispatch<React.SetStateAction<boolean>>; userID: number; mutateSavePhoneNumber: (variables: any) => Promise<any>; statusSavePhoneNumber: string; resetSavePhoneNumber: () => void}) {
    const { t } = useTranslation();
	const [pageStatus, setPageStatus] = useState('phonenumber')
	const [phoneNumber, setPhoneNumber] = useState('+998 ');
	const [isButtonDisabled, setIsButtonDisabled] = useState(true);
	const [verificationCodeStatus, setVerificationCodeStatus] = useState('empty');
	const [verificationCodeInputDisabled, setVerificationCodeInputDisabled] = useState(false);

	const handleFocus = () => {
		if (!phoneNumber) {
			setPhoneNumber('+998 ');
		}
	};

	useEffect(() => {
        // Check if the phone number matches the expected length without the fixed prefix
        setIsButtonDisabled(phoneNumber.replace('+998 ', '').length !== 12);
    }, [phoneNumber]);

	const { mutateAsync: mutateSendVerificationCode, status: statusSendVerificationCode, data: verificationCode, reset: resetSendVerificationCode } = useSendVerificationCodeMutation();
	console.log(verificationCode);
	
	
	useEffect(() => {
        if (statusSendVerificationCode == 'success' && verificationCode) {
			setPageStatus('verificationcode');
		} else {
			setPageStatus('phonenumber');
		}
    }, [statusSendVerificationCode]);

	const handleTimerEnd = () => {
		handleFunctionEnd();
		toast.error(t("toast.phonenumber__time__end"))
	};

	const onVerificationCodeCompleted = async (value: string) => {
		if (value === verificationCode.verification_code && value.length == 4) {
			setVerificationCodeStatus('correct'); // Set verification code status to correct
			setVerificationCodeInputDisabled(true);

			await new Promise((res) => setTimeout(res, 300));

			mutateSavePhoneNumber({ userID: userID, phoneNumber: parseInt(phoneNumber.replace(/\D/g, ''), 10) })
			
		} else if (value !== verificationCode.verification_code && value.length == 4) {
			setVerificationCodeStatus('wrong'); // Set verification code status to incorrect			
		
		} else {
			setVerificationCodeStatus('empty'); // Set verification code status to empty
		}
	};

	const handleFunctionEnd = () => {
		setShowPhoneNumberModal(false);
		setPageStatus('phonenumber');
		setPhoneNumber('+998 ');
		setIsButtonDisabled(true);
		setVerificationCodeStatus('empty');
		setVerificationCodeInputDisabled(false);
		setShowPhoneNumberModal(false);
		resetSendVerificationCode();
        resetSavePhoneNumber();
	};
	
	useEffect(() => {
        if (!showPhoneNumberModal) {
            handleFunctionEnd();
        } else if ( statusSavePhoneNumber == 'success' ) {
			handleFunctionEnd();
			toast.success(t('toast.phonenumber__save__success'))
		}
    }, [showPhoneNumberModal, statusSavePhoneNumber]);
	
    return (
        <Modal showModal={showPhoneNumberModal} onModalClose={() => setShowPhoneNumberModal(false)} title={ statusSendVerificationCode == 'success' ? t('profile.phone.modal__verificationcode__title') : t('profile.phone.modal__number__title')}>
            { pageStatus == 'phonenumber' ? (
				<div className="phonenumber">
					<h5 className="phonenumber__modal__subtitle">{t('profile.phone.modal__number__subtitle')}</h5>

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
					disabled={isButtonDisabled || statusSendVerificationCode == 'pending'} 
					onClick={() => {mutateSendVerificationCode({ phoneNumber: parseInt(phoneNumber.replace(/\D/g, ''), 10) })}} 
					className={`phonenumber__modal__button ${ isButtonDisabled && 'disabled'}`}>
						{ statusSendVerificationCode == 'pending' ? (
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
						) : (
							t("profile.phone.modal__number__button")
						)}
					</button>
				</div>
			) : pageStatus == 'verificationcode' ? (
				<div className="verificationcode">
					<h5 className="verificationcode__modal__subtitle">{t('profile.phone.modal__verificationcode__subtitle')} { phoneNumber }</h5>
					
					<VerificationInput
						onChange={ (value) => onVerificationCodeCompleted(value) }
						length={4}
						validChars={'0-9'}
						autoFocus={true}
						placeholder={""}
						classNames={{
							container: verificationCodeStatus === 'wrong' ? "verificationcode__input__container wrong" : "verificationcode__input__container",
							character: verificationCodeStatus === 'correct' ? "verificationcode__input__character correct" : verificationCodeStatus === 'wrong' ? "verificationcode__input__character wrong" : "verificationcode__input__character",
							characterInactive: "verificationcode__input__character--inactive",
							characterSelected: "verificationcode__input__character--selected",
							characterFilled: "verificationcode__input__character--filled",
						}}
						inputProps={{
							inputMode: 'numeric',
							pattern: '[0-9]*',
							style: {
								fontSize: '20px' // Ensure the font-size is at least 16px
							},
							disabled: verificationCodeInputDisabled,
						}}
					/>

					{ statusSavePhoneNumber == 'idle' ? (
						<div className="verificationcode__modal__timer">
							<span>{t('profile.phone.modal__verificationcode__timer')}</span>
							<span><CountdownTimer onTimerEnd={handleTimerEnd} /></span>
						</div>
					) : (
						<div className="verificationcode__modal__timer">
							<Oval
							visible={true}
							height="22"
							width="22"
							color="#242424"
							secondaryColor="#A3A4A7"
							strokeWidth="3"
							ariaLabel="oval-loading"
							wrapperStyle={{}}
							/>
						</div>
					)}
					
				</div>
			) : null}
			
        </Modal>
    );
}

export default PhoneNumber;
