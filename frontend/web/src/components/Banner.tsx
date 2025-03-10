import { BANNER, CTA } from "@/utils/constant";
import { LinkButton } from "@/components/ui/LinkButton";

export const Banner = () => {
	return (
		<div className="text-primary-white flex h-12 items-center justify-center gap-2 bg-black">
			<span className="text-sm">{BANNER.TITLE}</span>
			<LinkButton
				variant="none"
				route={CTA.BANNER.ACTION}
				className="hover:text-battle-grey font-medium underline transition-all"
			>
				{CTA.BANNER.TITLE}
			</LinkButton>
		</div>
	);
};
