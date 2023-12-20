import { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { LoginPage } from './pages';
import NavigationBar, { NavigationBarProvider } from './components/Navbar/Navbar';

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
      <div className="flex-grow">
        <img src="https://gravatar.com/avatar/6186d8f9697ae4b54e92fc3876ab05d98040e3ef4ef4fcc084eef3cf1b7e7dca" alt="Freight CMS Logo" />
      </div>
      <NavigationBarProvider value={{isExpanded, toggle: () => setIsExpanded(!isExpanded)}}>
        <NavigationBar />
      </NavigationBarProvider>
    </header>
    <main>
      Content Here
    </main>
    <footer>
      Footer Here
    </footer>
  </>);
}

export default App;
