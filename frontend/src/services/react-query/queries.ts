import { useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query";
import { apiAcceptInvitation, apiCreateOrder, apiCreateInvitation, apiCreateNewUser, apiExcludeInvitation, apiLoadOrders, apiLoadFacilities, apiLoadFacilityDetails, apiLoadFacilityMapCoordinates, apiLoadGames, apiLoadNotifications, apiLoadRegions, apiLoadSearchedUsers, apiLoginUser, apiRejectInvitation, apiVerifyNewUser, apiLoadUnreadNotifications, apiReadNotifications, apiSendVerificationCode, apiSavePhoneNumber, apiLoadOrderByUUID, apiInviteByUuid, apiLoadUsers, apiResetPassword, apiResetPasswordConfirm, apiLoadAddress, apiUpdateUserInformation } from "../api";
import { FacilityDetails, FacilityMapCoordinates, FilteredOrder, Game, loadFacilities, Notification, Region, typeInitialStateUpdatedUser, typeNewUser, typeUser } from "../../types";

export const useCreateNewUserMutation = () => {
	return useMutation({
		mutationFn: ( user: typeNewUser ) =>  apiCreateNewUser( user )
	});
}

export const useLoginUserMutation = () => {
	return useMutation({
		mutationFn: ( user: { username: string, password: string } ) =>  apiLoginUser( user )
	});
}

export const useVerifyNewUserMutation = () => {
	return useMutation({
		mutationFn: ( newUserUIDToken: string ) =>  apiVerifyNewUser( newUserUIDToken )
	});
}

export const useResetPasswordMutation = () => {
	return useMutation({
		mutationFn: ( email: string ) =>  apiResetPassword( email )
	});
}

export const useResetPasswordConfirmMutation = () => {
	return useMutation({
		mutationFn: ({ uid, token, new_password, re_new_password }: { uid: string | undefined; token: string | undefined; new_password: string; re_new_password: string; }) => apiResetPasswordConfirm({ uid, token, new_password, re_new_password })
	});
}

export const useUpdateUserInformationMutation = () => {
	return useMutation({
		mutationFn: ( user: typeInitialStateUpdatedUser ) =>  apiUpdateUserInformation( user )
	});
}

export const useLoadGamesQuery = () => {
	return useQuery<Game[], Error>({
		queryKey: ['games',],
		queryFn: () => apiLoadGames(),
	});
};

export const useLoadRegionsQuery = () => {
	return useQuery<Region[], Error>({
		queryKey: ['regions',],
		queryFn: () => apiLoadRegions(),
	});
};

export const useLoadFacilitiesInfiniteQuery = ({searchQuery, selectedGameOption, selectedRegionOption}: { searchQuery: string; selectedGameOption: Game | null; selectedRegionOption: Region | null; }) => {
    return useInfiniteQuery<loadFacilities, Error>({
        queryKey: ['facilities', searchQuery, selectedGameOption, selectedRegionOption],
        queryFn: ({ pageParam = 1 }) => apiLoadFacilities({ pageParam: pageParam as number, searchQuery, selectedGameOption, selectedRegionOption }),
        getNextPageParam: (lastPage) => lastPage.next_page_param,
        initialPageParam: 1,
        retry: 1,
    });
};

export const useLoadFacilityMapCoordinatesQuery = ({selectedGameOption, selectedRegionOption}: { selectedGameOption: Game | null; selectedRegionOption: Region | null; }) => {
	return useQuery<FacilityMapCoordinates[], Error>({
		queryKey: ['facilityMapCoordinates', selectedGameOption, selectedRegionOption],
		queryFn: () => apiLoadFacilityMapCoordinates({selectedGameOption, selectedRegionOption}),
	});
};

export const useLoadFacilityDetailsQuery = ({ id }: { id: string | undefined}) => {
    return useQuery<FacilityDetails, Error>({
        queryKey: ['facilityDetails', id],
        queryFn: () => apiLoadFacilityDetails(id),
    });
};

export const useCreateOrderMutation = () => {
	return useMutation({
		mutationFn: ({user, room, date, timeRange, paymentOption, totalPrice}: {user: number; room:number; date:string; timeRange:string[]; paymentOption: string; totalPrice: number;}) =>  apiCreateOrder({ user, room, date, timeRange, paymentOption, totalPrice })
	});
}

export const useLoadBookingsQuery = ({ id, is_owner }: { id: number; is_owner: boolean }) => {
    return useQuery<FilteredOrder[], Error>({
        queryKey: ['bookings', id, is_owner],
        queryFn: () => apiLoadOrders(id, is_owner),
		refetchOnWindowFocus: false,
    });
};

export const useLoadOrderByUUIDQuery = ({ uuid }: { uuid: string | undefined }) => {
    if (uuid) {
        return useQuery<FilteredOrder, Error>({
            queryKey: ['orderByUUID', uuid],
            queryFn: () => apiLoadOrderByUUID(uuid),
            refetchOnWindowFocus: false,
        });
    }
    return { isLoading: false, data: null };
};

export const useLoadSearchedUsersQuery = ({ searchQuery }: { searchQuery: string }) => {
    return useQuery<typeUser[], Error>({
        queryKey: ['searchedUsers', searchQuery],
        queryFn: () => apiLoadSearchedUsers(searchQuery),
    });
};

export const useCreateInvitationMutation = () => {
	return useMutation({
		mutationFn: ({senderID, receiverID, orderID}: {senderID: number; receiverID: number; orderID: number;}) =>  apiCreateInvitation({ senderID, receiverID, orderID })
	});
}

export const useInviteByUuidMutation = () => {
	return useMutation({
		mutationFn: ({senderID, receiverID, orderID}: {senderID: number; receiverID: number; orderID: number;}) =>  apiInviteByUuid({ senderID, receiverID, orderID })
	});
}

export const useLoadNotificationsQuery = ({ id }: { id: number }) => {
    return useQuery<Notification[], Error>({
        queryKey: ['notifications', id],
        queryFn: () => apiLoadNotifications(id),
		refetchOnWindowFocus: false,
    });
};

export const useLoadUnreadNotificationsQuery = ({ id }: { id: number }) => {
    return useQuery({
        queryKey: ['unread_notifications', id],
        queryFn: () => apiLoadUnreadNotifications(id),
		refetchOnWindowFocus: false,
    });
};

export const useReadNotificationsMutation = () => {
	return useMutation({
		mutationFn: ({userID}: {userID: number;}) =>  apiReadNotifications({ userID })
	});
}

export const useAcceptInvitationMutation = () => {
	return useMutation({
		mutationFn: ({invitationID}: {invitationID: number;}) =>  apiAcceptInvitation({ invitationID })
	});
}

export const useRejectInvitationMutation = () => {
	return useMutation({
		mutationFn: ({invitationID}: {invitationID: number;}) =>  apiRejectInvitation({ invitationID })
	});
}

export const useExcludeInvitationMutation = () => {
	return useMutation({
		mutationFn: ({orderID, excludeUserID}: {orderID: number; excludeUserID: number;}) =>  apiExcludeInvitation({ orderID, excludeUserID })
	});
}

export const useSendVerificationCodeMutation = () => {
	return useMutation({
		mutationFn: ({ phoneNumber }: { phoneNumber: number; }) =>  apiSendVerificationCode({ phoneNumber })
	});
}

export const useSavePhoneNumberMutation = () => {
	return useMutation({
		mutationFn: ({ userID, phoneNumber }: { userID: number; phoneNumber: number; }) =>  apiSavePhoneNumber({ userID, phoneNumber })
	});
}

export const useLoadUsersQuery = () => {
    return useQuery<typeUser[], Error>({
        queryKey: ['users'],
        queryFn: () => apiLoadUsers(),
    });
};

export const useLoadAddressQuery = (coordinates: [number, number] | null) => {
	return useQuery<string, Error>({
		queryKey: ['address', coordinates],
		queryFn: () => coordinates ? apiLoadAddress(coordinates) : Promise.reject("No coordinates"),
		enabled: !!coordinates, // Only run query if coordinates are not null
	});
};