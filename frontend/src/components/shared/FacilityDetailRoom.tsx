import { useState } from "react";
import { Room } from "../../types"
import Datepicker from "../parts/Datepicker"
import Timepicker from "../parts/Timepicker"
import Benefits from "../parts/Benefits";
import FacilityDetailBook from "../parts/FacilityDetailBook";

function FacilityDetailRoom({room, startTime, endTime}: {room: Room; startTime: string; endTime: string;}) {

	const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedTimeRange, setSelectedTimeRange] = useState<string[]>([]);
	
	return (
		<>
			<Datepicker selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
						
			<Timepicker 
				selectedDate={selectedDate} 
				room={room}
				interval={60} 
			 	selectedTimeRange={selectedTimeRange}
				setSelectedTimeRange={setSelectedTimeRange}
				startTime={startTime}
				endTime={endTime}
			/>

			<Benefits benefits={room.benefits}/>

			<FacilityDetailBook selectedDate={selectedDate} selectedTimeRange={selectedTimeRange} roomPrice={room.price} roomID={room.id}/>
		</>
	)
}

export default FacilityDetailRoom