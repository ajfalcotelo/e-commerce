import { Outlet } from "react-router";

export const AuthLayout = () => {
	return (
		<div className="h-screen w-full">
			<div className="mt-10 flex h-4/5 w-full">
				<div className="signup-hero w-[55%]"></div>
				<div className="flex flex-1 items-center justify-center">
					<Outlet />
				</div>
			</div>
		</div>
	);
};
