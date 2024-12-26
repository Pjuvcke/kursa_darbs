import { openDB } from "idb";

const DB_name = "Qtn-store";
const DB_version = 1;
const Store_name = "data-store";

//Open and create DB
export const openDatabase = async () => {
  return openDB(DB_name, DB_version, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(Store_name)) {
        db.createObjectStore(Store_name, {
          keyPath: "id",
          autoIncrement: true,
        });
      }
    },
  });
};

// Save/update data in DB
export const saveToIndexedDB = async (data) => {
  const db = await openDatabase();
  const tx = db.transaction(Store_name, "readwrite");
  const store = tx.objectStore(Store_name);
  store.put(data);
  await tx.done;
};

// Get data from DB
export const getFromIndexedDB = async () => {
  const db = await openDatabase();
  const tx = db.transaction(Store_name, "readonly");
  const store = tx.objectStore(Store_name);
  const data = await store.getAll();
  await tx.done;
  return data;
};
