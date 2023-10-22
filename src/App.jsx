import { useEffect, useState } from "react";
import Register from "./components/Register";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import Login from "./components/Login";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState();

  console.log(isLoggedIn);

  useEffect(() => {
    const authState = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(user);
      } else {
        console.log("No user found");
      }
    });

    return () => authState();
  }, []);

  return (
    <>
      {isLoggedIn && (
        <>
          <img src={isLoggedIn.photoURL} alt="" />
          <h1>{isLoggedIn.displayName}</h1>
          <p>{isLoggedIn.email}</p>
        </>
      )}

      <Register isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <hr />
      <Login isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
    </>
  );
}

export default App;
