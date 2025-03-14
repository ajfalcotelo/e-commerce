import { NAV } from "@/utils/constant";

export const SearchInput = () => {
	return (
		<div
			className="bg-secondary-white-smoke focus-within:outline-primary-black flex h-2/4 flex-row
				items-center rounded-md px-4 focus-within:outline"
		>
			<input
				type="search"
				placeholder={NAV.SEARCH.NAME}
				className="search-cancel:appearance-none w-64 bg-transparent p-2 text-sm
					focus:outline-hidden"
			/>
			<button className="cursor-pointer p-2">
				<NAV.SEARCH.ICON className="stroke-primary-black" />
			</button>
		</div>
	);
};
