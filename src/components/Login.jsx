import { useState } from "react";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, facebookProvider, googleProvider } from "../firebase";

const Login = ({ isLoggedIn, setIsLoggedIn }) => {
  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    setInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleUserLogin = async (e) => {
    e.preventDefault();
    const data = await signInWithEmailAndPassword(
      auth,
      input.email,
      input.password
    );

    console.log(data);

    setIsLoggedIn(data.user);
  };

  const handleGoogleLogin = async () => {
    const data = await signInWithPopup(auth, googleProvider);
    setIsLoggedIn(data.user);
  };

  const handleFacebookLogin = async () => {
    const data = await signInWithPopup(auth, facebookProvider);
    setIsLoggedIn(data.user);
  };

  return (
    <div>
      <form onSubmit={handleUserLogin}>
        <input
          type="text"
          placeholder="email"
          value={input.email}
          name="email"
          onChange={handleInputChange}
        />
        <input
          type="text"
          placeholder="password"
          value={input.password}
          name="password"
          onChange={handleInputChange}
        />

        <button type="submit">Login</button>
      </form>
      <hr />
      <button onClick={handleGoogleLogin}>Google</button>
      <button onClick={handleFacebookLogin}>Facebook</button>
    </div>
  );
};

export default Login;
