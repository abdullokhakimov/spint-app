import { useTranslation } from 'react-i18next';
import '../../styles/Teams.css'

function Teams() {
	const { t } = useTranslation();

	return (
		<div className="teams">
			<img src="/assets/images/soon-img.jpg" alt="" />
			<h3>{t("teams.title")}</h3>
			<p>{t("teams.subtitle")}</p>
		</div>
	)
}

export default Teams