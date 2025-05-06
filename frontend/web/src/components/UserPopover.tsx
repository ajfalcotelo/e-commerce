import { Button } from "@/components/ui/shadcn/button";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/shadcn/popover";
import { useAuthContext } from "@/hooks/useAuthContext";
import { useLogOut } from "@/hooks/useLogOut";
import { cn } from "@/lib/utils";
import { ROUTES } from "@/utils/constant";
import { CircleUser, LogIn, LogOut, UserRoundPlus } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";

export const UserPopover = () => {
	const [isOpen, setIsOpen] = useState(false);
	const { user } = useAuthContext();
	const { logout } = useLogOut();
	const navigate = useNavigate();

	const handleLogOut = () => {
		setIsOpen(false);
		logout();
		console.log("Logged Out");
	};

	const handleLogIn = () => {
		setIsOpen(false);
		navigate(ROUTES.AUTH.LOGIN, { replace: true });
		window.scrollTo(0, 0);
	};

	const handleSignUp = () => {
		setIsOpen(false);
		navigate(ROUTES.AUTH.SIGNUP, { replace: true });
		window.scrollTo(0, 0);
	};

	return (
		<Popover open={isOpen} onOpenChange={setIsOpen}>
			<PopoverTrigger className="flex size-8 cursor-pointer items-center justify-center">
				{user ? (
					<CircleUser
						className={cn(
							"size-full fill-black/30 stroke-[1.75]",
							isOpen && "text-secondary-cute-crab",
						)}
					/>
				) : (
					<CircleUser
						className={cn(
							"size-full stroke-[1.75]",
							isOpen && "text-secondary-cute-crab",
						)}
					/>
				)}
			</PopoverTrigger>
			<PopoverContent align="end" className="px-5 py-2.5">
				{user ? (
					<Button
						variant={"ghost"}
						className="w-full cursor-pointer justify-normal"
						onClick={handleLogOut}
					>
						<LogOut className="size-5" />
						<p>Logout</p>
					</Button>
				) : (
					<>
						<Button
							variant={"ghost"}
							className="w-full cursor-pointer justify-normal"
							onClick={handleLogIn}
						>
							<LogIn className="size-5" />
							<p>Log In</p>
						</Button>
						<Button
							variant={"ghost"}
							className="w-full cursor-pointer justify-normal"
							onClick={handleSignUp}
						>
							<UserRoundPlus className="size-5" />
							<p>Sign Up</p>
						</Button>
					</>
				)}
			</PopoverContent>
		</Popover>
	);
};
