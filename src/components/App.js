import React, { useState } from "react";
import AppRouter from "components/Router";
import { authService } from "fbConfig";

function App() {
  console.log("------------------------------------");
  console.log(authService.currentUser);
  console.log("------------------------------------");
  const [isLoggedIn, setIsLoggedIn] = useState(authService.currentUser);
  return (
    <>
      <AppRouter isLoggedIn={isLoggedIn} />
      <footer>&copy; Nwitter {new Date().getFullYear()}</footer>
    </>
  );
}

export default App;
