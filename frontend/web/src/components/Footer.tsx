import { FooterSection } from './FooterSection';
import { FOOTER } from '../utils/constant.ts';
import { IconSend } from './IconsSvg.tsx';

export const Footer = () => {
  return (
    <footer className="flex flex-col justify-between bg-black w-full">
      <div className="flex flex-row justify-between gap-2 pt-20 pb-20 pl-32 pr-32">
        <FooterSection header="Exclusive">
          <h2 className="inline-block font-medium text-xl mb-2">Subscribe</h2>
          <p>Get 10% off your first order</p>
          <div
            className="flex flex-row items-center rounded-md
                      border border-solid border-primary-white
                      focus-within:outline focus-within:outline-1 focus-within:outline-primary-white
                    "
          >
            <input
              type="text"
              name=""
              id=""
              placeholder={FOOTER.EMAIL.NAME}
              className="p-3 pl-4 bg-transparent focus:outline-none"
            />
            <button type="button" className="p-2">
              <IconSend ClassName="stroke-primary-white"></IconSend>
            </button>
          </div>
        </FooterSection>
        <FooterSection header="Support">
          <p>{FOOTER.SUPPORT.ADDRESS}</p>
          <p>{FOOTER.SUPPORT.EMAIL}</p>
          <p>{FOOTER.SUPPORT.NUMBER}</p>
        </FooterSection>
        <FooterSection header="Account">
          <a href={FOOTER.ACCOUNT.PROFILE.ROUTE}>
            {FOOTER.ACCOUNT.PROFILE.NAME}
          </a>
          <a href={FOOTER.ACCOUNT.LOGIN.ROUTE}>{FOOTER.ACCOUNT.LOGIN.NAME}</a>
          <a href={FOOTER.ACCOUNT.SIGNUP.ROUTE}>{FOOTER.ACCOUNT.SIGNUP.NAME}</a>
          <a href={FOOTER.ACCOUNT.CART.ROUTE}>{FOOTER.ACCOUNT.CART.NAME}</a>
          <a href={FOOTER.ACCOUNT.WISHLIST.ROUTE}>
            {FOOTER.ACCOUNT.WISHLIST.NAME}
          </a>
          <a href={FOOTER.ACCOUNT.SHOP.ROUTE}>{FOOTER.ACCOUNT.SHOP.NAME}</a>
        </FooterSection>
        <FooterSection header="Quick Link">
          <a href={FOOTER.QLINKS.POLICY.ROUTE}>{FOOTER.QLINKS.POLICY.NAME}</a>
          <a href={FOOTER.QLINKS.TERMS.ROUTE}>{FOOTER.QLINKS.TERMS.NAME}</a>
          <a href={FOOTER.QLINKS.FAQ.ROUTE}>{FOOTER.QLINKS.FAQ.NAME}</a>
          <a href={FOOTER.QLINKS.CONTACT.ROUTE}>{FOOTER.QLINKS.CONTACT.NAME}</a>
        </FooterSection>
        <FooterSection header="Download App">
          <p className="text-xs text-secondary-white-desert">
            {FOOTER.DOWNLOAD.NAME}
          </p>
          <div className="grid grid-flow-col grid-cols-2 grid-rows-2">
            <img src={FOOTER.DOWNLOAD.QR} className="row-span-full" />
            <a href={FOOTER.DOWNLOAD.GOOGLEPLAY.ROUTE}>
              <img src={FOOTER.DOWNLOAD.GOOGLEPLAY.ICON} />
            </a>
            <a href={FOOTER.DOWNLOAD.APPSTORE.ROUTE}>
              <img src={FOOTER.DOWNLOAD.APPSTORE.ICON} />
            </a>
          </div>
          <div className="grid grid-flow-col auto-cols-fr">
            <a href={FOOTER.DOWNLOAD.FACEBOOK.ROUTE}>
              <FOOTER.DOWNLOAD.FACEBOOK.ICON ClassName="stroke-primary-white" />
            </a>
            <a href={FOOTER.DOWNLOAD.TWITTER.ROUTE}>
              <FOOTER.DOWNLOAD.TWITTER.ICON ClassName="stroke-primary-white" />
            </a>
            <a href={FOOTER.DOWNLOAD.INSTAGRAM.ROUTE}>
              <FOOTER.DOWNLOAD.INSTAGRAM.ICON ClassName="stroke-primary-white" />
            </a>
            <a href={FOOTER.DOWNLOAD.LINKEDIN.ROUTE}>
              <FOOTER.DOWNLOAD.LINKEDIN.ICON ClassName="stroke-primary-white" />
            </a>
          </div>
        </FooterSection>
      </div>
      <div
        className="flex justify-center items-center
                  w-full p-3
                  border-t-primary-black border-t-2 text-primary-black
                  text-sm font-poppins
                "
      >
        <p>
          <span className="text-base">©</span> Copyright rights and lefts
        </p>
      </div>
    </footer>
  );
};
