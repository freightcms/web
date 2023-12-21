import { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { LoginPage } from './pages';
import NavigationBar, { NavigationBarProvider } from './components/Navbar/Navbar';
import { Outlet } from 'react-router';

const App = () => {
  const {isAuthenticated, loginWithRedirect, isLoading} = useAuth0();
  const [isExpanded, setIsExpanded] = useState(false);

  if (isLoading) {
    return <div>Loading...</div>
  }
  if (!isAuthenticated) {
    loginWithRedirect();
    return <LoginPage />;
  }

  return (<>
    <header className="flex flex-row gap-x-2">
      <NavigationBarProvider value={{isExpanded, toggle: () => setIsExpanded(!isExpanded)}}>
        <NavigationBar />
      </NavigationBarProvider>
    </header>
    <main>
      <Outlet />
    </main>
    <footer>
      Footer Here
    </footer>
  </>);
}

export default App;
