import "./ViewQtn.css";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../components/Header";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { loadDataFromIndexedDB } from "../features/mainSlice";

function ViewQtn() {
  const { id } = useParams();
  const realId = parseInt(id);
  const { test_data, isLoaded } = useSelector((store) => store.main);
  const qtn = test_data.find((item) => item.id === realId);

  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState("In order");
  const [isLearning, setIsLearning] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const navigateBtn = (link) => {
    navigate(link);
  };

  useEffect(() => {
    if (!isLoaded) {
      dispatch(loadDataFromIndexedDB());
    }
  }, [dispatch, isLoaded]);

  const toggleModal = () => setIsOpen(!isOpen);

  const handleChange = (e) => {
    setMode(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsOpen(false);
    setIsLearning(true);
  };

  if (!isLoaded) {
    return (
      <div className="loading-overlay">
        <h2 className="loading-text">Loading...</h2>
      </div>
    );
  }

  return (
    <div>
      <Header />
      {!isLearning ? (
        <>
          {" "}
          <main className="ViewQtn">
            <h2>{qtn.title}</h2>
            <button onClick={toggleModal}>Start learning!</button>
            <button
              onClick={() => navigateBtn(`/manage-questionnaire/${qtn.title}`)}
            >
              Manage your questionnaire
            </button>
            <h3>Your questions:</h3>
            <div className="view-question-overlay">
              {qtn.content.map((item, index) => (
                <div key={index} className="view-question">
                  <h4 style={{ whiteSpace: "pre-line" }}>{item.question}</h4>
                  <p style={{ whiteSpace: "pre-line" }}>{item.answer}</p>
                </div>
              ))}
            </div>
          </main>
          {isOpen && (
            <div className="overlay">
              <div className="modal">
                <h3>Choose desired settings:</h3>
                <form onSubmit={handleSubmit}>
                  <fieldset>
                    <legend>Choose the mode:</legend>

                    <label>
                      <input
                        type="radio"
                        value="In order"
                        onChange={handleChange}
                        name="mode"
                        defaultChecked
                      />
                      In order
                    </label>
                    <label>
                      <input
                        type="radio"
                        value="Random"
                        onChange={handleChange}
                        name="mode"
                      />
                      Random
                    </label>
                  </fieldset>
                  <button type="submit">Start!</button>
                  <button onClick={toggleModal}>Cancel</button>
                </form>
              </div>
            </div>
          )}
        </>
      ) : (
        <>
          <h1>Learning! Current mode: {mode}</h1>
        </>
      )}
    </div>
  );
}
export default ViewQtn;
