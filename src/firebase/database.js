import {
  addDoc,
  collection,
  getDocs,
  deleteDoc,
  getFirestore,
  onSnapshot,
  doc,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { firebaseApp } from ".";

// init database
const db = getFirestore(firebaseApp);

// create doc
export const createData = async (colName, data) => {
  return await addDoc(collection(db, colName), {
    ...data,
  });
};

// create doc
export const getData = async (colName) => {
  const data = await getDocs(collection(db, colName));

  const dataList = [];
  data.forEach((item) => {
    dataList.push(item.data());
  });

  return dataList;
};

// create doc
export const deleteData = async (colName, id) => {
  await deleteDoc(doc(db, colName, id));
};

/**
 * Snapshot
 */
export const getRealTimeData = async (colName, stateName) => {
  onSnapshot(
    query(collection(db, colName), where("status", "==", true)),
    (snapshot) => {
      const datalist = [];
      snapshot.docs.forEach((item) => {
        datalist.push({ ...item.data(), id: item.id });
      });
      console.log(datalist);
      stateName(datalist);
    }
  );
};
