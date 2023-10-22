import { serverTimestamp } from "firebase/firestore";
import { useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth, storage } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const Register = ({ isLoggedIn, setIsLoggedIn }) => {
  const [input, setInput] = useState({
    name: "",
    email: "",
    password: "",
    photo: "",
    createdAt: serverTimestamp(),
    status: true,
    trash: false,
  });

  const [file, setFile] = useState([]);

  const handleInputChange = (e) => {
    setInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleUserRegister = async (e) => {
    e.preventDefault();

    const data = await createUserWithEmailAndPassword(
      auth,
      input.email,
      input.password
    );

    const fileData = await uploadBytesResumable(ref(storage, file.name), file);
    const link = await getDownloadURL(fileData.ref);
    console.log(link);

    await updateProfile(data.user, {
      displayName: input.name,
      photoURL: link,
    });

    await signOut(auth);
    setIsLoggedIn(false);
  };

  const handleUserLogout = async () => {
    await signOut(auth);
    setIsLoggedIn(false);
  };

  return (
    <div>
      {isLoggedIn ? (
        <button onClick={handleUserLogout}>Logout</button>
      ) : (
        <h1>You are logged out</h1>
      )}

      <hr />
      <form onSubmit={handleUserRegister}>
        <input
          type="text"
          placeholder="Name"
          value={input.name}
          name="name"
          onChange={handleInputChange}
        />
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
        <input
          type="file"
          placeholder="photo"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default Register;
