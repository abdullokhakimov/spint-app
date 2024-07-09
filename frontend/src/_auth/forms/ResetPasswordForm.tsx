import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { ResetPasswordValidation } from "../../services/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useResetPasswordConfirmMutation } from "../../services/react-query/queries";
import { useTranslation } from "react-i18next";
import { Oval } from "react-loader-spinner";
import { useParams } from "react-router-dom";

function ResetPasswordForm() {
	const { t } = useTranslation();
	const { uid, token } = useParams<{ uid: string | undefined; token: string | undefined }>();

	const { register, handleSubmit, formState: { errors } } = useForm<z.infer<typeof ResetPasswordValidation>>({
		resolver: zodResolver(ResetPasswordValidation),
		defaultValues: {
			new_password: "",
			re_new_password: "",
		},
	});

	const { mutateAsync: mutateResetPasswordConfirm, isPending: isResetPasswordConfirming } = useResetPasswordConfirmMutation();

	const onSubmit: SubmitHandler<z.infer<typeof ResetPasswordValidation>> = async ({ new_password, re_new_password }) => {
		await mutateResetPasswordConfirm({ uid, token, new_password, re_new_password });
	};

	return (
		<div className="authentication__content">
			<h1 className="authentication__title">{t('authentication.reset_password__title')}</h1>
			<p className="authentication__subtitle">
				{t('authentication.reset_password__subtitle')}
			</p>
			<form onSubmit={handleSubmit(onSubmit)} className="authentication__form">
				<div className="authentication__form__field">
					<input 
						type="password"
						className="authentication__form__field__input" 
						autoComplete="off"
						required
						{...register("new_password")}
					/>
					<label htmlFor="" className="authentication__form__field__label">
						{t('authentication.reset_password__password')}
					</label>

					{errors.new_password && <p className="authentication__form__field__error-message">{errors.new_password.message}</p>}
				</div>
				
				<div className="authentication__form__field">
					<input 
						type="password"
						className="authentication__form__field__input" 
						autoComplete="off"
						required
						{...register("re_new_password")}
					/>
					<label htmlFor="" className="authentication__form__field__label">
						{t('authentication.reset_password__re_password')}
					</label>

					{errors.re_new_password && <p className="authentication__form__field__error-message">{errors.re_new_password.message}</p>}
				</div>

				<button className={`singup__form__submit ${isResetPasswordConfirming ? 'disabled' : ''}`} disabled={isResetPasswordConfirming} type="submit">
					{isResetPasswordConfirming ? (
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
						t('authentication.reset_password__title')
					)}
				</button>
			</form>
		</div>
	);
}

export default ResetPasswordForm;