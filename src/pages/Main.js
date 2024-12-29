import "./Main.css";
import Header from "../components/Header";
import QtnSmall from "../components/QtnSmall";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  toggleLoaded,
  loadDataFromIndexedDB,
  saveDataToIndexedDB,
} from "../features/mainSlice";
import { getFromIndexedDB } from "../utility/indexedDB";

function Main() {
  const { test_data, isLoaded } = useSelector((store) => store.main);
  const { data } = useSelector((store) => store.main);
  const [isOpen, setIsOpen] = useState(false);
  const [qtn, setQtn] = useState({
    id: Date.now(),
    title: "",
    content: [],
  });

  const dispatch = useDispatch();
  //Data fetching
  useEffect(() => {
    if (isLoaded) return;
    console.log("garam loaded");
    const saveData = async () => {
      const db = await getFromIndexedDB();
      if (db.length === 0) {
        console.log("esmu ieksa if length: ", db.length);
        data.map((item) => dispatch(saveDataToIndexedDB(item)));
      }
      dispatch(loadDataFromIndexedDB());
      dispatch(toggleLoaded(true));
    };

    saveData();
  }, [dispatch, data, test_data, isLoaded]);

  //useEffect for testing
  useEffect(() => {
    console.log("idb outputs: ", test_data);
    console.log("isLoaded: ", isLoaded);
  }, [test_data, isLoaded]);

  const navigate = useNavigate();
  const navigationBtn = (link) => {
    navigate(link);
  };

  //Functions for creating questionnaire
  const formToggle = () => {
    setIsOpen(!isOpen);
  };

  const addQtn = () => {
    formToggle();
  };

  const handleChange = (e) => {
    setQtn({ ...qtn, title: e.target.value });
  };
  const handleClosed = () => {
    formToggle();
    setQtn({ ...qtn, title: "" });
  };

  const addQtnSubmit = (e) => {
    e.preventDefault();
    formToggle();
    dispatch(saveDataToIndexedDB(qtn));
    dispatch(toggleLoaded(false));
    navigationBtn(`/manage-questionnaire/${qtn.id}`);
  };

  return (
    <>
      <Header />
      <main className="Main">
        <div className="above-qtn-list">
          <h3>Your questionnaires:</h3>
          <button onClick={addQtn}>Create a questionnaire</button>
        </div>
        <div className="qtn-list">
          {test_data.map((qtn) => (
            <QtnSmall key={qtn.id} qtn={qtn} />
          ))}
        </div>
      </main>
      {isOpen && (
        <div className="overlay">
          <div className="modal">
            <h3>Enter the name of a new questionnaire:</h3>
            <form onSubmit={addQtnSubmit}>
              <textarea
                rows="1"
                name="title"
                id="title"
                value={qtn.title}
                onChange={handleChange}
                required
              />
              <div className="modal-buttons">
                <button type="submit">
                  Start creating a new questionnaire!
                </button>
                <button onClick={handleClosed} className="leave">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default Main;
