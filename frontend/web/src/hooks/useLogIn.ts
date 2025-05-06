import { useState } from "react";
import { useAuthContext } from "@/hooks/useAuthContext";
import { ApiError, api } from "@/services/api";

type LogIn = {
	email: string;
	password: string;
};

export const useLogIn = ({ email, password }: LogIn) => {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);
	const { dispatch } = useAuthContext();

	const login = async () => {
		setIsLoading(true);
		setError(null);

		try {
			const response = await api.post("/user/login", { email, password });
			const { token, user } = response.data;

			setIsLoading(false);
			localStorage.setItem("user", JSON.stringify({ token, ...user }));
			dispatch({ type: "LOGIN", payload: { token, ...user } });
		} catch (error) {
			setIsLoading(false);
			setError((error as ApiError)?.error);
		}
	};

	return { login, isLoading, error };
};
