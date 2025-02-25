import { Outlet, useNavigate } from "react-router";
import useAuthContext from "../hooks/useAuthContext";
import { useEffect } from "react";

const AuthLayout = () => {
	const { user } = useAuthContext();
	const navigate = useNavigate();

	useEffect(() => {
		console.log(user);
		if (user) {
			navigate("/");
		}
	}, [user, navigate]);

	return (
		<div className="w-full h-screen">
			<div className="h-4/5 flex w-full mt-10">
				<div className="w-[55%] signup-hero"></div>
				<div className="flex-1 flex justify-center items-center">
					<Outlet />
				</div>
			</div>
		</div>
	);
};

export default AuthLayout;
