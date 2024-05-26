import { useTranslation } from 'react-i18next';
import '../../styles/Teams.css'
import { Helmet } from 'react-helmet-async';

function Teams() {
	const { t } = useTranslation();

	return (
		<div className="teams">
			<Helmet>
				<title>{t('helmet.teams.title')}</title>
				<meta name="description" content={t("helmet.teams.meta__description")} />
				<link rel="canonical" href="/teams" />
			</Helmet>

			<img src="/assets/images/soon-img.jpg" alt="" />
			<h3>{t("teams.title")}</h3>
			<p>{t("teams.subtitle")}</p>
		</div>
	)
}

export default Teams