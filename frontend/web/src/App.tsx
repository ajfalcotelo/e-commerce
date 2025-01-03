import Header from './components/Header';
import { Login } from './pages/auth/LogIn';
import { Footer } from './components/Footer';

const App = () => {
  return (
    <div>
      <div className="h-screen w-full">
        <Header />
        <main className="w-full">
          <Login />
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default App;
