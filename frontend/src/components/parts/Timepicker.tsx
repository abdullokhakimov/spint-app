import { useEffect, useState } from 'react';
import { TimepickerProps } from '../../types';

const Timepicker: React.FC<TimepickerProps> = ({ selectedDate, interval, room, selectedTimeRange, setSelectedTimeRange, startTime, endTime }) => {


	const date = () => {
     	const year = selectedDate.getFullYear()
		const month = selectedDate.getMonth()+1;
		const day = selectedDate.getDate();
		return `${year}-${month < 10 ? '0' + month : month}-${day}`
	}
	
	const disabledTimes = () => {
		const arrayDisabledTimes = room.bookings.flatMap(booking => {
			if (booking.date === date()) {
				return booking.time.slice(0, 5);
			}
			return []; // Return an empty array for times that don't meet the conditions
		});
		return arrayDisabledTimes;
	} 	
    // Function to generate time slots array	
	const generateTimeSlots = () => {
        const timeSlots = [];
        
        let currentTime = new Date(`01/01/2000 ${startTime}`);

        // Loop through the time range with the specified interval
        while (currentTime <= new Date(`01/01/2000 ${endTime}`)) {
            // Format the current time to HH:mm
            const formattedTime = currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            const isDisabled = disabledTimes().includes(formattedTime);
			
            timeSlots.push({ time: formattedTime, selected: false, disabled: isDisabled });

            // Increment the current time by the interval
            currentTime = new Date(currentTime.getTime() + interval * 60 * 1000);
        }		
        return timeSlots;
    };
    const [timeSlots, setTimeSlots] = useState(generateTimeSlots());

	useEffect(() => {
        setTimeSlots(generateTimeSlots())
    }, [selectedDate, room]);

    // Function to handle time selection
    const handleTimeSelect = (time: string) => {
        const index = selectedTimeRange.findIndex((rangeTime) => rangeTime === time);
		
        if (index !== -1) {
            // If the time is already selected, remove it from the range
			setSelectedTimeRange((prevRange: string[]) => prevRange.filter((rangeTime: string) => rangeTime !== time));
			
			setTimeSlots(timeSlots.map(slot => {
				if (slot.time === time) {
					return { ...slot, selected: false };
				}
				return slot;
			}));
		} else {
            // If the time is not disabled and not already selected, add it to the range if it's consecutive
            const selectedTimes = [...selectedTimeRange, time].sort();
            
            let isConsecutive = true;
            
            for (let i = 0; i < selectedTimes.length - 1; i++) {
                const current = selectedTimes[i].split(':');
                const next = selectedTimes[i + 1].split(':');
                if (
                    parseInt(next[0]) !== parseInt(current[0]) + 1 ||
                    parseInt(next[1]) !== 0 ||
                    disabledTimes().includes(selectedTimes[i + 1])
                ) {
                    isConsecutive = false;
                    break;
                }
            }
            if (isConsecutive) {
				setSelectedTimeRange(selectedTimes);
				setTimeSlots(timeSlots.map(slot => {
					if (selectedTimes.includes(slot.time)) {
						return { ...slot, selected: true };
					} else {
						return { ...slot, selected: false };
					}
				}));
			}
        }
    };
   
	
    return (
		<div className='facility-details__timepicker__wrapper'>
			<ul className='facility-details__timepicker'>
				{timeSlots.map((timeSlot, index) => (
					<li
						key={index}
						className={`facility-details__timepicker__item ${timeSlot.selected ? 'selected ' : ''}${timeSlot.disabled ? 'disabled' : ''}`}
						onClick={() => !timeSlot.disabled && handleTimeSelect(timeSlot.time)}
					>
						{timeSlot.time}
					</li>
				))}
			</ul>
		</div>
    );
};

export default Timepicker;


		

