import { createContext } from "react";
import { AuthAction, AuthPayload } from "@/context/AuthProvider";

export type AuthState = {
	user: AuthPayload | null;
};

type AuthContextType = {
	dispatch: React.Dispatch<AuthAction>;
} & AuthState;

export const AuthContext = createContext<AuthContextType | undefined>(
	undefined,
);
