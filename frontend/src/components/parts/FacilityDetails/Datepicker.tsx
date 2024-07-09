import { useEffect } from "react";
import DatePicker from 'react-datepicker';
import { useTranslation } from "react-i18next";
import { getStartDateOfFacility } from "../../../utils";

function Datepicker({selectedDate, setSelectedDate, endTime}: {selectedDate: Date; setSelectedDate: (date: Date) => void; endTime: string;}) {		
	const { i18n } = useTranslation();
	
	const monthString = () => {
		const month = selectedDate.getMonth()+1;
		return `${month < 10 ? '0' + month : month}`
	}
	
	useEffect(() => {
        const dateItems = document.querySelectorAll('.react-datepicker__day');
        dateItems.forEach(item => {
            if (!item.classList.contains('react-datepicker__day--disabled') && !item.classList.contains('react-datepicker__day--outside-month')) {
				const dateText = item.textContent || ''; // Handle null case
				const date = new Date(`2024-${monthString()}-${parseInt(dateText) < 10 ? '0' + dateText : dateText}`);
			
				let daysOfWeek = ['']
				if (i18n.language == 'uz') {
					daysOfWeek = ['YA', 'DU', 'SE', 'CH', 'PA', 'JU', 'SH'];
				}else{
					daysOfWeek = ['ВС', 'ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ'];	
				}
				const currentDayOfWeek = daysOfWeek[date.getDay()];
				
				const spanDay = document.createElement("span");
				const spanDayText = document.createTextNode(`${currentDayOfWeek}`);
				spanDay.appendChild(spanDayText);
				item.appendChild(spanDay);
            }
        });
    }, []);
	
	return (
		<div className="facility-details__datepicker">
			<DatePicker
				selected={selectedDate}
				minDate={getStartDateOfFacility(endTime)}
				onChange={(date: Date) => setSelectedDate(date)}
				inline
				showMonthDropdown={false}
				showWeekNumbers={false}
			/>	
		</div>
		
	);
}

export default Datepicker