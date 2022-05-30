import React, { useEffect, useState } from "react";
import AppRouter from "components/Router";
import { authService, onAuthState } from "fb/fbAuth";

function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(authService.currentUser);
  useEffect(() => {
    onAuthState((user) => {
      !user ? setIsLoggedIn(false) : setIsLoggedIn(true);
      console.log(init);
      setInit(true);
    });
  }, []);
  return (
    <>
      {init ? <AppRouter isLoggedIn={isLoggedIn} /> : "Initiallizing..."}
      <footer>&copy; Nwitter {new Date().getFullYear()}</footer>
    </>
  );
}

export default App;
