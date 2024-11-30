import Header from "../components/Header";
import "./CreateQtn.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { addQuestionnaire } from "../features/mainSlice";

function CreateQtn() {
  const { newTitle } = useParams();

  const [qtn, setQtn] = useState({
    id: Date.now(),
    title: newTitle,
    content: [],
  });
  const [item, setItem] = useState({
    question: "",
    answer: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const navigationBtn = (link) => {
    navigate(link);
  };

  const handleChange = (e) => {
    setItem({
      ...item,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(item);
    setQtn({
      ...qtn,
      content: [...qtn.content, item],
    });
    setItem({
      question: "",
      answer: "",
    });
  };

  const handleFinish = () => {
    console.log(qtn);
    dispatch(addQuestionnaire(qtn));
    navigationBtn("/");
  };

  return (
    <>
      <Header />
      <main className="form-div">
        <div className="question-div">
          <h3>Title: {qtn.title}</h3>
          <form onSubmit={handleSubmit}>
            <label htmlFor="question">Question:</label>
            <textarea
              id="question"
              name="question"
              value={item.question}
              onChange={handleChange}
              required
            />

            <label htmlFor="answer">Answer</label>
            <textarea
              id="answer"
              name="answer"
              value={item.answer}
              onChange={handleChange}
              required
            />

            <button type="submit">Submit</button>
          </form>
          <button className="finish" onClick={handleFinish}>
            Finished!
          </button>
        </div>
      </main>
    </>
  );
}
export default CreateQtn;
