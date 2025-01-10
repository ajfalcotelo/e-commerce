import { NAV } from "../utils/constant.ts";
import { Nav } from "./ui/NavLinks.tsx";

export const Header = () => {
	return (
		<header className="site-header flex flex-row justify-around items-center w-full m-auto h-[10vh] border-b">
			<a
				href={NAV.HOME.ROUTE}
				className="text-3xl font-bold font-inter p-2 select-none"
			>
				{NAV.LOGO.NAME}
			</a>
			<div className="flex flex-row gap-12 text-xl font-poppins">
				<Nav route={NAV.HOME.ROUTE}>{NAV.HOME.NAME}</Nav>
				<Nav route={NAV.CONTACT.ROUTE}>{NAV.CONTACT.NAME}</Nav>
				<Nav route={NAV.ABOUT.ROUTE}>{NAV.ABOUT.NAME}</Nav>
				<Nav route={NAV.SIGNUP.ROUTE}>{NAV.SIGNUP.NAME}</Nav>
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
