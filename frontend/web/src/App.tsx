import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Auth } from './pages/auth/Auth';
import { ROUTES } from './utils/constant';
import { Contacts } from './pages/contacts';
import { About } from './pages/about';
import { Shop } from './pages/Shop';
import { Banner } from './components/Banner';
const App = () => {
  let component;

  /**
   * TO BE REFACTORED:
   *    SWITCH CASE EWW
   *    WE WILL USE ReactRouter Library Instead
   */

  switch (window.location.pathname) {
    case ROUTES.SIGN_UP:
      component = <Auth isSignup={true} />;
      break;
    case ROUTES.LOGIN:
      component = <Auth isSignup={false} />;
      break;
    case ROUTES.CONTACT:
      component = <Contacts />;
      break;
    case ROUTES.ABOUT:
      component = <About />;
      break;
    default:
      component = <Shop />;
  }
  return (
    <div className="overflow-x-hidden">
      <div className="h-screen w-full">
        <Banner />
        <Header />
        <main className="w-full">{component}</main>
      </div>
      <Footer />
    </div>
  );
};

export default App;
