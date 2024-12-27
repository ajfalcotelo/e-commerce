import { NAV } from "../utils/constant.ts";

const Header = () => {
  return (
    <header className="flex flex-row justify-between items-center w-9/12 m-auto">
      <h1 className="text-2xl font-bold font-inter p-2 select-none">{NAV.LOGO.NAME}</h1>
      <div className="flex flex-row gap-8 text-base font-poppins">
        <p>{NAV.HOME.NAME}</p>
        <p>{NAV.CONTACT.NAME}</p>
        <p>{NAV.ABOUT.NAME}</p>
        <p>{NAV.SIGNUP.NAME}</p>
      </div>
      <div
        className="
                    flex flex-row items-center bg-secondary-white-smoke rounded-md
                    focus-within:outline focus-within:outline-2 focus-within:outline-battle-grey
                "
      >
        <input
          type="search"
          name=""
          id=""
          placeholder={`${NAV.SEARCH.NAME}`}
          className="bg-transparent text-xs pt-2 pl-2 pb-2 pr-1 w-48 focus:outline-none"
        />
        <img src={`${NAV.SEARCH.ICON}`} className="pr-2" />
      </div>
    </header>
  );
};

export default Header;
