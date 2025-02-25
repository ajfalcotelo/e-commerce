import useAuthContext from "../hooks/useAuthContext.tsx";
import useLogOut from "../hooks/useLogOut.tsx";
import { NAV } from "../utils/constant.ts";
import { Button } from "./ui/Button.tsx";
import { HeaderLink } from "./ui/HeaderLink.tsx";
import LinkButton from "./ui/LinkButton.tsx";
import SearchInput from "./ui/SearchInput.tsx";

export const Header = () => {
	const { user } = useAuthContext();
	const { logout } = useLogOut();

	const handleLogOutClick = () => {
		logout();
		console.log("Logged Out");
	};

	return (
		<header className="flex flex-row justify-between items-center px-[16vw] h-24 border-b border-b-border-grey">
			<HeaderLink
				route={NAV.HOME.ROUTE}
				className="text-4xl font-bold font-inter select-none text-black"
				isLogo
			>
				{NAV.LOGO.NAME}
			</HeaderLink>
			<div className="grid grid-cols-3 place-items-center w-[25%] text-xl">
				<HeaderLink route={NAV.HOME.ROUTE}>{NAV.HOME.NAME}</HeaderLink>
				<HeaderLink route={NAV.CONTACT.ROUTE}>{NAV.CONTACT.NAME}</HeaderLink>
				<HeaderLink route={NAV.ABOUT.ROUTE}>{NAV.ABOUT.NAME}</HeaderLink>
			</div>

			<SearchInput />

			{user ? (
				<div className="grid grid-cols-[2fr_1fr] w-50 h-10 place-items-center gap-3">
					<span>{user.email}</span>
					<Button
						className="w-20 h-10"
						variant={"classic_white"}
						onClick={handleLogOutClick}
					>
						Log Out
					</Button>
				</div>
			) : (
				<div className="grid grid-cols-2 w-44 h-10 gap-3">
					<LinkButton
						route={NAV.LOGIN.ROUTE}
						variant={"classic_white"}
						className="place-content-center"
					>
						{NAV.LOGIN.NAME}
					</LinkButton>
					<LinkButton
						route={NAV.SIGNUP.ROUTE}
						variant={"classic_white"}
						className="place-content-center"
					>
						{NAV.SIGNUP.NAME}
					</LinkButton>
				</div>
			)}
		</header>
	);
};
