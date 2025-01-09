import { AuthForm } from '../../components/AuthForm';

type AuthProps = {
  isSignup: boolean;
};
export const Auth = ({ isSignup }: AuthProps) => {
  return (
    <div className="w-full h-screen flex items-start">
      <div className="h-4/5 flex w-full mt-10">
        <div className="w-[55%] signup-hero"></div>
        <div className="flex-1 flex justify-center items-center">
          <AuthForm isSignup={isSignup} />
        </div>
      </div>
    </div>
  );
};
