import { useState, useEffect } from "react";

function Test({ qtn, mode, setIsLearningInParent }) {
  const [curQuestion, setCurQuestion] = useState({});
  const [index, setIndex] = useState(0);
  const [questionsInUse, setQuestionsInUse] = useState({});
  const [flipped, setFlipped] = useState(false);
  const [wrongQuestions, setWrongQuestions] = useState([]);
  const [completed, setCompleted] = useState(false);

  //Set up initial information
  useEffect(() => {
    if (mode === "In order") {
      setCurQuestion(qtn[0]);
      setQuestionsInUse(qtn);
    } else {
      const shuffled = shuffleQuestions(qtn);
      setCurQuestion(shuffled[0]);
      setQuestionsInUse(shuffled);
    }
  }, [mode, qtn]);

  //Randomize the questions
  const shuffleQuestions = (arr) => {
    const shuffled = [...arr];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const randomId = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[randomId]] = [shuffled[randomId], shuffled[i]];
    }
    console.log("Orginalais: ", arr);
    console.log("Random: ", shuffled);
    return shuffled;
  };

  //Handle question answers
  const handleNext = (response) => {
    if (!response) {
      setWrongQuestions([...wrongQuestions, curQuestion]);
    }
    const curIndex = index + 1;
    if (curIndex !== questionsInUse.length) {
      setIndex(curIndex);
      setCurQuestion(questionsInUse[curIndex]);
      setFlipped(false);
    } else {
      setCompleted(true);
    }
  };
  useEffect(() => {
    console.log("Pirms/pec testa: ", wrongQuestions);
  }, [completed, wrongQuestions]);

  //Show other side of the card
  const flipCard = () => {
    setFlipped(!flipped);
  };

  //Handle returning to the questionnaire
  const handleReturn = () => {
    setIsLearningInParent(false);
  };

  //Initialization of trying again
  const handleTryAgain = () => {
    setIndex(0);
    setWrongQuestions([]);
    setCompleted(false);
    setFlipped(false);
    if (mode === "In order") {
      setCurQuestion(questionsInUse[0]);
    } else {
      const shuffled = shuffleQuestions(questionsInUse);
      setCurQuestion(shuffled[0]);
      setQuestionsInUse(shuffled);
    }
  };

  //Initialization of answering wrong questions
  const handleWrong = () => {
    setIndex(0);
    setCompleted(false);
    setFlipped(false);
    if (mode === "In order") {
      setCurQuestion(wrongQuestions[0]);
      setQuestionsInUse(wrongQuestions);
      setWrongQuestions([]);
    } else {
      const shuffled = shuffleQuestions(wrongQuestions);
      setCurQuestion(shuffled[0]);
      setQuestionsInUse(shuffled);
      setWrongQuestions([]);
    }
  };

  return (
    <>
      <main className="ViewQtn-Test">
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
            {wrongQuestions.length === 0 ? (
              <>
                <h2>All questions correct!</h2>
                <button onClick={handleReturn}>Return</button>
                <button onClick={handleTryAgain}>Try again</button>
              </>
            ) : (
              <>
                <h2>Looks like you had some trouble!</h2>
                <button onClick={handleReturn}>Return</button>
                <button onClick={handleTryAgain}>Try again</button>
                {questionsInUse.length !== wrongQuestions.length && (
                  <button onClick={handleWrong}>
                    Answer incorrect questions
                  </button>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
export default Test;
