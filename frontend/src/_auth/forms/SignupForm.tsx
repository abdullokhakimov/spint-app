import { SubmitHandler, useForm } from "react-hook-form"
import { z } from "zod"
import { SignupValidation } from "../../services/validation"
import { zodResolver } from "@hookform/resolvers/zod"
import FormField from "../../components/ui/FormField"
import { Link, useNavigate } from "react-router-dom"
import { useCreateNewUserMutation } from "../../services/react-query/queries"
import { useUserContext } from "../../context/AuthContext"
import { useTranslation } from "react-i18next"

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
				<FormField
					type="text"
					label={t('authentication.login__username')}
					name="username"
					register={register}
					error={errors.username}
				/>
				<FormField
					type="email"
					label={t('authentication.login__email')}
					name="email"
					register={register}
					error={errors.email}
				/>
				<FormField
					type="password"
					label={t('authentication.login__password')}
					name="password"
					register={register}
					error={errors.password}
				/>
				<FormField
					type="password"
					label={t('authentication.login__password__submit')}
					name="re_password"
					register={register}
					error={errors.re_password}
				/>
				<button className={`singup__form__submit ${isCreatingNewUser ? 'disabled' : ''}`} disabled={isCreatingNewUser} type="submit">
					{isCreatingNewUser ? (
						t('others.loading')
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