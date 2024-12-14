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

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const navigateBtn = (link) => {
    navigate(link);
  };

  useEffect(() => {
    console.log("Is loaded: ", isLoaded);
    if (!isLoaded) {
      dispatch(loadDataFromIndexedDB());
    }
  }, [dispatch, isLoaded]);

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
  };

  //Jautājuma rādīšana
  const [curQuestion, setCurQuestion] = useState(
    !isLoaded ? "" : qtn.content[0]
  );
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const handleNext = (response) => {
    if (mode === "In order") {
      const curIndex = index + 1;
      if (curIndex !== qtn.content.length) {
        setIndex(curIndex);
        setCurQuestion(qtn.content[curIndex]);
      } else {
        handleReturn();
      }
    }
  };

  const flipCard = () => {
    setFlipped(!flipped);
  };

  const handleReturn = () => {
    setIsLearning(false);
    setIndex(0);
    setCurQuestion(qtn.content[0]);
  };

  const [showAnswer, setShowAnswer] = useState(false);

  const toggleAnswer = () => {
    setShowAnswer(!showAnswer);
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
            <h2>{qtn.title}</h2>
            <button onClick={toggleModal}>Start learning!</button>
            <button
              onClick={() => navigateBtn(`/manage-questionnaire/${qtn.title}`)}
            >
              Manage your questionnaire
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
            <div className="view-question-overlay">
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
                <h3>Choose desired settings:</h3>
                <form onSubmit={handleSubmit}>
                  <fieldset>
                    <legend>Choose desired mode:</legend>

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
        <main className="ViewQtn">
          <h1>Learning! Current mode: {mode}</h1>
          <button onClick={handleReturn}>Return</button>
          {!flipped ? (
            <h1>{curQuestion.question}</h1>
          ) : (
            <h1>{curQuestion.answer}</h1>
          )}
          <div>
            <button onClick={() => handleNext(false)}>Incorrect</button>
            <button onClick={flipCard}>
              Show {flipped ? "question" : "anser"}
            </button>
            <button onClick={() => handleNext(true)}>Correct</button>
          </div>
        </main>
      )}
    </div>
  );
}
export default ViewQtn;
