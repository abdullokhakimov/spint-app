import { useTranslation } from "react-i18next";

function FacilityDetailsLocation({ address, address_url }: { address: string; address_url: string; }) {
	const { t } = useTranslation();
	
	return (
		<div className="facility-details__location">
			<h4 className="facility-details__location__title">{t("facility__detail.location.title")}</h4>
			<div className="facility-details__location__content">
				<img
				className="facility-details__location__content__map"
				src="/assets/images/map-image.webp"
				alt=""
				/>
				<p className="facility-details__location__content__text">{address}</p>
				<a href={address_url} className="facility-details__location__content__href">
					<span>{t("facility__detail.location.link")}</span>
					<svg
						width={8}
						height={12}
						viewBox="0 0 8 12"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
						d="M1.38248 0.999999L5.95599 5.11616C6.49612 5.60227 6.49612 6.39773 5.95599 6.88384L1.38248 11"
						stroke="#2628DD"
						strokeWidth="1.5"
						strokeMiterlimit={10}
						strokeLinecap="round"
						strokeLinejoin="round"
						/>
					</svg>
				</a>
			</div>
		</div>

	)
}

export default FacilityDetailsLocation