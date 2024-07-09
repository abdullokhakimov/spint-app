import { useNavigate, useParams } from 'react-router-dom';
import { useVerifyNewUserMutation } from '../../services/react-query/queries';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import { Oval } from 'react-loader-spinner'

function ActivateForm() {
	const { t } = useTranslation();

	const navigate = useNavigate();

    const { uid, token } = useParams();
	const newUserUIDToken = JSON.stringify({ uid, token });

	const { mutateAsync: mutateVerifyNewUser, isPending: isVerifyingNewUser, isSuccess: onVerifyNewUserSuccess } = useVerifyNewUserMutation();
	
	async function onSubmit(event: React.FormEvent){
		event.preventDefault();
		await mutateVerifyNewUser(newUserUIDToken);        
    }

	useEffect(() => {
		if (onVerifyNewUserSuccess) {
			navigate('/login');
		}
	}, [ onVerifyNewUserSuccess ] );

	return(
		<div className="authentication__content">
			<Helmet>
				<meta name='robots' content='noindex'/>
			</Helmet>

			<h1 className="authentication__title">{t('authentication.activation__title')}</h1>

			<p className="authentication__subtitle">{t('authentication.activation__subtitle')}</p>
			
			<form className="authentication__form" onSubmit={onSubmit}>
				<button className={`singup__form__submit ${isVerifyingNewUser ? 'disabled' : ''}`} disabled={isVerifyingNewUser} type="submit">
					{isVerifyingNewUser ? (
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
						t('authentication.activation')
					)}
				</button>
			</form>
		</div>
	);
}

export default ActivateForm
