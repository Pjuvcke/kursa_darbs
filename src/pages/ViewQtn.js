import "./ViewQtn.css";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../components/Header";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { loadDataFromIndexedDB } from "../features/mainSlice";
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
    console.log("Is loaded: ", isLoaded);
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
    // if (mode === "In order") {
    //   setCurQuestion(qtn.content[0]);
    // }
  };

  //Going through the test
  // const [curQuestion, setCurQuestion] = useState({});
  // const [index, setIndex] = useState(0);
  // const [flipped, setFlipped] = useState(false);
  // const [wrongQuestions, setWrongQuestions] = useState([]);
  // const [completed, setCompleted] = useState(false);

  // const handleNext = (response, array) => {
  //   console.log("Nepareizie jautajumi ieksa next: ", wrongQuestions);
  //   if (mode === "In order") {
  //     if (!response) {
  //       setWrongQuestions([...wrongQuestions, curQuestion]);
  //     }
  //     const curIndex = index + 1;
  //     if (curIndex !== qtn.content.length) {
  //       setIndex(curIndex);
  //       setCurQuestion(qtn.content[curIndex]);
  //     } else {
  //       setCompleted(true);
  //     }
  //   }
  // };
  // useEffect(() => {
  //   console.log("Pirms/pec testa: ", wrongQuestions);
  //   setWrongQuestions([]);
  // }, [isLearning]);

  // const flipCard = () => {
  //   setFlipped(!flipped);
  // };

  // const handleReturn = () => {
  //   setIsLearning(false);
  //   setCompleted(false);
  //   if (mode === "In order") {
  //     setIndex(0);
  //     setCurQuestion(qtn.content[0]);
  //   }
  // };

  // const handleTryAgain = () => {
  //   setCompleted(false);
  //   if (mode === "In order") {
  //     setIndex(0);
  //     setCurQuestion(qtn.content[0]);
  //   }
  // };

  // const handleWrong = () => {
  //   setCompleted(false);
  //   if (mode === "In order") {
  //     setIndex(0);
  //     setCurQuestion(wrongQuestions[0]);
  //   }
  // };

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
              onClick={() => navigateBtn(`/manage-questionnaire/${qtn.id}`)}
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
                  <button type="submit">Start!</button>
                  <button onClick={toggleModal}>Cancel</button>
                </form>
              </div>
            </div>
          )}
        </>
      ) : (
        <>
          {/* <main className="ViewQtn">
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
          {completed && (
            <div className="overlay">
              <div className="modal">
                <h2>Test completed</h2>
                {wrongQuestions.length === 0 ? (
                  <>
                    <h3>All questions correct!</h3>
                    <button onClick={handleReturn}>Return</button>
                    <button onClick={handleTryAgain}>Try again</button>
                  </>
                ) : (
                  <>
                    <h3>Looks like you had some trouble!</h3>
                    <button onClick={handleReturn}>Return</button>
                    <button onClick={handleTryAgain}>Try again</button>
                    <button onClick={handleWrong}>
                      Answer incorrect questions
                    </button>
                  </>
                )}
              </div>
            </div>
          )} */}
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
