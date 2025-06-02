import "./ViewQtn.css";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../components/Header";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { loadDataFromIndexedDB, setLastUsed } from "../features/mainSlice";
import Test from "../components/Test";

function ViewQtn() {
  const { id } = useParams();
  const viewId = parseInt(id);
  const { test_data, isLoaded } = useSelector((store) => store.main);
  const qtn = test_data.find((item) => item.id === viewId);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const navigateBtn = (link) => {
    navigate(link);
  };

  //Data fetching
  useEffect(() => {
    if (!isLoaded) {
      dispatch(loadDataFromIndexedDB());
    }
  }, [dispatch, isLoaded]);

  //Toggle answers
  const [showAnswer, setShowAnswer] = useState(false);
  const toggleAnswer = () => {
    setShowAnswer(!showAnswer);
  };

  //Starting the test
  const [isOpen, setIsOpen] = useState(false);
  const toggleModal = () => setIsOpen(!isOpen);

  const [mode, setMode] = useState("In order");
  const handleChange = (e) => {
    setMode(e.target.value);
  };

  const [isLearning, setIsLearning] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsOpen(false);
    setIsLearning(true);
    dispatch(setLastUsed(viewId));
  };

  if (!isLoaded) {
    return (
      <>
        <Header />
        <div className="loading-overlay">
          <h2 className="loading-text">Loading...</h2>
        </div>
      </>
    );
  }

  return (
    <div>
      <Header />
      {!isLearning ? (
        <>
          <main className="ViewQtn">
            <div className="viewQtn-manage">
              <h2>{qtn.title}</h2>

              <button
                onClick={() => navigateBtn(`/manage-questionnaire/${qtn.id}`)}
              >
                Manage your questionnaire
              </button>
            </div>
            <button onClick={toggleModal} className="start-learning">
              Start learning!
            </button>
            <h3>Your questions:</h3>

            <div className="slider-container">
              <span>Show answers</span>
              <div
                className="slider-bar"
                style={{
                  backgroundColor: showAnswer ? "#4caf50" : "#ccc",
                }}
                onClick={toggleAnswer}
                role="switch"
                aria-checked={showAnswer}
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") toggleAnswer();
                }}
              >
                <span
                  className="slider-ball"
                  style={{
                    left: showAnswer ? "22px" : "2px",
                  }}
                ></span>
              </div>
            </div>
            <div className="view-question-container">
              {qtn.content.map((item, index) => (
                <div key={index} className="view-question">
                  <h4 style={{ whiteSpace: "pre-line" }}>{item.question}</h4>
                  <p
                    style={{
                      whiteSpace: "pre-line",
                      visibility: showAnswer ? "visible" : "hidden",
                    }}
                  >
                    {item.answer}
                  </p>
                </div>
              ))}
            </div>
          </main>
          {isOpen && (
            <div className="overlay">
              <div className="modal">
                <form onSubmit={handleSubmit} className="qtn-start-modal">
                  <fieldset>
                    <legend>Choose desired mode:</legend>

                    <label>
                      <input
                        type="radio"
                        value="In order"
                        onChange={handleChange}
                        name="mode"
                        defaultChecked={mode === "In order"}
                      />
                      In order
                    </label>
                    <label>
                      <input
                        type="radio"
                        value="Random"
                        onChange={handleChange}
                        name="mode"
                        defaultChecked={mode === "Random"}
                      />
                      Random
                    </label>
                  </fieldset>
                  <div className="qtn-start-buttons">
                    <button type="submit" className="finish">
                      Start!
                    </button>
                    <button onClick={toggleModal} className="leave">
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </>
      ) : (
        <>
          <Test
            qtn={qtn.content}
            mode={mode}
            setIsLearningInParent={setIsLearning}
          />
        </>
      )}
    </div>
  );
}
export default ViewQtn;
