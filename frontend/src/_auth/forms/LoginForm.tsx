import { SubmitHandler, useForm } from "react-hook-form"
import { z } from "zod"
import { LoginValidation } from "../../services/validation"
import { zodResolver } from "@hookform/resolvers/zod"
import FormField from "../../components/ui/FormField"
import { Link, useNavigate } from "react-router-dom"
import { useLoginUserMutation } from "../../services/react-query/queries"
import { useUserContext } from "../../context/AuthContext"
import { toast } from "sonner"
import { useTranslation } from 'react-i18next';


function LoginForm() {
	const { t } = useTranslation();

	const { register, handleSubmit, formState: { errors }} = useForm<z.infer<typeof LoginValidation>>({
		resolver: zodResolver(LoginValidation),
		defaultValues: {
			username: "",
			password: "",
		},
	});

	const navigate = useNavigate();

	const { checkAuthUser, isLoading: isUserLoading, isAuthenticated } = useUserContext();

	if (isAuthenticated) {
		navigate("/");
	}

	const { mutateAsync: mutateLoginUser, isPending: isLoggingUser } = useLoginUserMutation();

	const onSubmit: SubmitHandler<z.infer<typeof LoginValidation>> = async (user) => {
		await mutateLoginUser(user);

		const isLoggedIn = await checkAuthUser();

		if (isLoggedIn) {
			navigate("/");
			toast.success(t('toast.login__success'))
		} else {
			return;
		}
	};

	return(
		<div className="authentication__content">
			<h1 className="authentication__title">{t('authentication.login__title')}</h1>

			<p className="authentication__subtitle">{t('authentication.login__subtitle')}</p>

			<form onSubmit={handleSubmit(onSubmit)} className="authentication__form">
				<FormField
					type="text"
					label={t('authentication.login__username')}
					name="username"
					register={register}
					error={errors.username}
				/>

				<FormField
					type="password"
					label={t('authentication.login__password')}
					name="password"
					register={register}
					error={errors.password}
				/>

				{/* <Link to="/" className="authentication__reset-password__link">Забыли пароль?</Link> */}

				<button className={`singup__form__submit ${isLoggingUser || isUserLoading ? 'disabled' : ''}`} disabled={isLoggingUser || isUserLoading} type="submit">
					{isLoggingUser || isUserLoading ? (
						t('others.loading')
					) : (
						t('authentication.login')
					)}
				</button>

			</form>
			<div className="authentication__redirect">
				<span className="authentication__redirect__text">{t('authentication.login__redirect')}</span>
				
				<Link to="/signup" className="authentication__redirect__link">{t('authentication.signup')}</Link>
			</div>
		</div>

	);
}

export default LoginForm