import { cva } from "class-variance-authority";

export const buttonVariants = cva(
	"p-4 font-medium rounded-md text-center transition-all cursor-pointer",
	{
		variants: {
			variant: {
				red: "bg-secondary-cute-crab text-primary-white border-none hover:bg-candy-pink",
				white:
					"bg-primary-white border-2 border-black/40 drop-shadow-xl hover:text-battle-grey",
				classic_white:
					"g-primary-white p-0 border border-black/40 hover:text-battle-grey",
				none: "",
			},
		},
		defaultVariants: {
			variant: "red",
		},
	},
);
