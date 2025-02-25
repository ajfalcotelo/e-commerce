import { NAV } from "../../utils/constant";

const SearchInput = () => {
	return (
		<div
			className="
                  flex flex-row items-center rounded-md h-2/4
                  bg-secondary-white-smoke
                  px-4
                  focus-within:outline focus-within:outline-1 focus-within:outline-primary-black
              "
		>
			<input
				type="search"
				placeholder={NAV.SEARCH.NAME}
				className="
                    bg-transparent p-2 text-sm w-64 focus:outline-none
                    search-cancel:appearance-none
                "
			/>
			<button className="p-2">
				<NAV.SEARCH.ICON className="stroke-primary-black" />
			</button>
		</div>
	);
};

export default SearchInput;
