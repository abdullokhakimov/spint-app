import { Link } from 'react-router-dom'
import '../../../styles/NotLoggedIn.css'
import { useTranslation } from 'react-i18next';

function NotLoggedIn() {
	const { t } = useTranslation();

	return (
		<section className="not-loogged-in">
			<img src="/assets/images/login-image.png" alt="" />
			<h4>{t("not__loggedin.title")}</h4>
			<p>{t("not__loggedin.subtitle")}</p>
			<Link to='/login'>{t("authentication.login")}</Link>
		</section>
	)
}

export default NotLoggedIn