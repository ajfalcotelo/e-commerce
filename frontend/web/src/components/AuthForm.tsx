import { AUTHFORM, CTA } from '../utils/constant';
import { AuthInput } from './ui/AuthInput';
import { Button } from './ui/Button';

type AuthFormProps = {
  isSignup: boolean;
};

export const AuthForm = ({ isSignup }: AuthFormProps) => {
  return (
    <form className="w-[55%] space-y-6 ">
      <header className="space-y-4">
        <h2 className="font-medium text-5xl">
          {isSignup ? AUTHFORM.SIGNUP.TITLE : AUTHFORM.LOGIN.TITLE}
        </h2>
        <p className="font-medium">{AUTHFORM.SUBTITLE}</p>
      </header>

      <fieldset>
        <div className="flex flex-col gap-8">
          {isSignup ? (
            <>
              <legend className="sr-only">Exclusive Signup Fields</legend>
              <AuthInput placeholder="Name" />
              <AuthInput placeholder="Email or Phone Number" />
              <AuthInput placeholder="Password" />
              <div className="flex flex-col gap-4">
                <Button>{CTA.AUTH.SIGNUP.SIGNUP_BTN.TITLE}</Button>
                <Button
                  variant={'white'}
                  className="flex justify-center"
                  type="button"
                >
                  <span className="inline-flex space-x-4">
                    <img src={CTA.AUTH.SIGNUP.OAUTH.GOOGLE.ICON}></img>
                    <span>{CTA.AUTH.SIGNUP.OAUTH.GOOGLE.TITLE}</span>
                  </span>
                </Button>
              </div>
              <div className="text-center space-x-4">
                <span className="text-black text-opacity-70 font-medium">
                  Already have an account?
                </span>
                <a
                  href={CTA.AUTH.SIGNUP.LOGIN.ACTION}
                  className="text-black font-medium text-opacity-70 text-xl border-b-2 border-opacity-40 py-1 transition-all hover:text-secondary-cute-crab"
                >
                  {CTA.AUTH.SIGNUP.LOGIN.TITLE}
                </a>
              </div>
            </>
          ) : (
            <>
              <legend className="sr-only">Exclusive Login Fields</legend>
              <AuthInput placeholder="Email or Phone Number" />
              <AuthInput placeholder="Password" />
              <div className="flex items-center justify-between">
                <Button className="w-2/5">
                  {CTA.AUTH.LOGIN.LOGIN_BTN.TITLE}
                </Button>

                <a href="" className="text-secondary-cute-crab">
                  {CTA.AUTH.LOGIN.FORGOT.TITLE}
                </a>
              </div>
            </>
          )}
        </div>
      </fieldset>
    </form>
  );
};
