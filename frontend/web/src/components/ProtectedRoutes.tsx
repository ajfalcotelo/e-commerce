import { useAuthContext } from "@/hooks/useAuthContext";
import { ROUTES } from "@/utils/constant";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

export const ProtectedRoutes = ({
	children,
	invert,
}: {
	children: React.ReactNode;
	invert?: boolean;
}) => {
	const { user } = useAuthContext();
	const navigate = useNavigate();
	const [isChecking, setIsChecking] = useState(true);

	useEffect(() => {
		if (Boolean(user) == Boolean(invert)) {
			navigate(ROUTES.HOME.ROOT, { replace: true });
			window.scrollTo(0, 0);
		} else {
			setIsChecking(false);
		}
	}, [user, invert, navigate]);

	if (isChecking) return null;

	return children;
};
