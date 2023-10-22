import { useEffect, useState } from "react";
import "../App.css";
import { createData, deleteData, getRealTimeData } from "../firebase/database";
import { serverTimestamp } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase";

const Devs = () => {
  const [input, setInput] = useState({
    name: "",
    age: "",
    skill: "",
    photo: "",
    createdAt: serverTimestamp(),
    status: true,
    trash: false,
  });

  const [devs, setDevs] = useState([]);
  const [file, setFile] = useState([]);

  console.log(file);

  const handleInputChange = (e) => {
    setInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleDevsCreate = async (e) => {
    e.preventDefault();

    const fileData = await uploadBytesResumable(ref(storage, file.name), file);

    const link = await getDownloadURL(fileData.ref);

    await createData("devs", { ...input, photo: link });
  };

  const handleDataDelete = async (id) => {
    await deleteData("devs", id);
  };

  useEffect(() => {
    getRealTimeData("devs", setDevs);
  }, []);

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-10">
            <form onSubmit={handleDevsCreate}>
              <input
                type="text"
                placeholder="name"
                value={input.name}
                name="name"
                onChange={handleInputChange}
              />
              <input
                type="text"
                placeholder="age"
                value={input.age}
                name="age"
                onChange={handleInputChange}
              />
              <input
                type="text"
                placeholder="skill"
                value={input.skill}
                name="skill"
                onChange={handleInputChange}
              />
              <input type="file" onChange={(e) => setFile(e.target.files[0])} />
              <button type="submit">Add</button>
            </form>
          </div>
        </div>
        <div className="row">
          <div className="col-md-10">
            <div className="card">
              <div className="card-body">
                <table className="table">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Name</th>
                      <th>Age</th>
                      <th>Skill</th>
                      <th>Photo</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {devs.map((item, index) => {
                      return (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{item.name}</td>
                          <td>{item.age}</td>
                          <td>{item.skill}</td>
                          <td>
                            <img
                              style={{
                                width: "100px",
                                height: "100px",
                                objectFit: "cover",
                              }}
                              src={item.photo}
                              alt=""
                            />
                          </td>
                          <td>
                            <button onClick={() => handleDataDelete(item.id)}>
                              Delete
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Devs;
