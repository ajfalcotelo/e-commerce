import { useAuthContext } from "@/hooks/useAuthContext";
import { useLogOut } from "@/hooks/useLogOut";
import { NAV } from "@/utils/constant";
import { Button } from "@/components/ui/Button";
import { HeaderLink } from "@/components/ui/HeaderLink";
import { LinkButton } from "@/components/ui/LinkButton";
import { SearchInput } from "@/components/ui/SearchInput";

export const Header = () => {
	const { user } = useAuthContext();
	const { logout } = useLogOut();

	const handleLogOutClick = () => {
		logout();
		console.log("Logged Out");
	};

	return (
		<header
			className="flex h-24 flex-row items-center justify-between border-b border-b-black/30
				px-[16vw]"
		>
			<HeaderLink
				route={NAV.HOME.ROUTE}
				className="font-inter text-4xl font-bold text-black select-none"
				isLogo
			>
				{NAV.LOGO.NAME}
			</HeaderLink>
			<div className="grid w-[25%] grid-cols-3 place-items-center text-xl">
				<HeaderLink route={NAV.HOME.ROUTE}>{NAV.HOME.NAME}</HeaderLink>
				<HeaderLink route={NAV.CONTACT.ROUTE}>{NAV.CONTACT.NAME}</HeaderLink>
				<HeaderLink route={NAV.ABOUT.ROUTE}>{NAV.ABOUT.NAME}</HeaderLink>
			</div>

			<SearchInput />

			{user ? (
				<div className="grid h-10 w-50 grid-cols-[2fr_1fr] place-items-center gap-3">
					<span>{user.email}</span>
					<Button
						className="h-10 w-20"
						variant={"classic_white"}
						onClick={handleLogOutClick}
					>
						Log Out
					</Button>
				</div>
			) : (
				<div className="grid h-10 w-44 grid-cols-2 gap-3">
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
