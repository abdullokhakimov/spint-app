import React from 'react';
import { FilteredOrder } from '../types';
import i18n from '../i18n';

export const convertSvgToHtml = (svg: string, className?: string) => {
	const wrapperProps = className ? { className } : {};
	return React.createElement('div', {
		...wrapperProps,
		dangerouslySetInnerHTML: { __html: svg }
	});
};

export function getPageParamValueFromUrl(urlString: string) {
    const url = new URL(urlString);
    const searchParams = new URLSearchParams(url.search);
	const paramValue = searchParams.get('page');
    return paramValue ? parseInt(paramValue, 10) : null;
}


export function getNextHour(time: string) {
    // Split the time string into hours and minutes
    const [hours, minutes] = time.split(':').map(Number);
    
    // Create a Date object with the given time
    const date = new Date();
    date.setHours(hours);
    date.setMinutes(minutes);
    
    // Increment the hour by 1
    date.setHours(date.getHours() + 1);

    // Handle the case when the hour becomes 24 (midnight)
    if (date.getHours() === 0) {
        return '00:00';
    }

    // Format the next hour as "HH:mm"
    const nextHour = `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
    return nextHour;
}

export function formatDate(dateStr: string) {	
	const months: { [key: string]: string } = i18n.language === 'ru' ? {
		'01': 'января',
		'02': 'февраля',
		'03': 'марта',
		'04': 'апреля',
		'05': 'мая',
		'06': 'июня',
		'07': 'июля',
		'08': 'августа',
		'09': 'сентября',
		'10': 'октября',
		'11': 'ноября',
		'12': 'декабря'
	} : {
		'01': 'yanvar',
		'02': 'fevral',
		'03': 'mart',
		'04': 'aprel',
		'05': 'may',
		'06': 'iyun',
		'07': 'iyul',
		'08': 'avgust',
		'09': 'sentyabr',
		'10': 'oktyabr',
		'11': 'noyabr',
		'12': 'dekabr'
	};

	const [year, month, day] = dateStr.split('-').map(part => part.padStart(2, '0'));
	const formattedDate = `${parseInt(day)} ${months[month]} ${year}`;
	
	return formattedDate;
}

function getHourWord(hours: number): string {
    const lastDigit = hours % 10;
	if (i18n.language === 'ru') {
		if (hours >= 11 && hours <= 14) {
			return 'часов';
		} else if (lastDigit === 1) {
			return 'час';
		} else if (lastDigit >= 2 && lastDigit <= 4) {
			return 'часа';
		} else {
			return 'часов';
		}
	} else{
		return 'soat';
	}
}

export function calculateHourDifference(firstHour: string, lastHour: string): string {
    const [firstHourStr, lastHourStr] = [firstHour, lastHour].map(time => {
        const [hours, minutes] = time.split(':').map(Number);
        return new Date(0, 0, 0, hours, minutes);
    });

    const hourDifference = Math.abs(lastHourStr.getTime() - firstHourStr.getTime()) / (60 * 60 * 1000);
    
	const hourWord = getHourWord(hourDifference);

    return `${hourDifference} ${hourWord}`;
}

export function sortOwnerOrders(array: FilteredOrder[]) {
	const sortedArray = [...array]; // Create a shallow copy to avoid modifying the original array

	sortedArray.sort((a, b) => {
		// Compare dates
		const dateComparison = new Date(a.date).getTime() - new Date(b.date).getTime();
		if (dateComparison !== 0) {
		return dateComparison;
		}

		// If dates are equal, compare the first time value
		return a.time[0].localeCompare(b.time[0]);
	});

	return sortedArray;
}

export function hideEmail(email: string ) {
    const atIndex = email.indexOf('@');
    if (atIndex === -1) return email; // If "@" is not found, return the original email
    const username = email.slice(0, atIndex);
    const domain = email.slice(atIndex);

    // Hide characters in the middle of the username
    const usernameLength = username.length;
    const visibleChars = Math.min(4, Math.floor(usernameLength / 3)); // Number of visible characters at the start and end
    const hiddenChars = usernameLength - 2 * visibleChars; // Number of characters to be hidden
    const hiddenString = '*'.repeat(hiddenChars);

    // Concatenate the visible characters at the start, hidden characters, and visible characters at the end
    const hiddenUsername = username.slice(0, visibleChars) + hiddenString + username.slice(usernameLength - visibleChars);

    // Combine the hidden username and the domain to form the hidden email
    return hiddenUsername + domain;
}


export function formatDateTime(datetimeString: string) {
	const date = new Date(datetimeString);
	
	// Format the date
	const dateString = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
	const formattedDate = formatDate(dateString);
	console.log(dateString);
	
	// Format the time
	const formattedTime = date.toLocaleTimeString("ru-RU", {
		hour: "2-digit",
		minute: "2-digit",
	});

	return `${formattedDate} ${formattedTime}`;
}

export function getStartDateOfFacility(endTime: string) {	
	const currentDate = new Date();

    // Parse endTime and create a Date object for today's end time
    const [endHour, endMinute, endSecond] = endTime.split(':').map(Number);
    const endTimeDate = new Date();
    endTimeDate.setHours(endHour, endMinute, endSecond, 0);
    
	// Subtract 3 hours from the end time
    const thresholdTime = new Date(endTimeDate);
    thresholdTime.setHours(thresholdTime.getHours() - 3);
    
	return currentDate >= thresholdTime ? new Date(currentDate.setDate(currentDate.getDate() + 1)) : new Date();
}

export function orderIsEnded(date: string, time: string[] ) {
    // Combine date and the first time from the array
    let dateTimeString = `${date}T${time}:00`;

    // Create a Date object from the combined date and time
    let eventDateTime = new Date(dateTimeString);

    // Get the current date and time
    let now = new Date();

    // Compare eventDateTime with now
    if (eventDateTime <= now) {
        return true;
    } else {
        return false;
    }
}

export function isValidBirthDate(dateString: string){
    const parts = dateString.split('.');
    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1;
    const year = parseInt(parts[2], 10);
        
    const currentDate = new Date();
    const inputDate = new Date(year, month, day);

    // Check if year is within reasonable bounds (e.g., not earlier than 1900 or later than current year)
    if (year < 1900 || year > currentDate.getFullYear()) {
        return false;
    }

    // Check if month and day are valid within the given year
    if (inputDate.getFullYear() !== year || inputDate.getMonth() !== month || inputDate.getDate() !== day) {
        return false;
    }

    return true;
};