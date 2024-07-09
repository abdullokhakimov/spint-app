import { Facility } from "../../../types";
import { convertSvgToHtml } from "../../../utils";
import "react-lazy-load-image-component/src/effects/blur.css";
import { LazyLoadImage, trackWindowScroll } from 'react-lazy-load-image-component';
import { Link } from "react-router-dom";

function FacilityItem({ facilities, scrollPosition }: { facilities: Facility[]; scrollPosition: { x: number; y: number } }){

	return (
		<>
			{ facilities.map(( facility ) => (
				<Link to={`/facility/${facility.id}`} key={facility.id} className="facilities__item">
					<LazyLoadImage
                        alt="Изображение сооружения"
                        scrollPosition={scrollPosition}
                        src={facility.image_url ? facility.image_url : ""}
                        effect="blur"
                        className="facilities__item__image"
                    />

					<h5 className="facilities__item__title">{ facility.title }</h5>

					<div className="facilties__item__location">
						<svg className="facilties__item__location__icon" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
							<g clipPath="url(#clip0_92_2782)">
							<path d="M13.7467 5.63329C13.0467 2.55329 10.3601 1.16663 8.00006 1.16663C8.00006 1.16663 8.00006 1.16663 7.9934 1.16663C5.64006 1.16663 2.94673 2.54663 2.24673 5.62663C1.46673 9.06663 3.5734 11.98 5.48006 13.8133C6.18673 14.4933 7.0934 14.8333 8.00006 14.8333C8.90673 14.8333 9.8134 14.4933 10.5134 13.8133C12.4201 11.98 14.5267 9.07329 13.7467 5.63329ZM8.00006 8.97329C6.84006 8.97329 5.90006 8.03329 5.90006 6.87329C5.90006 5.71329 6.84006 4.77329 8.00006 4.77329C9.16006 4.77329 10.1001 5.71329 10.1001 6.87329C10.1001 8.03329 9.16006 8.97329 8.00006 8.97329Z" fill="#A3A4A7" />
							</g>
							<defs>
							<clipPath id="clip0_92_2782">
								<rect width={16} height={16} fill="white" />
							</clipPath>
							</defs>
						</svg>

						<span className="facilties__item__location__text">{ facility.region.title } район, { facility.adress }</span>
					</div>
					
					<div className="facilties__item__gametype">
						{convertSvgToHtml(facility.game.svg_icon_non_colored)}

						<span className="facilties__item__gametype__text">{ facility.game.title }</span>
					</div>
				</Link>
			))}
		</>
    );
}

export default trackWindowScroll(FacilityItem)