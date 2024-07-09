import { motion, useAnimation } from 'framer-motion';
import React, { useEffect, useRef } from 'react';

interface InfiniteCarouselProps {
  images: string[];
}

const InfiniteCarousel: React.FC<InfiniteCarouselProps> = ({ images }) => {
	const controls = useAnimation();
  	const carouselRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const scroll = async () => {
		if (carouselRef.current) {
			const { width } = carouselRef.current.getBoundingClientRect();
			await controls.start({
			x: -width,
			transition: { duration: images.length * 3, ease: "linear" },
			});
			carouselRef.current.scrollLeft = 0;
			controls.set({ x: 0 });
			scroll();
		}
		};

		scroll();
	}, [controls, images.length]);

	return (
		<div className="infinite-carousel">
			<motion.div className="infinite-carousel__content" ref={carouselRef} animate={controls}>
				{images.map((src, index) => (
				<img key={index} src={src} alt={`Image ${index + 1}`} className="infinite-carousel__img" />
				))}
				{images.map((src, index) => (
				<img key={`duplicate-${index}`} src={src} alt={`Image ${index + 1}`} className="infinite-carousel__img" />
				))}
			</motion.div>
		</div>
	);
};

export default InfiniteCarousel;