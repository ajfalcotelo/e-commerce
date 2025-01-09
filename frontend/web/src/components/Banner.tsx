import { BANNER, CTA } from '../utils/constant';

export const Banner = () => {
  return (
    <div className="bg-black h-12 text-primary-white flex justify-center items-center gap-2">
      <span className="text-sm">{BANNER.TITLE}</span>
      <a
        href={CTA.BANNER.ACTION}
        className="font-medium underline transition-all hover:text-battle-grey"
      >
        {CTA.BANNER.TITLE}
      </a>
    </div>
  );
};
