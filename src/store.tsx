import { getLoggedInUser, getUserToken } from './helper';
import React, { useContext, useMemo, useState } from 'react';

interface IAuth {
	isAuthenticated: boolean;
	username: string;
	setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
}

const AuthContext = React.createContext<IAuth>({
	isAuthenticated: false,
	username: '',
	setIsAuthenticated: () => {},
});

const getAuthState = (): boolean => !!getUserToken();

const AuthContextProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [isAuthenticated, setIsAuthenticated] = useState<boolean>(getAuthState);

	const username: string = useMemo(() => getLoggedInUser(), [isAuthenticated]);

	return (
		<AuthContext.Provider
			value={{
				isAuthenticated,
				username,
				setIsAuthenticated,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = (): IAuth => useContext<IAuth>(AuthContext);




export default AuthContextProvider;
