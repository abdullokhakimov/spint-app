import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { Game } from '../../types';
import { convertSvgToHtml } from '../../utils';
import { useEffect, useState } from 'react';

function FacilityDetailHeader({ title, image_url, game }: { title: string; image_url: string; game: Game}) {
	const [isScrolled, setIsScrolled] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
		if (window.innerWidth < 500) {
			if (window.scrollY > 150) {
				setIsScrolled(true);
			} else {
				setIsScrolled(false);
			}
		}
		};

		window.addEventListener('scroll', handleScroll);

		return () => {
		window.removeEventListener('scroll', handleScroll);
		};
	}, []);
	
	return (
		<header className="facility-details__header">
			<div className="facility-details__header__image">
				<LazyLoadImage
					alt="Изображение сооружения"
                    src={image_url ? image_url : ""}
                    effect="blur"
				/>
				<span></span>
			</div>

			<div className={`facility-details__header__text-scroll-up ${isScrolled ? '' : 'active'}`}>
				<h2 className="facility-details__header__text-scroll-up__title">{ title }</h2>

				<div className="facility-details__header__text-scroll-up__gametype">
					{convertSvgToHtml(game.svg_icon_non_colored, "facility-details__header__text-scroll-up__gametype__icon")}

					<span className="facility-details__header__text-scroll-up__gametype__text">{ game.title }</span>
				</div>

			</div>
				
			<div className={`facility-details__header__text-scroll-down ${isScrolled ? 'active' : ''}`}>
				<h2 className="facility-details__header__text-scroll-down__title">{ title }</h2>
				
				<div className="facility-details__header__text-scroll-down__gametype">
					{convertSvgToHtml(game.svg_icon_non_colored, "facility-details__header__text-scroll-down__gametype__icon")}


					<span className="facility-details__header__text-scroll-down__gametype__text">{ game.title }</span>
				</div>
			</div>
		</header>
	)
}

export default FacilityDetailHeader