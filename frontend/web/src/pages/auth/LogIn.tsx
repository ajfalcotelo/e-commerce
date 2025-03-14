import { useState } from "react";
import { AuthInput } from "@/components/ui/AuthInput";
import { Button } from "@/components/ui/Button";
import { AUTHFORM, CTA } from "@/utils/constant";
import { useLogIn } from "@/hooks/useLogIn";
import { ErrorDisplay } from "@/components/ErrorDisplay";

export const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const { login, isLoading, error } = useLogIn({ email, password });

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		await login();
	};

	return (
		<form className="w-[55%] space-y-6" onSubmit={handleSubmit}>
			<header className="space-y-4">
				<h2 className="text-5xl font-medium">{AUTHFORM.LOGIN.TITLE}</h2>
				<p className="font-medium">{AUTHFORM.SUBTITLE}</p>
			</header>

			<fieldset>
				<div className="flex flex-col gap-8">
					<legend className="sr-only">Exclusive Login Fields</legend>
					<AuthInput
						placeholder="Email"
						onChange={(e) => setEmail(e.target.value)}
					/>
					<AuthInput
						placeholder="Password"
						onChange={(e) => setPassword(e.target.value)}
					/>
					{error && <ErrorDisplay>{error}</ErrorDisplay>}
					<div className="flex items-center justify-between">
						<Button type="submit" className="w-2/5" disabled={isLoading}>
							{CTA.AUTH.LOGIN.LOGIN_BTN.TITLE}
						</Button>

						<a href="" className="text-secondary-cute-crab">
							{CTA.AUTH.LOGIN.FORGOT.TITLE}
						</a>
					</div>
				</div>
			</fieldset>
		</form>
	);
};
