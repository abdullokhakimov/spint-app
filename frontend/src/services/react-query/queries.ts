import { useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query";
import { apiAcceptInvitation, apiCreateBooking, apiCreateInvitation, apiCreateNewUser, apiExcludeInvitation, apiLoadBookings, apiLoadFacilities, apiLoadFacilityDetails, apiLoadFacilityMapCoordinates, apiLoadGames, apiLoadNotifications, apiLoadRegions, apiLoadSearchedUsers, apiLoginUser, apiRejectInvitation, apiVerifyNewUser } from "../api";
import { FacilityDetails, FacilityMapCoordinates, FilteredBooking, Game, Region, typeNewUser, typeUser } from "../../types";

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
	const fetchFacilities = ({ pageParam = 1 }) => {
		return apiLoadFacilities({ pageParam, searchQuery, selectedGameOption, selectedRegionOption });
    };
	
	return useInfiniteQuery({
		queryKey: ['facilities', searchQuery, selectedGameOption, selectedRegionOption],
		getNextPageParam: (lastPage) => lastPage.next_page_param,
		queryFn: fetchFacilities,
		retry: 1,
	});
};

export const useLoadFacilityMapCoordinatesQuery = ({selectedGameOption, selectedRegionOption}: { selectedGameOption: Game | null; selectedRegionOption: Region | null; }) => {
	return useQuery<FacilityMapCoordinates[], Error>({
		queryKey: ['facilityMapCoordinates', selectedGameOption, selectedRegionOption],
		queryFn: () => apiLoadFacilityMapCoordinates({selectedGameOption, selectedRegionOption}),
	});
};

export const useLoadFacilityDetailsQuery = ({ id }: { id: string }) => {
    return useQuery<FacilityDetails[], Error>({
        queryKey: ['facilityDetails', id],
        queryFn: () => apiLoadFacilityDetails(id),
    });
};

export const useCreateBookingMutation = () => {
	return useMutation({
		mutationFn: ({user, room, date, timeRange}: {user: number; room:number; date:string; timeRange:string[];}) =>  apiCreateBooking({ user, room, date, timeRange })
	});
}

export const useLoadBookingsQuery = ({ id }: { id: number }) => {
    return useQuery<FilteredBooking[], Error>({
        queryKey: ['bookings', id],
        queryFn: () => apiLoadBookings(id),
    });
};

export const useLoadSearchedUsersQuery = ({ searchQuery }: { searchQuery: string }) => {
    return useQuery<typeUser[], Error>({
        queryKey: ['searchedUsers', searchQuery],
        queryFn: () => apiLoadSearchedUsers(searchQuery),
    });
};

export const useCreateInvitationMutation = () => {
	return useMutation({
		mutationFn: ({senderID, receiverID, bookingID}: {senderID: number; receiverID: number; bookingID: number;}) =>  apiCreateInvitation({ senderID, receiverID, bookingID })
	});
}

export const useLoadNotificationsQuery = ({ id }: { id: number }) => {
    return useQuery<Notification[], Error>({
        queryKey: ['notifications', id],
        queryFn: () => apiLoadNotifications(id),
    });
};

export const useAcceptInvitationMutation = () => {
	return useMutation({
		mutationFn: ({invitationID}: {invitationID: string;}) =>  apiAcceptInvitation({ invitationID })
	});
}

export const useRejectInvitationMutation = () => {
	return useMutation({
		mutationFn: ({invitationID}: {invitationID: string;}) =>  apiRejectInvitation({ invitationID })
	});
}

export const useExcludeInvitationMutation = () => {
	return useMutation({
		mutationFn: ({bookingID, excludeUserID}: {bookingID: number; excludeUserID: number;}) =>  apiExcludeInvitation({ bookingID, excludeUserID })
	});
}