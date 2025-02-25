import { useState } from "react";
import useAuthContext from "./useAuthContext";

type LogIn = {
	email: string;
	password: string;
};

const useLogIn = ({ email, password }: LogIn) => {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);
	const { dispatch } = useAuthContext();

	const login = async () => {
		setIsLoading(true);
		setError(null);

		try {
			const response = await fetch("http://localhost:8000/api/user/login", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ email, password }),
			});

			const json = await response.json();
			const { token, user } = json;

			if (!response.ok) {
				setIsLoading(false);
				setError(json.error);
			} else if (response.ok) {
				setIsLoading(false);
				localStorage.setItem("user", JSON.stringify({ token, ...user }));
				dispatch({ type: "LOGIN", payload: { token, ...user } });
			}
		} catch (error) {
			setIsLoading(false);
			setError((error as Error).message);
		}
	};

	return { login, isLoading, error };
};

export default useLogIn;
