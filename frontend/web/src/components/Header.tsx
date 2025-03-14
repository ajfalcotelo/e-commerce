import { useAuthContext } from "@/hooks/useAuthContext";
import { NAV, ROUTES } from "@/utils/constant";
import { HeaderLink } from "@/components/ui/HeaderLink";
import { LinkButton } from "@/components/ui/LinkButton";
import { SearchInput } from "@/components/ui/SearchInput";
import { UserPopover } from "@/components/UserPopover";
import { Link } from "react-router";
import { LuShoppingCart } from "react-icons/lu";

export const Header = () => {
	const { user } = useAuthContext();

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
				<div className="flex w-50 items-center gap-4">
					<Link
						to={ROUTES.HOME.CART}
						className="flex size-8 cursor-pointer items-center justify-center"
					>
						<LuShoppingCart className="size-10/12" />
					</Link>
					<UserPopover />
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
