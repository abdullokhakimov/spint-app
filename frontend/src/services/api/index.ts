import axios from "axios";
import { toast } from "sonner";
import { FacilityMapCoordinates, Game, loadFacilities, Region, typeInitialStateUpdatedUser, typeNewUser } from "../../types";
import i18n from '../../i18n';

// const localhost = 'https://spint.uz/api'
const localhost = 'http://192.168.0.113:8000/api'


export async function apiCreateNewUser(user: typeNewUser) {
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
		toast.success(i18n.t("toast.create__new__user__success"));
	} catch (error) {
		if (axios.isAxiosError(error)) {
			let apiErrorMessage = '';
			if (error.response && error.response.data) {
				apiErrorMessage = Object.values(error.response.data)[0] as string;
				toast.error(apiErrorMessage);
			} else {
				toast.error(i18n.t("toast.create__new__user__error"));
			}
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
		if (axios.isAxiosError(error)) {
			let apiErrorMessage = '';
			if (error.response && error.response.data) {
				apiErrorMessage = Object.values(error.response.data)[0] as string;
				toast.error(apiErrorMessage);
			} else {
				toast.error(i18n.t("toast.login__error"));
			}
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

export async function apiResetPassword (email: string) {
    const config = {
        headers: {
            'Content-Type': 'application/json',
			'Accept-Language': `${i18n.resolvedLanguage}`,
        }
    }; 

    const body = JSON.stringify({ email });

    await axios.post(`${localhost}/auth/users/reset_password/`, body, config);
};

export async function apiResetPasswordConfirm({ uid, token, new_password, re_new_password }: { uid: string | undefined; token: string | undefined; new_password: string; re_new_password: string; }) {
	const config = {
		headers: {
			'Content-Type': 'application/json',
			'Accept-Language': `${i18n.resolvedLanguage}`
		}
	};

	const body = JSON.stringify({ uid, token, new_password, re_new_password });

	try {
		await axios.post(`${localhost}/auth/users/reset_password_confirm/`, body, config);
		toast.success(i18n.t("toast.reset__password__confirm__success"));
	} catch (error) {
		if (axios.isAxiosError(error)) {
			let apiErrorMessage = '';
			if (error.response && error.response.data) {
				apiErrorMessage = Object.values(error.response.data)[0] as string;
				toast.error(apiErrorMessage);
			} else {
				toast.error(i18n.t("toast.reset__password__confirm__error"));
			}
		} else {
			toast.error(i18n.t("toast.reset__password__confirm__error"));
		}
	}
}

export async function apiUpdateUserInformation(user: typeInitialStateUpdatedUser) {
	const config = {
		headers: {
			'Content-Type': 'multipart/form-data',
			'Accept-Language': `${i18n.resolvedLanguage}`,
            'Authorization': `JWT ${localStorage.getItem('access')}`,
		}
	};

	let formData = new FormData();
	formData.append('username', user.username);

	if (user.birth_date !== null) {
		const [day, month, year] = user.birth_date.split('.');
		const formattedDate = `${year}-${month}-${day}`;
		formData.append('birth_date', formattedDate);
	}

	if (user.favorite_sports !== null) {
		formData.append('favorite_sports', JSON.stringify(user.favorite_sports));
	}

	if (user.free_time !== null) {
		formData.append('free_time', user.free_time);
	}

	if (user.home_coordinates !== null) {
		formData.append('home_coordinates', JSON.stringify(user.home_coordinates));
	}

	if (user.logo !== null && typeof user.logo !== 'string') {
		formData.append('logo', user.logo);
	}

	try {
		await axios.put(`${localhost}/api/user/update/`, formData, config);				
	} catch (error) {
		toast.error(i18n.t("toast.update__user__error"));		
		return error;
	}
}

export async function apiLoadGames(): Promise<Game[]> {
	const gamesURL = `${localhost}/api/games/`;
	
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
	const regionsURL = `${localhost}/api/regions/`;
	
	const config = {
		headers: {
			'Content-Type': 'application/json',
			'Accept-Language': `${i18n.resolvedLanguage}`,
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

export async function apiLoadFacilities({ pageParam = 1, searchQuery = '', selectedGameOption = null, selectedRegionOption = null}: { pageParam?: number | undefined; searchQuery: string; selectedGameOption: Game | null; selectedRegionOption: Region | null; }): Promise<loadFacilities> {
	let facilitiesURL = `${localhost}/api/facilities/?page=${pageParam}&title_or_address=${searchQuery}`;
	
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
		const facilitiesResponse = await axios.get(facilitiesURL, config);
		
		return facilitiesResponse.data;
	} catch (error) {
		toast.error(i18n.t("toast.load__facilities__error"));
		return { next_page_param: undefined, results: []};
	}
}

export async function apiLoadFacilityMapCoordinates({ selectedGameOption, selectedRegionOption}: { selectedGameOption: Game | null; selectedRegionOption: Region | null; }): Promise<FacilityMapCoordinates[]> {
	let facilityMapCoordinatesURL = `${localhost}/api/facilities-map-coordinates/?title_or_address=`;
	
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

export async function apiLoadFacilityDetails(facilityID: string | undefined) {
	const facilityDetailsURL = `${localhost}/api/facility/${facilityID}/`;
	
	const config = {
		headers: {
			'Content-Type': 'application/json',
			'Accept-Language': `${i18n.resolvedLanguage}`
		}
	};
	const facilityDetailsResponse = await axios.get(facilityDetailsURL, config);
	
	return facilityDetailsResponse.data;
}

export async function apiCreateOrder({user, room, date, timeRange, paymentOption, totalPrice}: {user: number; room: number; date: string; timeRange: string[]; paymentOption: string; totalPrice: number;}) {
	const createOrderURL = `${localhost}/api/orders/`;

	const totalPriceInSums = totalPrice * 1000;

	const config = {
		headers: {
			'Content-Type': 'application/json',
			'Accept-Language': `${i18n.resolvedLanguage}`
		}
	};

	const body = {
		status: paymentOption,
		total_price: totalPriceInSums,
        user: user,
        room_id: room,
        date: date,
        time: timeRange
    };
	
	try {		
        const createOrderResponse = await axios.post(createOrderURL, body, config);
		window.location.href = createOrderResponse.data.payme_checkout_link;
	} catch (error){		
        toast.error(i18n.t("toast.booking__error"));
	}
}

export async function apiLoadOrders(userID: number, is_owner: boolean) {	
	let ordersURL = "";
	if (is_owner == true) {
		ordersURL = `${localhost}/api/orders/?user=&owner=${userID}`;
	}else{
		ordersURL = `${localhost}/api/orders/?user=${userID}`;
	}	
	
	const config = {
		headers: {
			'Content-Type': 'application/json',
			'Accept-Language': `${i18n.resolvedLanguage}`
		}
	};

	try {
		const bookingsResponse = await axios.get(ordersURL, config);
		return bookingsResponse.data;
	} catch (error) {
		return error;
	}
}

export async function apiLoadOrderByUUID(uuid: string) {	
	const orderByUUIDURL = `${localhost}/api/orders/by-uuid/${uuid}/`;
	
	const config = {
		headers: {
			'Content-Type': 'application/json',
			'Accept-Language': `${i18n.resolvedLanguage}`
		}
	};

	try {
		const orderByUUIDResponse = await axios.get(orderByUUIDURL, config);		
		return orderByUUIDResponse.data;
	} catch (error) {
		if (axios.isAxiosError(error)) {
            return null;
        } else {
            return null;
        }
	}
}

export async function apiLoadSearchedUsers(searchQuery: string) {
	const searchedUsersURL = `${localhost}/api/users/?username=${searchQuery}`;
	
	const config = {
		headers: {
			'Content-Type': 'application/json',
			'Accept-Language': `${i18n.resolvedLanguage}`
		}
	};

	try {
		const searchedUsersResponse = await axios.get(searchedUsersURL, config);
		console.log(searchedUsersResponse.data);
				
		return searchedUsersResponse.data;
	} catch (error) {
		return error;
	}
}

export async function apiCreateInvitation({senderID, receiverID, orderID}: {senderID: number; receiverID: number; orderID: number;}) {
	const createInvitationURL = `${localhost}/api/invitations/`;

	const config = {
		headers: {
			'Content-Type': 'application/json',
			'Accept-Language': `${i18n.resolvedLanguage}`
		}
	};

	const body = {
        sender: senderID,
        receiver: receiverID,
        order: orderID
    };
	
	try {
        await axios.post(createInvitationURL, body, config);
		toast.success(i18n.t("toast.invite__success"))
	} catch (error){		
		if (axios.isAxiosError(error)) {
			if (error.response && error.response.data && error.response.data.error) {
				toast.error(error.response.data.error);
			} else {
				toast.error(i18n.t("toast.invite__error"));
			}
		} else {
			toast.error(i18n.t("toast.invite__error"));
		}				
	}
}

export async function apiInviteByUuid({senderID, receiverID, orderID}: {senderID: number; receiverID: number; orderID: number;}) {
	const inviteByUuidURL = `${localhost}/api/invitations/invite_by_uuid/`;

	const config = {
		headers: {
			'Content-Type': 'application/json',
			'Accept-Language': `${i18n.resolvedLanguage}`
		}
	};

	const body = {
        sender: senderID,
        receiver: receiverID,
        order: orderID
    };
	
	try {
        await axios.post(inviteByUuidURL, body, config);
		toast.success(i18n.t("toast.invite__success"))
	} catch (error){		
		toast.error(i18n.t("toast.invite__error"));			
	}
}

export async function apiLoadNotifications(userID: number) {
	const notificationsURL = `${localhost}/api/notifications/?receiver=${userID}`;
	
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

export async function apiLoadUnreadNotifications(userID: number) {
	const notificationsURL = `${localhost}/api/notifications/unread_length/?receiver_id=${userID}`;
	
	const config = {
		headers: {
			'Content-Type': 'application/json',
			'Accept-Language': `${i18n.resolvedLanguage}`
		}
	};

	if ( userID != 0 ) {
		try {
			const notificationsResponse = await axios.get(notificationsURL, config);		
			return notificationsResponse.data;
		} catch (error) {
			return error;
		}
	} else {
		return { unread_notification_count: 0 };
	}
}

export async function apiReadNotifications({userID}: {userID: number}) {
	const readNotificationsURL = `${localhost}/api/notifications/mark_as_read/`;
	
	const config = {
		headers: {
			'Content-Type': 'application/json',
		}
	};
	
	const body = {
		receiver_id: userID,
	}	
	try {
		await axios.post(readNotificationsURL, body, config);
	} catch (error) {		
		toast.error("Server error");
	}
}

export async function apiAcceptInvitation({invitationID}: {invitationID: number}) {
	const acceptInvitationURL = `${localhost}/api/invitations/${invitationID}/`;
	
	const config = {
		headers: {
			'Content-Type': 'application/json',
			'Accept-Language': `${i18n.resolvedLanguage}`
		}
	};

	try {
		await new Promise(resolve => setTimeout(resolve, 10000))
		const acceptInvitationResponse = await axios.put(acceptInvitationURL, { status: 'accepted' }, config);
		return acceptInvitationResponse.data;
	} catch (error) {
		return error;
	}
}

export async function apiRejectInvitation({invitationID}: {invitationID: number}) {
	const rejectInvitationURL = `${localhost}/api/invitations/${invitationID}/`;
	
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

export async function apiExcludeInvitation({ orderID, excludeUserID }: { orderID: number; excludeUserID: number; }) {
	const rejectInvitationURL = `${localhost}/api/orders/${orderID}/exclude_user/`;
	
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

export async function apiSendVerificationCode({ phoneNumber }: { phoneNumber: number; }) {
	const sendVerificationCodeURL = `${localhost}/api/send-verification-code/`;

	const config = {
		headers: {
			'Content-Type': 'application/json',
			'Accept-Language': `${i18n.resolvedLanguage}`
		}
	};

	const body = {
		phone_number: phoneNumber,
    };
	
	try {
        const sendVerificationCodeResponse = await axios.post(sendVerificationCodeURL, body, config);
		return sendVerificationCodeResponse.data;
	} catch (error){		
		if (axios.isAxiosError(error)) {
			if (error.response && error.response.data && error.response.data.error) {
				toast.error(error.response.data.error);
			} else {
				toast.error(i18n.t("toast.phonenumber__error"));
			}
		} else {
			toast.error(i18n.t("toast.phonenumber__error"));
		}	
	}
}

export async function apiSavePhoneNumber({ userID, phoneNumber }: { userID:number; phoneNumber: number; }) {
	const savePhoneNumberURL = `${localhost}/api/add-phone-number/`;

	const config = {
		headers: {
			'Content-Type': 'application/json',
			'Accept-Language': `${i18n.resolvedLanguage}`
		}
	};

	const body = {
		user_id: userID,
		phone_number: phoneNumber,
    };
	
	try {		
        await axios.post(savePhoneNumberURL, body, config);
	} catch (error){		
        toast.error(i18n.t("toast.phonenumber__save__error"));
	}
}

export async function apiLoadUsers() {
	const usersURL = `${localhost}/api/users/`;
	
	const config = {
		headers: {
			'Content-Type': 'application/json',
			'Accept-Language': `${i18n.resolvedLanguage}`
		}
	};

	try {
		const usersResponse = await axios.get(usersURL, config);		
		return usersResponse.data;
	} catch (error) {
		return error;
	}
}

export async function apiLoadAddress (coordinatess: [number, number]){
	const [lat, lon] = coordinatess;

	if (lat && lon) {
		try {
			const response = await axios.get(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&addressdetails=1`);
			if (response.data && response.data.display_name) {
				return response.data.display_name;
			} else {
				return i18n.t("profile.personal_information.change_home.address__not_found");
			}
		} catch (error) {
			return i18n.t("profile.personal_information.change_home.address__error");
		}	
	}else{
		return [];
	}
};