import { useState, useEffect } from 'react';

const CountdownTimer = ({ onTimerEnd }: { onTimerEnd: () => void}) => {
	const [timeLeft, setTimeLeft] = useState(300); // 5 minutes in seconds

	useEffect(() => {
		if (!timeLeft) {
			onTimerEnd();
		return;
		}

		const intervalId = setInterval(() => {
		setTimeLeft(timeLeft - 1);
		}, 1000);

		return () => clearInterval(intervalId);
	}, [timeLeft]);

	const formatTime = (time: number) => {
		const minutes = Math.floor(time / 60);
		const seconds = time % 60;
		return `${minutes}:${seconds.toString().padStart(2, '0')}`;
	};

	return (
		<span>
		{formatTime(timeLeft)}
		</span>
	);
};

export default CountdownTimer;
