type FooterProps = {
  header: string;
  children: React.ReactNode;
};

export const FooterSection = ({ header, children }: FooterProps) => {
  return (
    <div className="flex flex-col text-primary-white text-left">
      <h1 className="font-inter text-3xl font-bold mb-6 select-none">
        {header}
      </h1>
      <div className="flex flex-col gap-4 font-poppins font-normal text-base">
        {children}
      </div>
    </div>
  );
};
