import {
	IconSearch,
	IconSend,
	IconFacebook,
	IconInstagram,
	IconLinkedIn,
	IconTwitter,
} from "@/components/ui/IconsSvg";

// Temp solution for nested ROUTES
// idk kung ano pede ipalit

export const ROUTES = {
	ABOUT: "/about",
	HOME: {
		ROOT: "/",
		WOMEN: "/womens",
		MEN: "/mens",
		ELECTRONICS: "/electronics",
		FURNITURE: "/furniture",
		SPORTS: "/sports",
		BEAUTY: "/beauty",
		JEWELRY: "/jewelry",
		CART: "/cart",
		WISHLIST: "/wishlist",
	},
	CONTACT: "/contact",
	AUTH: {
		LOGIN: "/auth/login",
		SIGNUP: "/auth/signup",
	},
};

export const BANNER = {
	TITLE: "Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%!",
};

export const CTA = {
	AUTH: {
		SIGNUP: {
			SIGNUP_BTN: {
				TITLE: "Create Account",
			},
			LOGIN: {
				TITLE: "Log In",
				ACTION: ROUTES.AUTH.LOGIN,
			},
			OAUTH: {
				GOOGLE: {
					TITLE: "Sign up with Google",
					ICON: "/icon-google.png",
				},
			},
		},
		LOGIN: {
			LOGIN_BTN: {
				TITLE: "Log In",
			},
			FORGOT: {
				TITLE: "Forgot Password?",
			},
		},
	},

	BANNER: {
		TITLE: "ShopNow",
		ACTION: ROUTES.HOME.ROOT,
	},
};

export const AUTHFORM = {
	SUBTITLE: "Enter your details below",
	LOGIN: {
		TITLE: "Log in to exclusive",
	},
	SIGNUP: {
		TITLE: "Create an account",
	},
};

export const NAV = {
	LOGO: {
		NAME: "Exclusive",
		ROUTE: ROUTES.HOME.ROOT,
	},
	HOME: {
		NAME: "Home",
		ROUTE: ROUTES.HOME.ROOT,
	},
	CONTACT: {
		NAME: "Contact",
		ROUTE: ROUTES.CONTACT,
	},
	ABOUT: {
		NAME: "About",
		ROUTE: ROUTES.ABOUT,
	},
	SIGNUP: {
		NAME: "Sign Up",
		ROUTE: ROUTES.AUTH.SIGNUP,
	},
	LOGIN: {
		NAME: "Log In",
		ROUTE: ROUTES.AUTH.LOGIN,
	},
	SEARCH: {
		NAME: "What are you looking for?",
		ICON: IconSearch,
	},
};

export const FOOTER = {
	EXCLUSIVE: {
		OFFER: "Get 10% off your first order",
		INPUT: {
			NAME: "Enter your email",
			ICON: IconSend,
		},
	},
	SUPPORT: {
		ADDRESS: "Blk 123 H 4, Bangmadeck",
		EMAIL: "onetwothree@gmail.com",
		NUMBER: "+1234-5678-0911",
	},
	ACCOUNT: {
		PROFILE: {
			NAME: "My Account",
			ROUTE: "/",
		},
		LOGIN: {
			NAME: "Login",
			ROUTE: ROUTES.AUTH.LOGIN,
		},
		SIGNUP: {
			NAME: "Register",
			ROUTE: ROUTES.AUTH.SIGNUP,
		},
		CART: {
			NAME: "Cart",
			ROUTE: "/",
		},
		WISHLIST: {
			NAME: "Wishlist",
			ROUTE: "/",
		},
		SHOP: {
			NAME: "Shop",
			ROUTE: ROUTES.HOME.ROOT,
		},
	},
	QLINKS: {
		POLICY: {
			NAME: "Privacy Policy",
			ROUTE: "/",
		},
		TERMS: {
			NAME: "Terms Of Use",
			ROUTE: "/",
		},
		FAQ: {
			NAME: "FAQ",
			ROUTE: "/",
		},
		CONTACT: {
			NAME: "Contact",
			ROUTE: ROUTES.CONTACT,
		},
	},
	DOWNLOAD: {
		NAME: "Save $3 with App New User Only",
		QR: "/qr_code.png",
		GOOGLEPLAY: {
			ICON: "/googleplay.png",
			ROUTE: "/",
		},
		APPSTORE: {
			ICON: "/appstore.png",
			ROUTE: "/",
		},
		FACEBOOK: {
			ICON: IconFacebook,
			ROUTE: "/",
		},
		TWITTER: {
			ICON: IconTwitter,
			ROUTE: "/",
		},
		INSTAGRAM: {
			ICON: IconInstagram,
			ROUTE: "/",
		},
		LINKEDIN: {
			ICON: IconLinkedIn,
			ROUTE: "/",
		},
	},
};
