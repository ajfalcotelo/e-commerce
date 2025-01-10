import { NAV } from "../utils/constant.ts";
import { NavLinks } from "./ui/NavLinks.tsx";
import { NavLink } from "react-router";

export const Header = () => {
	return (
		<header className="site-header flex flex-row justify-around items-center w-full m-auto h-[10vh] border-b">
			<NavLink
				to={NAV.HOME.ROUTE}
				className="text-3xl font-bold font-inter p-2 select-non text-black"
			>
				{NAV.LOGO.NAME}
			</NavLink>
			<div className="flex flex-row gap-12 text-xl font-poppins">
				<NavLinks route={NAV.HOME.ROUTE}>{NAV.HOME.NAME}</NavLinks>
				<NavLinks route={NAV.CONTACT.ROUTE}>{NAV.CONTACT.NAME}</NavLinks>
				<NavLinks route={NAV.ABOUT.ROUTE}>{NAV.ABOUT.NAME}</NavLinks>
				<NavLinks route={NAV.SIGNUP.ROUTE}>{NAV.SIGNUP.NAME}</NavLinks>
			</div>
			<div
				className="
                    flex flex-row items-center rounded-md h-10
                    bg-secondary-white-smoke
                    px-4
                    focus-within:outline focus-within:outline-1 focus-within:outline-primary-black
                "
			>
				<input
					type="search"
					name=""
					id=""
					placeholder={NAV.SEARCH.NAME}
					className="
                      bg-transparent p-2 text-sm w-64 focus:outline-none
                      search-cancel:appearance-none
                  "
				/>
				<button className="p-2">
					<NAV.SEARCH.ICON ClassName="stroke-primary-black" />
				</button>
			</div>
		</header>
	);
};
