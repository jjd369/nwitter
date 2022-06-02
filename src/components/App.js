import React, { useEffect, useState } from "react";
import AppRouter from "components/Router";
import { onAuthStateChangedLisenter, authService } from "fb/fbAuth";

function App() {
  const [init, setInit] = useState(false);
  const [userObj, setUserObj] = useState(null);

  useEffect(() => {
    onAuthStateChangedLisenter((user) => {
      setUserObj(user);
      setInit(true);
    });
  }, []);
  const refreshUser = () => {
    const user = authService.currentUser;
    setUserObj({ ...user });
  };
  return (
    <>
      {init ? (
        <AppRouter
          isLoggedIn={!!userObj}
          userObj={userObj}
          refreshUser={refreshUser}
        />
      ) : (
        "Initiallizing..."
      )}
    </>
  );
}

export default App;
