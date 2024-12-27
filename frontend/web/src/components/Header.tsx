import { NAV } from '../utils/constant.ts';

const Header = () => {
  return (
    <header className="flex flex-row justify-between items-center w-10/12 m-auto">
      <h1 className="text-2xl font-bold font-inter">{NAV.LOGO.NAME}</h1>
      <div className="flex flex-row gap-8 text-base font-poppins">
        <p>{NAV.HOME.NAME}</p>
        <p>{NAV.CONTACT.NAME}</p>
        <p>{NAV.ABOUT.NAME}</p>
        <p>{NAV.SIGNUP.NAME}</p>
      </div>
      <div
        className="
                    flex flex-row items-center bg-gray-100 rounded-md w-1/6
                "
      >
        <input
          type="search"
          name=""
          id=""
          placeholder={`${NAV.SEARCH.NAME}`}
          className="bg-transparent text-xs w-full pt-2 pl-2 pb-2 pr-1"
        />
        <img src={`${NAV.SEARCH.ICON}`} className="pr-2" />
      </div>
    </header>
  );
};

export default Header;
