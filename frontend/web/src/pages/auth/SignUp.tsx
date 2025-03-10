import { useState } from "react";
import { AuthInput } from "@/components/ui/AuthInput";
import { Button } from "@/components/ui/Button";
import { LinkButton } from "@/components/ui/LinkButton";
import { AUTHFORM, CTA } from "@/utils/constant";
import { useSignUp } from "@/hooks/useSignUp";
import { ErrorDisplay } from "@/components/ErrorDisplay";

export const Signup = () => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const { signup, isLoading, error } = useSignUp({ name, email, password });

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		console.log("SignUp: ", name, email, password);

		await signup();
	};

	return (
		<form className="w-[55%] space-y-6" onSubmit={handleSubmit}>
			<header className="space-y-4">
				<h2 className="text-5xl font-medium">{AUTHFORM.SIGNUP.TITLE}</h2>
				<p className="font-medium">{AUTHFORM.SUBTITLE}</p>
			</header>

			<fieldset>
				<div className="flex flex-col gap-8">
					<legend className="sr-only">Exclusive Signup Fields</legend>
					<AuthInput
						placeholder="Name"
						onChange={(e) => setName(e.target.value)}
						value={name}
					/>
					<AuthInput
						placeholder="Email or Phone Number"
						onChange={(e) => setEmail(e.target.value)}
						value={email}
					/>
					<AuthInput
						placeholder="Password"
						onChange={(e) => setPassword(e.target.value)}
						value={password}
					/>
					{error && <ErrorDisplay className="">{error}</ErrorDisplay>}
					<div className="flex flex-col gap-4">
						<Button type="submit" disabled={isLoading}>
							{CTA.AUTH.SIGNUP.SIGNUP_BTN.TITLE}
						</Button>
						<Button
							variant={"white"}
							className="flex justify-center"
							type="button"
						>
							<span className="inline-flex space-x-4">
								<img src={CTA.AUTH.SIGNUP.OAUTH.GOOGLE.ICON}></img>
								<span>{CTA.AUTH.SIGNUP.OAUTH.GOOGLE.TITLE}</span>
							</span>
						</Button>
					</div>
					<div className="space-x-4 text-center">
						<span className="font-medium text-black/70">
							Already have an account?
						</span>
						<LinkButton
							variant={"none"}
							route={CTA.AUTH.SIGNUP.LOGIN.ACTION}
							className="hover:text-secondary-cute-crab rounded-none border-b-2 border-b-black/40 px-0 py-1 text-xl text-black/70"
						>
							{CTA.AUTH.SIGNUP.LOGIN.TITLE}
						</LinkButton>
					</div>
				</div>
			</fieldset>
		</form>
	);
};
