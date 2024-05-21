import axios from "axios";
import { toast } from "sonner";
import { Facility, FacilityMapCoordinates, Game, Region, typeNewUser } from "../../types";
import i18n from '../../i18n';

// const localhost = 'http://127.0.0.1:8000'
const localhost = 'http://192.168.0.102:8000'




export async function apiCreateNewUser( user: typeNewUser ) {
	const config = {
        headers: {
            'Content-Type': 'application/json',
			'Accept-Language': `${i18n.resolvedLanguage}`
        }
    };

 	const body = {
        username: user.username,
        email: user.email,
        password: user.password,
        re_password: user.re_password
    };

    try {
        await axios.post(`${localhost}/auth/users/`, body, config);
		toast.success(i18n.t("toast.create__new__user__success"))
	} catch (error){
		let apiErrorMessage = '';
        if (error.response && error.response.data) {
            apiErrorMessage = Object.values(error.response.data)[0][0];
            toast.error(apiErrorMessage);
        } else {
            toast.error(i18n.t("toast.create__new__user__error"));
        }
	}
}

export async function apiLoginUser( user: { username: string, password: string } ){
	const config = {
        headers: {
            'Content-Type': 'application/json',
			'Accept-Language': `${i18n.resolvedLanguage}`
        }
    };

    const body = JSON.stringify({ 
		username: user.username, 
		password: user.password
	});

	try {
        const apiLoginUserPost = await axios.post(`${localhost}/auth/jwt/create/`, body, config);
		
		localStorage.setItem('access', apiLoginUserPost.data.access);
      	localStorage.setItem('refresh', apiLoginUserPost.data.refresh);
	} catch (error) {
		let apiErrorMessage = '';
        if (error.response.data) {	
            apiErrorMessage = Object.values(error.response.data)[0];
            toast.error(apiErrorMessage);
        } else {
            toast.error(i18n.t("toast.login__error"));
        }
    }
}

export async function apiVerifyNewUser(newUserUIDToken: string){
	const config = {
        headers: {
            'Content-Type': 'application/json',
			'Accept-Language': `${i18n.resolvedLanguage}`
        }
    };

    const body = newUserUIDToken;

    try {
        await axios.post(`${localhost}/auth/users/activation/`, body, config);
		toast.success(i18n.t("toast.verify__success"));
    } catch (error) {
        toast.error(i18n.t("toast.verify__error"))
    }
}

export async function apiLoadUser() {
	
    if (localStorage.getItem('access')) {
		
        const config = {
            headers: {
                'Content-Type': 'application/json',
				'Accept-Language': `${i18n.resolvedLanguage}`,
                'Authorization': `JWT ${localStorage.getItem('access')}`,
                'Accept': 'application/json'
            }
        }; 
		
        try {
            const apiLoadUserPost = await axios.get(`${localhost}/auth/users/me/`, config);			
            return apiLoadUserPost.data
        } catch {
			return null
		}
    } else {
        return null
    }
}

export async function apiCheckAuthenticated(){
	if (localStorage.getItem('access')) {
        const config = {
            headers: {
                'Content-Type': 'application/json',
				'Accept-Language': `${i18n.resolvedLanguage}`,
                'Accept': 'application/json'
            }
        }; 

        const body = JSON.stringify({ token: localStorage.getItem('access') });
		
        try { 
			const apiCheckAuthenticatedPost = await axios.post(`${localhost}/auth/jwt/verify/`, body, config)
			
            if (apiCheckAuthenticatedPost.data.code !== 'token_not_valid') {				
                return true
            } else {
				toast.error(i18n.t("toast.check__authenticated"))
                return false;
            }
        } catch {
			return false;
        }

    } else {
        return false;
    }
}

export async function apiLoadGames(): Promise<Game[]> {
	const gamesURL = `${localhost}/games`;
	
	const config = {
		headers: {
			'Content-Type': 'application/json',
			'Accept-Language': `${i18n.resolvedLanguage}`
		}
	};
	try {
		const gamesResponse = await axios.get<Game[]>(gamesURL, config);
		return gamesResponse.data;
	} catch (error) {
		toast.error(i18n.t("toast.load__games__error"));
		throw new Error(i18n.t("toast.load__games__error"));
	}
	
}

export async function apiLoadRegions(): Promise<Region[]> {
	const regionsURL = `${localhost}/regions`;
	
	const config = {
		headers: {
			'Content-Type': 'application/json',
			'Accept-Language': `${i18n.resolvedLanguage}`
		}
	};
	try {
		const regionsResponse = await axios.get<Region[]>(regionsURL, config);
		return regionsResponse.data;
	} catch (error) {
		toast.error(i18n.t("toast.load__regions__error"));
		throw new Error(i18n.t("toast.load__regions__error"));
	}
}

export async function apiLoadFacilities({ pageParam = 1, searchQuery = '', selectedGameOption = null, selectedRegionOption = null}: { pageParam: number; searchQuery: string; selectedGameOption: Game | null; selectedRegionOption: Region | null; }): Promise<Facility[]> {
	let facilitiesURL = `${localhost}/facilities/?page=${pageParam}&title_or_address=${searchQuery}`;
	
	if (selectedGameOption !== null) {
		facilitiesURL += `&facility_game_id=${selectedGameOption.id}`;
	}
	if (selectedRegionOption !== null) {
		facilitiesURL += `&facility_region_id=${selectedRegionOption.id}`;
	}
	
	const config = {
		headers: {
			'Content-Type': 'application/json',
			'Accept-Language': `${i18n.resolvedLanguage}`
		}
	};
	try {
		const facilitiesResponse = await axios.get<Facility[]>(facilitiesURL, config);
		return facilitiesResponse.data;
	} catch (error) {
		toast.error(i18n.t("toast.load__facilities__error"));
		return [];
	}
}

export async function apiLoadFacilityMapCoordinates({ selectedGameOption, selectedRegionOption}: { selectedGameOption: Game | null; selectedRegionOption: Region | null; }): Promise<FacilityMapCoordinates[]> {
	let facilityMapCoordinatesURL = `${localhost}/facilities-map-coordinates/?title_or_address=`;
	
	if (selectedGameOption !== null) {
		facilityMapCoordinatesURL += `&facility_game_id=${selectedGameOption.id}`;
	}
	if (selectedRegionOption !== null) {
		facilityMapCoordinatesURL += `&facility_region_id=${selectedRegionOption.id}`;
	}

	const config = {
		headers: {
			'Content-Type': 'application/json',
			'Accept-Language': `${i18n.resolvedLanguage}`
		}
	};

	try {
		const facilityMapCoordinatesResponse = await axios.get(facilityMapCoordinatesURL, config);
		return facilityMapCoordinatesResponse.data;
	} catch (error) {
		toast.error(i18n.t("toast.load__coordinates__error"));
		return [];
	}
}

export async function apiLoadFacilityDetails(facilityID: string) {
	const facilityDetailsURL = `${localhost}/facility/${facilityID}/`;
	
	const config = {
		headers: {
			'Content-Type': 'application/json',
			'Accept-Language': `${i18n.resolvedLanguage}`
		}
	};

	try {
		const facilityDetailsResponse = await axios.get(facilityDetailsURL, config);
		
		return facilityDetailsResponse.data;
	} catch (error) {
		return error;
	}
}

export async function apiCreateBooking({user, room, date, timeRange}: {user: number; room: number; date: string; timeRange: string[];}) {
	const createBookingURL = `${localhost}/bookings/`;

	const config = {
		headers: {
			'Content-Type': 'application/json',
			'Accept-Language': `${i18n.resolvedLanguage}`
		}
	};

	const body = {
        user: user,
        room: room,
        date: date,
        time: timeRange
    };
	
	try {
        await axios.post(createBookingURL, body, config);
	} catch (error){		
        toast.error(i18n.t("toast.booking__error"));
	}
}

export async function apiLoadBookings(userID: number) {
	const bookingsURL = `${localhost}/bookings/?user=${userID}`;
	
	const config = {
		headers: {
			'Content-Type': 'application/json',
			'Accept-Language': `${i18n.resolvedLanguage}`
		}
	};

	try {
		const bookingsResponse = await axios.get(bookingsURL, config);
		return bookingsResponse.data;
	} catch (error) {
		return error;
	}
}

export async function apiLoadSearchedUsers(searchQuery: string) {
	const searchedUsersURL = `${localhost}/users/?username=${searchQuery}`;
	
	const config = {
		headers: {
			'Content-Type': 'application/json',
			'Accept-Language': `${i18n.resolvedLanguage}`
		}
	};

	try {
		const bsearchedUsersResponse = await axios.get(searchedUsersURL, config);
		
		return bsearchedUsersResponse.data;
	} catch (error) {
		return error;
	}
}

export async function apiCreateInvitation({senderID, receiverID, bookingID}: {senderID: number; receiverID: number; bookingID: number;}) {
	const createInvitationURL = `${localhost}/invitations/`;

	const config = {
		headers: {
			'Content-Type': 'application/json',
			'Accept-Language': `${i18n.resolvedLanguage}`
		}
	};

	const body = {
        sender: senderID,
        receiver: receiverID,
        booking: bookingID
    };
	
	try {
        await axios.post(createInvitationURL, body, config);
		toast.success(i18n.t("toast.invite__success"))
	} catch (error){		
		if (error.response.data.error) {
            toast.error(error.response.data.error);
        } else {
            toast.error(i18n.t("toast.invite__error"))
        }
		throw error;
		
	}
}

export async function apiLoadNotifications(userID: number) {
	const notificationsURL = `${localhost}/notifications/?receiver=${userID}`;
	
	const config = {
		headers: {
			'Content-Type': 'application/json',
			'Accept-Language': `${i18n.resolvedLanguage}`
		}
	};

	try {
		const notificationsResponse = await axios.get(notificationsURL, config);		
		return notificationsResponse.data;
	} catch (error) {
		return error;
	}
}

export async function apiAcceptInvitation({invitationID}: {invitationID: string}) {
	const acceptInvitationURL = `${localhost}/invitations/${invitationID}/`;
	
	const config = {
		headers: {
			'Content-Type': 'application/json',
			'Accept-Language': `${i18n.resolvedLanguage}`
		}
	};

	try {
		const acceptInvitationResponse = await axios.put(acceptInvitationURL, { status: 'accepted' }, config);
		return acceptInvitationResponse.data;
	} catch (error) {
		return error;
	}
}

export async function apiRejectInvitation({invitationID}: {invitationID: string}) {
	const rejectInvitationURL = `${localhost}/invitations/${invitationID}/`;
	
	const config = {
		headers: {
			'Content-Type': 'application/json',
			'Accept-Language': `${i18n.resolvedLanguage}`
		}
	};

	try {
		const rejectInvitationResponse = await axios.put(rejectInvitationURL, { status: 'rejected' }, config);
		return rejectInvitationResponse.data;
	} catch (error) {
		return error;
	}
}

export async function apiExcludeInvitation({ bookingID, excludeUserID }: { bookingID: number; excludeUserID: number; }) {
	const rejectInvitationURL = `${localhost}/bookings/${bookingID}/exclude_user/`;
	
	const config = {
		headers: {
			'Content-Type': 'application/json',
			'Accept-Language': `${i18n.resolvedLanguage}`
		}
	};

	try {
		const rejectInvitationResponse = await axios.post(rejectInvitationURL, { user_id: excludeUserID }, config);
		return rejectInvitationResponse.data;
	} catch (error) {
		return error;
	}
}