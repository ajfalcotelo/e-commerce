import { IconSearch, IconSend, IconFacebook, IconInstagram, IconLinkedIn, IconTwitter } from "../components/IconsSvg";

export const NAV = {
    LOGO: {
        NAME: "Exclusive",
        ROUTE: "/",
    },
    HOME: {
        NAME: "Home",
        ROUTE: "/"
    },
    CONTACT: {
        NAME: "Contact",
        ROUTE: "/contact"
    },
    ABOUT: {
        NAME: "About",
        ROUTE: "/about"
    },
    SIGNUP: {
        NAME: "Sign Up",
        ROUTE: "/sign-up"
    },
    SEARCH: {
        NAME: "What are you looking for?",
        ICON: IconSearch
    }
}

export const FOOTER = {
    EXCLUSIVE: {
        OFFER: "Get 10% off your first order",
        INPUT: {
            NAME: "Enter your email",
            ICON: IconSend
        }
    },
    SUPPORT: {
        ADDRESS: "Blk 123 H 4, Bangmadeck",
        EMAIL: "onetwothree@gmail.com",
        NUMBER: "+1234-5678-0911"
    },
    ACCOUNT: {
        PROFILE:{
            NAME: "My Account",
            ROUTE: "/"
        },
        LOGIN: {
            NAME: "Login",
            ROUTE: "/log-in"
        },
        SIGNUP: {
            NAME: "Register",
            ROUTE: "/sign-up"
        },
        CART: {
            NAME: "Cart",
            ROUTE: "/"
        },
        WISHLIST: {
            NAME: "Wishlist",
            ROUTE: "/"
        },
        SHOP: {
            NAME: "Shop",
            ROUTE: "/"
        }
    },
    QLINKS: {
        POLICY: {
            NAME: "Privacy Policy",
            ROUTE: "/"
        },
        TERMS: {
            NAME: "Terms Of Use",
            ROUTE: "/"
        },
        FAQ: {
            NAME: "FAQ",
            ROUTE: "/"
        },
        CONTACT: {
            NAME: "Contact",
            ROUTE: "/contact"
        }
    },
    DOWNLOAD: {
        NAME: "Save $3 with App New User Only",
        QR: "/qr_code.png",
        GOOGLEPLAY: {
            ICON: "/googleplay.png",
            ROUTE: "/"
        },
        APPSTORE: {
            ICON: "/appstore.png",
            ROUTE: "/"
        },
        FACEBOOK: {
            ICON: IconFacebook,
            ROUTE: "/"
        },
        TWITTER: {
            ICON: IconTwitter,
            ROUTE: "/"
        },
        INSTAGRAM: {
            ICON: IconInstagram,
            ROUTE: "/"
        },
        LINKEDIN: {
            ICON: IconLinkedIn,
            ROUTE: "/"
        }
    }
}