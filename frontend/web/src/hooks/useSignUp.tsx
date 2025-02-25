import { useState } from "react";
import useAuthContext from "./useAuthContext";

type SignIn = {
	name: string;
	email: string;
	password: string;
};

const useSignUp = ({ name, email, password }: SignIn) => {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);
	const { dispatch } = useAuthContext();

	const signup = async () => {
		setIsLoading(true);
		setError(null);

		try {
			const response = await fetch("http://localhost:8000/api/user/signup", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ name, email, password }),
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

	return { signup, isLoading, error };
};

export default useSignUp;
