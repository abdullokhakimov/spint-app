export type typeUser = {
	id: number,
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
  user: typeUser;
  isLoading: boolean;
  isAuthenticated: boolean;
  checkAuthUser: () => Promise<boolean>;
  setUser: React.Dispatch<React.SetStateAction<typeUser>>;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  logout: () => Promise<void>;
};

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
export type loadFacilities = {
	next_page_param?: number;
	results: Facility[];
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
	showMapOnMobile: boolean;
}
export type FacilityFiltersProps = {
	games: Game[] | undefined;
  	regions: Region[] | undefined;
	isLoadingFiltersData: boolean;
	selectedGameOption: Game | null;
	setSelectedGameOption: (game: Game | null) => void;
	selectedRegionOption: Region | null;
	setSelectedRegionOption: (region: Region | null) => void;
	showMapOnMobile?: boolean;
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
	bookings: Booking[];
	benefits: Benefit[];
}
export type FacilityDetails = {
	id: number;
	title: string;
	game: Game;
	region: Region;
	rooms: Room[];
	image_url: string;
	address: string;
	address_coordinates: string;
	address_url: string;
	start_time: string;
	end_time: string;
	phone: string;
}
export type TimepickerProps = {
	selectedDate: Date;
	interval: number;
	room: Room;
	selectedTimeRange: string[];
	setSelectedTimeRange: React.Dispatch<React.SetStateAction<string[]>>;
	startTime: string; 
	endTime: string;
}

export type FilteredOrder = {
	id: number;
	user: any;
	status: string;
	is_finished: boolean;
	facility_title: string;
	facility_id: number;
	room_id: number;
	room_title: string;
	date: string;
	time: string[];
	total_price: number;
	invited_users: typeUser[];
	payme_checkout_link: string | null;
}
export type Notification = {
	id: number;
	receiver: number;
	message: string;
	type: string;
	created_at: string;
	invitation: number;
	is_read: boolean;
}

export type Languages = {
	ru: { nativeName: string };
	uz: { nativeName: string };
};