import { createContext, useContext, useEffect, useState } from 'react';
import { typeUser, typeUserContext } from '../types'; // Assuming these are defined elsewhere
import { apiCheckAuthenticated, apiLoadUser } from '../services/api';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
 
const initialUser = {
	id: "",
	username: "",
	email: "",
	is_owner: false
} 

const initialState = {
	user: initialUser,
	isLoading: false,
	isAuthenticated: false,
	checkAuthUser: async () => false as boolean,
};

export const AuthContext = createContext<typeUserContext>(initialState);

export function AuthProvider({ children }: { children: React.ReactNode }) {
	const [user, setUser] = useState<typeUser>(initialState.user);
	const [isLoading, setIsLoading] = useState(initialState.isLoading);
	const [isAuthenticated, setIsAuthenticated] = useState(initialState.isAuthenticated);
	const navigate = useNavigate();

	const logout = async () => {
		setUser(initialState.user);
		setIsAuthenticated(false);

		localStorage.removeItem('access');
		localStorage.removeItem('refresh');

		navigate("/login");
		toast.info('Вы вышли из аккаунта')
	};

	const checkAuthUser = async () => {
		setIsLoading(true);
		try {
			const currentUserCheck = await apiCheckAuthenticated();
			
			const currentUser = await apiLoadUser();

			if (currentUser && currentUserCheck) {
				setUser({
					id: currentUser.id,
					username: currentUser.username,
					email: currentUser.email,
					is_owner: currentUser.is_owner
				});
				setIsAuthenticated(true);
				return true;
			} else {
				setUser(initialUser);
				setIsAuthenticated(false);
				return false;
			}
		} catch (error) {
			setUser(initialUser);
			setIsAuthenticated(false);			
			return false;
		} finally {
			setIsLoading(false);
		}
	};


	useEffect(() => {
		const storedToken = localStorage.getItem('access');
		
		if (storedToken) {
			checkAuthUser();
		}
	}, []);

	const value = {
		user,
		isLoading,
		isAuthenticated,
		checkAuthUser,
		logout,
	};

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthProvider;

export const useUserContext = () => useContext(AuthContext);