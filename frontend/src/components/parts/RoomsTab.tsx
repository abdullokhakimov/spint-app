import { useEffect, useState } from 'react';
import { Room } from '../../types';
import { motion } from "framer-motion";

function RoomTabs({ selectedRoomID, onSelectRoom, rooms }: { selectedRoomID: number | undefined; onSelectRoom: (room: Room) => void; rooms: Room[];}) {
	const handleSelectRoom = (room: Room) => {
		onSelectRoom(room);
	};

	
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
		<ul className={`facility-details__selection__rooms__list ${isScrolled ? 'active' : ''}`}>
		{rooms.map((room, index) => (
			<li 
				key={index} 
				onClick={() => handleSelectRoom(room)} 
				className={`facility-details__selection__rooms__item ${room.id === selectedRoomID ? "selected" : ""}`}
				style={{ width: `${100 / rooms.length}%` }}
			>
				<span>{room.title}</span>
				{room.id == selectedRoomID ? (
					<motion.div className="facility-details__selection__rooms__item__underline" layoutId="underline" />
				) : null}
			</li>
			
		))}
		</ul>
	);
}

export default RoomTabs;
