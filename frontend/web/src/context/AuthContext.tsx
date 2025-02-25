import { createContext, useEffect, useReducer } from "react";

type AuthUser = {
	createdAt: string;
	email: string;
	name: string;
	password: string;
	updatedAt: string;
	__v: number;
	_id: string;
};

type AuthPayload = {
	token: string;
} & AuthUser;

type AuthState = {
	user: AuthPayload | null;
};

type AuthAction = { type: "LOGIN"; payload: AuthPayload } | { type: "LOGOUT" };

type AuthContextType = {
	dispatch: React.Dispatch<AuthAction>;
} & AuthState;

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
	switch (action.type) {
		case "LOGIN":
			return { user: action.payload };
		case "LOGOUT":
			return { user: null };
		default:
			return state;
	}
};

const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
	const [state, dispatch] = useReducer(authReducer, { user: null });

	console.log("AuthContext state: ", state);

	useEffect(() => {
		const userStorage = localStorage.getItem("user");

		if (userStorage) {
			const user = JSON.parse(userStorage);
			dispatch({ type: "LOGIN", payload: user });
		} else if (!userStorage) {
			dispatch({ type: "LOGOUT" });
		}
	}, []);

	return (
		<AuthContext.Provider value={{ ...state, dispatch }}>
			{children}
		</AuthContext.Provider>
	);
};

export { AuthContextProvider, AuthContext };
