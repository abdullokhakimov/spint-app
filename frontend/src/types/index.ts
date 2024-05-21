export type typeUser = {
	id: string,
	username: string;
	email: string;
	is_owner: boolean
};

export type typeNewUser = {
	username: string;
	email: string;
	password: string;
	re_password: string;
};

export type typeUserContext = {
	user: typeNewUser;
	isLoading: boolean;
	setUser: React.Dispatch<React.SetStateAction<typeNewUser>>;
	isAuthenticated: boolean;
	setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
	checkAuthUser: () => Promise<boolean>;
}

export type typeNavLink = {
	svg: string;
	route: string;
	label: string;
};

export type Game = {
	id: number;
	title: string;
	svg_icon_colored: string; 
	svg_icon_non_colored: string; 
}

export type Region = {
	id: number;
	title: string; 
}

export type Facility = {
	id: number;
	title: string; 
	game: Game;
	region: Region;
	image_url: null | string;
	adress: string;
	adress_url: string;
	start_time?: string;
	end_time?: string;
	phone?: string;
}

export type ModalProps = {
  showModal: boolean;
  children: React.ReactNode;
  title: string;
  onModalClose?: () => void;
}

export type SearchInputProps = {
  onSearch: (search: string) => void;
}
export type FacilityListProps = {
	selectedGameOption: Game | null;
	setSelectedGameOption: (game: Game | null) => void;
	selectedRegionOption: Region | null;
	setSelectedRegionOption: (region: Region | null) => void;
}
export type FacilityFiltersProps = {
	games: Game[];
  	regions: Region[];
	isLoadingFiltersData: boolean;
	selectedGameOption: Game | null;
	setSelectedGameOption: (game: Game | null) => void;
	selectedRegionOption: Region | null;
	setSelectedRegionOption: (region: Region | null) => void;
	showMapOnMobile: boolean;
}

export type FacilityMapCoordinates = {
	id: number;
	title: string;
	address_coordinates: string;
	start_time: string;
	end_time: string;
}
export type Booking = {
	id: number;
	date: string;
	time: string;
	invited_users: number[];
}
export type Benefit = {
	id: number;
	title: string;
	svg_icon: string
}
export type Room = {
	id: number;
	title: string;
	price: number;
	bookings: Booking[],
	benefits: Benefit[]
}
export type FacilityDetails = {
	id: number;
	title: string;
	game: Game[];
	region: Region[];
	rooms: Room[];
	image_urls: string;
	address: string;
	address_coordinates: string;
	address_url: string;
	start_time: string;
	end_time : string;
	phone: string;
}
export type TimepickerProps = {
	selectedDate: Date;
	interval: number;
	room: Room;
	selectedTimeRange: string[];
	setSelectedTimeRange: (string: string[]) => void;
	startTime: string; 
	endTime: string;
}

export type FilteredBooking = {
	id: number;
	user: string;
	facility_title: string;
	facility_id: number;
	room_id: number;
	room_title: string;
	date: string;
	time: string;
	room_price: number;
	invited_users: typeUser[];
}
export type Notification = {
	id: number;
	receiver: number;
	message: string;
	type: string;
	created_at: string;
	invitation: number;
}