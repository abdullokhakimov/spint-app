import { SubmitHandler, useForm } from "react-hook-form"
import { z } from "zod"
import { SignupValidation } from "../../services/validation"
import { zodResolver } from "@hookform/resolvers/zod"
import { Link, useNavigate } from "react-router-dom"
import { useCreateNewUserMutation } from "../../services/react-query/queries"
import { useUserContext } from "../../context/AuthContext"
import { useTranslation } from "react-i18next"
import { Oval } from "react-loader-spinner"

function SignupForm() {
	const { t } = useTranslation();

	const { register, handleSubmit, formState: { errors }}  = useForm<z.infer<typeof SignupValidation>>({
		resolver: zodResolver(SignupValidation),
		defaultValues: {
			username: "",
			email: "",
			password: "",
			re_password: "",
		},
	});

	const navigate = useNavigate();

	const { isAuthenticated } = useUserContext();

	if (isAuthenticated) {
		navigate("/");
	}

	const { mutateAsync: mutateCreateNewUser, isPending: isCreatingNewUser } = useCreateNewUserMutation();

	const onSubmit: SubmitHandler<z.infer<typeof SignupValidation>> = async (user) => {
		await mutateCreateNewUser(user);
	};

	return(
		<div className="authentication__content">
			<h1 className="authentication__title">{t('authentication.signup__title')}</h1>
			<p className="authentication__subtitle">
				{t('authentication.login__subtitle')}
			</p>
			<form onSubmit={handleSubmit(onSubmit)} className="authentication__form">
				<div className="authentication__form__field">
					<input 
						type="text"
						className="authentication__form__field__input" 
						autoComplete="off"
						required
						{...register("username")}
					/>
					<label htmlFor="" className="authentication__form__field__label">
						{t('authentication.login__username')}
					</label>

					{errors.username && <p className="authentication__form__field__error-message">{errors.username.message}</p>}
				</div>

				<div className="authentication__form__field">
					<input 
						type="email"
						className="authentication__form__field__input" 
						autoComplete="off"
						required
						{...register("email")}
					/>
					<label htmlFor="" className="authentication__form__field__label">
						{t('authentication.login__email')}
					</label>

					{errors.email && <p className="authentication__form__field__error-message">{errors.email.message}</p>}
				</div>

				<div className="authentication__form__field">
					<input 
						type="password"
						className="authentication__form__field__input" 
						autoComplete="off"
						required
						{...register("password")}
					/>
					<label htmlFor="" className="authentication__form__field__label">
						{t('authentication.login__password')}
					</label>

					{errors.password && <p className="authentication__form__field__error-message">{errors.password.message}</p>}
				</div>
				
				<div className="authentication__form__field">
					<input 
						type="password"
						className="authentication__form__field__input" 
						autoComplete="off"
						required
						{...register("re_password")}
					/>
					<label htmlFor="" className="authentication__form__field__label">
						{t('authentication.login__password__submit')}
					</label>

					{errors.re_password && <p className="authentication__form__field__error-message">{errors.re_password.message}</p>}
				</div>
				
				<button className={`singup__form__submit ${isCreatingNewUser ? 'disabled' : ''}`} disabled={isCreatingNewUser} type="submit">
					{isCreatingNewUser ? (
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
						t('authentication.signup__title')
					)}
				</button>

			</form>
			<div className="authentication__redirect">
				<span className="authentication__redirect__text">{t('authentication.signup__redirect')}</span>
				<Link to="/login" className="authentication__redirect__link">
					{t('authentication.login')}
				</Link>
			</div>
		</div>

	);
}

export default SignupForm