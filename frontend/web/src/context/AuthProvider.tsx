import { useEffect, useReducer } from "react";
import { AuthContext, AuthState } from "./AuthContext";

type AuthUser = {
	createdAt: string;
	email: string;
	name: string;
	password: string;
	updatedAt: string;
	__v: number;
	_id: string;
};

export type AuthPayload = {
	token: string;
} & AuthUser;

export type AuthAction =
	| { type: "LOGIN"; payload: AuthPayload }
	| { type: "LOGOUT" };

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

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
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
