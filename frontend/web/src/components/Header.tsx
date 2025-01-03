import { NAV } from '../utils/constant.ts';
import { NavLink } from './NavLinks.tsx';

const Header = () => {
  return (
    <header className="flex flex-row justify-between items-center w-[96rem] m-auto">
      <a
        href={NAV.HOME.ROUTE}
        className="text-3xl font-bold font-inter p-2 select-none"
      >
        {NAV.LOGO.NAME}
      </a>
      <div className="flex flex-row gap-12 text-xl font-poppins">
        <NavLink href={NAV.HOME.ROUTE}>{NAV.HOME.NAME}</NavLink>
        <NavLink href={NAV.CONTACT.ROUTE}>{NAV.CONTACT.NAME}</NavLink>
        <NavLink href={NAV.ABOUT.ROUTE}>{NAV.ABOUT.NAME}</NavLink>
        <NavLink href={NAV.SIGNUP.ROUTE}>{NAV.SIGNUP.NAME}</NavLink>
      </div>
      <div
        className="
                    flex flex-row items-center rounded-md h-10
                    bg-secondary-white-smoke group
                    focus-within:outline focus-within:outline-2 focus-within:outline-primary-black
                "
      >
        <input
          type="search"
          name=""
          id=""
          placeholder={NAV.SEARCH.NAME}
          className="
                      bg-transparent text-base pt-2 pl-2 pb-2 pr-1 w-64 focus:outline-none
                      search-cancel:appearance-none
                  "
        />
        <button className="p-2 h-full">
          <img src={NAV.SEARCH.ICON} />
        </button>
      </div>
    </header>
  );
};

export default Header;
