import { useState } from "react";
import useAuthContext from "./useAuthContext";
import { auth, AuthError } from "../api/auth";

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
			const response = await auth.post("/signup", {
				name,
				email,
				password,
			});
			const { token, user } = response.data;

			setIsLoading(false);
			localStorage.setItem("user", JSON.stringify({ token, ...user }));
			dispatch({ type: "LOGIN", payload: { token, ...user } });
		} catch (error) {
			setIsLoading(false);
			setError((error as AuthError)?.error);
		}
	};

	return { signup, isLoading, error };
};

export default useSignUp;
