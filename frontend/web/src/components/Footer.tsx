import { FooterSection } from "./FooterSection"

export const Footer = () => {
    return (
        <footer className="flex flex-col justify-between bg-black w-full font-poppins">
            <div className="flex flex-row justify-center
                      pt-20 pb-5 
                      "
            >
              <FooterSection>test</FooterSection>
            </div>
            <div 
                className="flex justify-center items-center
                        w-full p-3
                        border-t-primary-black border-t-2 text-primary-black
                        text-sm
                    "
            >
                <p><span className="text-base">©</span> Copyright rights and lefts</p>
            </div>
        </footer>
    )
}