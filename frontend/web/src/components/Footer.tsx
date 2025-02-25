import { FooterSection } from "./FooterSection";
import { FOOTER } from "../utils/constant.ts";
import { FooterLink } from "./ui/FooterLinks.tsx";
import { cn } from "../utils/cn.ts";

type FooterProps = {
	className?: string;
};

export const Footer = ({ className, ...props }: FooterProps) => {
	return (
		<footer className={cn("bg-black w-full h-[32rem]", className)} {...props}>
			<div className="flex flex-row justify-between gap-2 pt-20 pb-20 pl-32 pr-32">
				<FooterSection header="Exclusive">
					<h2 className="inline-block font-medium text-xl mb-2">Subscribe</h2>
					<p>{FOOTER.EXCLUSIVE.OFFER}</p>
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
							placeholder={FOOTER.EXCLUSIVE.INPUT.NAME}
							className="p-3 pl-4 bg-transparent focus:outline-none"
						/>
						<button type="button" className="p-2">
							<FOOTER.EXCLUSIVE.INPUT.ICON className="stroke-primary-white" />
						</button>
					</div>
				</FooterSection>
				<FooterSection header="Support">
					<p>{FOOTER.SUPPORT.ADDRESS}</p>
					<p>{FOOTER.SUPPORT.EMAIL}</p>
					<p>{FOOTER.SUPPORT.NUMBER}</p>
				</FooterSection>
				<FooterSection header="Account">
					<FooterLink route={FOOTER.ACCOUNT.PROFILE.ROUTE}>
						{FOOTER.ACCOUNT.PROFILE.NAME}
					</FooterLink>
					<FooterLink route={FOOTER.ACCOUNT.LOGIN.ROUTE}>
						{FOOTER.ACCOUNT.LOGIN.NAME}
					</FooterLink>
					<FooterLink route={FOOTER.ACCOUNT.SIGNUP.ROUTE}>
						{FOOTER.ACCOUNT.SIGNUP.NAME}
					</FooterLink>
					<FooterLink route={FOOTER.ACCOUNT.CART.ROUTE}>
						{FOOTER.ACCOUNT.CART.NAME}
					</FooterLink>
					<FooterLink route={FOOTER.ACCOUNT.WISHLIST.ROUTE}>
						{FOOTER.ACCOUNT.WISHLIST.NAME}
					</FooterLink>
					<FooterLink route={FOOTER.ACCOUNT.SHOP.ROUTE}>
						{FOOTER.ACCOUNT.SHOP.NAME}
					</FooterLink>
				</FooterSection>
				<FooterSection header="Quick Link">
					<FooterLink route={FOOTER.QLINKS.POLICY.ROUTE}>
						{FOOTER.QLINKS.POLICY.NAME}
					</FooterLink>
					<FooterLink route={FOOTER.QLINKS.TERMS.ROUTE}>
						{FOOTER.QLINKS.TERMS.NAME}
					</FooterLink>
					<FooterLink route={FOOTER.QLINKS.FAQ.ROUTE}>
						{FOOTER.QLINKS.FAQ.NAME}
					</FooterLink>
					<FooterLink route={FOOTER.QLINKS.CONTACT.ROUTE}>
						{FOOTER.QLINKS.CONTACT.NAME}
					</FooterLink>
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
							<FOOTER.DOWNLOAD.FACEBOOK.ICON className="stroke-primary-white" />
						</a>
						<a href={FOOTER.DOWNLOAD.TWITTER.ROUTE}>
							<FOOTER.DOWNLOAD.TWITTER.ICON className="stroke-primary-white" />
						</a>
						<a href={FOOTER.DOWNLOAD.INSTAGRAM.ROUTE}>
							<FOOTER.DOWNLOAD.INSTAGRAM.ICON className="stroke-primary-white" />
						</a>
						<a href={FOOTER.DOWNLOAD.LINKEDIN.ROUTE}>
							<FOOTER.DOWNLOAD.LINKEDIN.ICON className="stroke-primary-white" />
						</a>
					</div>
				</FooterSection>
			</div>
			<div
				className="flex justify-center items-center
                  w-full py-3
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
