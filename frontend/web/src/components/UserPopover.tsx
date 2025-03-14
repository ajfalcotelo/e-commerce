import { Button } from "@/components/ui/shadcn/button";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/shadcn/popover";
import { useLogOut } from "@/hooks/useLogOut";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { LuCircleUser, LuLogOut } from "react-icons/lu";

export const UserPopover = () => {
	const [isOpen, setIsOpen] = useState(false);
	const { logout } = useLogOut();

	const handleLogOut = () => {
		logout();
		console.log("Logged Out");
	};

	return (
		<Popover open={isOpen} onOpenChange={setIsOpen}>
			<PopoverTrigger className="flex size-8 cursor-pointer items-center justify-center">
				<LuCircleUser
					className={cn(
						"size-full stroke-[1.75]",
						isOpen && "text-secondary-cute-crab",
					)}
				/>
			</PopoverTrigger>
			<PopoverContent align="end" className="px-5 py-2.5">
				<Button
					variant={"ghost"}
					className="w-full cursor-pointer justify-normal"
					onClick={handleLogOut}
				>
					<LuLogOut className="size-5" />
					<p>Logout</p>
				</Button>
			</PopoverContent>
		</Popover>
	);
};
