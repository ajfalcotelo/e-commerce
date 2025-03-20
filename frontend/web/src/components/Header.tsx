import { NAV } from "@/utils/constant";
import { HeaderLink } from "@/components/ui/HeaderLink";
import { SearchInput } from "@/components/ui/SearchInput";
import { UserPopover } from "@/components/UserPopover";
import { CartButton } from "@/components/CartButton";
import { WishlistButton } from "@/components/WishlistButton";

export const Header = () => {
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

			<div className="flex items-center gap-6">
				<WishlistButton />
				<CartButton />
				<UserPopover />
			</div>
		</header>
	);
};
