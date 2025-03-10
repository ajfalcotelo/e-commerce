import { FooterSection } from "@/components/FooterSection";
import { FOOTER } from "@/utils/constant";
import { FooterLink } from "@/components/ui/FooterLink";
import { cn } from "@/lib/utils";

type FooterProps = {
	className?: string;
};

export const Footer = ({ className, ...props }: FooterProps) => {
	return (
		<footer className={cn("h-[32rem] w-full bg-black", className)} {...props}>
			<div className="flex flex-row justify-between gap-2 pt-20 pr-32 pb-20 pl-32">
				<FooterSection header="Exclusive">
					<h2 className="mb-2 inline-block text-xl font-medium">Subscribe</h2>
					<p>{FOOTER.EXCLUSIVE.OFFER}</p>
					<div className="border-primary-white focus-within:outline-primary-white flex flex-row items-center rounded-md border border-solid focus-within:outline focus-within:outline-1">
						<input
							type="text"
							name=""
							id=""
							placeholder={FOOTER.EXCLUSIVE.INPUT.NAME}
							className="bg-transparent p-3 pl-4 focus:outline-hidden"
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
					<p className="text-secondary-white-desert text-xs">
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
					<div className="grid auto-cols-fr grid-flow-col">
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
			<div className="border-t-primary-black text-primary-black font-poppins flex w-full items-center justify-center border-t-2 py-3 text-sm">
				<p>
					<span className="text-base">©</span> Copyright rights and lefts
				</p>
			</div>
		</footer>
	);
};
