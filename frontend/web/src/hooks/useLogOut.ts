import { useAuthContext } from "@/hooks/useAuthContext";
import { useCartContext } from "@/hooks/useCartContext";
import { useWishlistContext } from "@/hooks/useWishlistContext";

export const useLogOut = () => {
	const { dispatch: authDispatch } = useAuthContext();
	const { dispatch: cartDispatch } = useCartContext();
	const { dispatch: wishlistDispatch } = useWishlistContext();

	const logout = () => {
		localStorage.removeItem("user");
		authDispatch({ type: "LOGOUT" });
		cartDispatch({ type: "DELETE" });
		wishlistDispatch({ type: "DELETE" });
	};

	return { logout };
};
