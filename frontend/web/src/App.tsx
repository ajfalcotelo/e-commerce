import Header from './components/Header';
import { Login } from './pages/auth/LogIn';

const App = () => {
  return (
    <div className="h-screen w-full">
      <Header />
      <main className="w-full">
        <Login />
      </main>
      <footer>test</footer>
    </div>
  );
};

export default App;
