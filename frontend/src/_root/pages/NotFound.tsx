import { Link } from 'react-router-dom'
import '../../styles/NotFound.css'
import { useTranslation } from 'react-i18next';

function NotFound() {
	const { t } = useTranslation();

	return(
		<section className="notfound">
			<div className="notfound__content">
				<h2 className="notfound__content__title">404</h2>

				<h5 className="notfound__content__subtitle">{t("notfound.title")}</h5>

				<p className="notfound__content__paragraph">{t("notfound.subtitle")}</p>
			
				<Link className='notfound__content__link' to="">{t("notfound.link")}</Link>
			</div>

			<img src="/assets/images/no-results-img.png" className="notfound__image"/>
		
		</section>
	)
}

export default NotFound