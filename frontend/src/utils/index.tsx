import React from 'react';
import { FilteredBooking } from '../types';
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

	const [year, month, day] = dateStr.split('-');
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

function isConsecutiveTime(prevTime: string, nextTime: string) {
	if (!prevTime) return false;
    const prevTimestamp = new Date(`1970-01-01T${prevTime}`);
    const nextTimestamp = new Date(`1970-01-01T${nextTime}`);
    return nextTimestamp.getTime() - prevTimestamp.getTime() === 60 * 60 * 1000; // Проверяем, разница в 1 час
}

export function sortUserBookings(bookings: FilteredBooking[]){
	// Сортировка массива по убыванию даты и времени
	const sortedData = bookings.sort((a, b) => {
        const dateA = new Date(`${a.date}T${a.time}`).getTime();
        const dateB = new Date(`${b.date}T${b.time}`).getTime();
        return dateB - dateA;
    });

	const mergedData = [];
    let prevRoom = null;
    let prevDate = null;
    let prevTime = null;
    let currentGroup = null;

    for (const obj of sortedData) {
        if (
            prevRoom === obj.room_id &&
            prevDate === obj.date &&
            prevTime !== null &&
            isConsecutiveTime(obj.time, prevTime)
        ){
            if (currentGroup) {
                currentGroup.push(obj);
            } else {
                currentGroup = [obj];
                mergedData.push(currentGroup);
            }
        } else {
            currentGroup = [obj];
            mergedData.push(currentGroup);
        }
        prevRoom = obj.room_id;
        prevDate = obj.date;
        prevTime = obj.time;
        
    }

    return mergedData;
}

export function sortOwnerBookings(bookings: FilteredBooking[]){
	// Сортировка массива по убыванию даты и времени
	const sortedData = bookings.sort((a, b) => {
        const dateA = new Date(`${a.date}T${a.time}`).getTime();
        const dateB = new Date(`${b.date}T${b.time}`).getTime();
        return dateB - dateA;
    });

	const mergedData = [];
    let prevRoom = null;
    let prevDate = null;
    let prevTime = null;
	let prevUser = null
    let currentGroup = null;

    for (const obj of sortedData) {
        if (prevRoom === obj.room_id && prevDate === obj.date && prevTime !== null && isConsecutiveTime(obj.time, prevTime) && prevUser === obj.user) {
            currentGroup?.push(obj);
        } else {
            currentGroup = { ...obj };
            currentGroup = [obj];
            mergedData.push(currentGroup);  
        }
        prevRoom = obj.room_id;
        prevDate = obj.date;
        prevTime = obj.time;
        prevUser = obj.user;
    }

    return mergedData;
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

	// Format the time
	const formattedTime = date.toLocaleTimeString("ru-RU", {
		hour: "2-digit",
		minute: "2-digit",
	});

	return `${formattedDate} ${formattedTime}`;
}
