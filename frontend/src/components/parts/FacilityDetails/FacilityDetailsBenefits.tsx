import { useTranslation } from 'react-i18next';
import { Benefit } from '../../../types'
import { convertSvgToHtml } from '../../../utils';


function Benefits({benefits}: {benefits: Benefit[]}) {
	const { t } = useTranslation();
	
	if (benefits.length === 0) {
        return null; // Render nothing if benefits is not an array or is empty
    }

	return (
		<div className="facility-details__benefits">
			<h4 className="facility-details__benefits__title">{t("facility__detail.benefits.title")}</h4>
			<ul className="facility-details__benefits__list">
				{benefits.map((benefit, index)=>(
					<li key={index} className="facility-details__benefits__item">
						{convertSvgToHtml(benefit.svg_icon, 'facility-details__benefits__item-icon')}

						<span>{benefit.title}</span>
					</li>
				))}
			</ul>
		</div>

	)
}

export default Benefits