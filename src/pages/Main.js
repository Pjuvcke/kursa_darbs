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
import Error from "../components/Error";

function Main() {
  const { test_data, isLoaded } = useSelector((store) => store.main);
  const { data } = useSelector((store) => store.main);
  const [isOpen, setIsOpen] = useState(false);
  const [qtn, setQtn] = useState({
    id: Date.now(),
    title: "",
    content: [],
  });
  const [showError, setShowError] = useState(false);

  const dispatch = useDispatch();
  //Data fetching
  useEffect(() => {
    if (isLoaded) return;
    const saveData = async () => {
      const db = await getFromIndexedDB();
      if (db.length === 0) {
        data.map((item) => dispatch(saveDataToIndexedDB(item)));
      }
      dispatch(loadDataFromIndexedDB());
      dispatch(toggleLoaded(true));
    };

    saveData();
  }, [dispatch, data, test_data, isLoaded]);

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
    const value = e.target.value;
    setQtn({ ...qtn, title: value });
    if (showError) {
      if (value !== "") {
        setShowError(false);
      }
    }
    if (value === "") {
      setShowError(true);
    }
  };
  const handleClosed = () => {
    formToggle();
    setShowError(false);
    setQtn({ ...qtn, title: "" });
  };

  const addQtnSubmit = (e) => {
    if (qtn.title !== "") {
      e.preventDefault();
      formToggle();
      dispatch(saveDataToIndexedDB(qtn));
      dispatch(toggleLoaded(false));
      navigationBtn(`/manage-questionnaire/${qtn.id}`);
    } else {
      e.preventDefault();
      setShowError(true);
    }
  };

  return (
    <>
      <Header />
      <main className="Main">
        <div className="above-qtn-list">
          {test_data.length === 0 ? (
            <h3>No questionnaires created!</h3>
          ) : (
            <h3>Your questionnaires:</h3>
          )}
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
              />
              {showError ? (
                <Error errorClass="error-add" text="Title must be provided!" />
              ) : (
                <></>
              )}
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
