import "./ManageQtn.css";
import Header from "../components/Header";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { addQuestionnaire } from "../features/mainSlice";

function ManageQtn() {
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

  //ADDING A QUESTION
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

  //EDITING A QUESTION
  const [editTitle, setEditTitle] = useState(false);
  const [editQuestion, setEditQuestion] = useState(false);
  const [updatedTitle, setUpdatedTitle] = useState("");
  const [updatedItem, setUpdatedItem] = useState({
    question: "",
    answer: "",
  });
  const openEditTitle = () => {
    setEditTitle(true);
    setUpdatedTitle(qtn.title);
  };
  const openEditQuestion = (item) => {
    setEditTitle(true);
  };
  const handleEditChange = (e) => {
    if (e.target.name === "title") {
      setUpdatedTitle(e.target.value);
    }
  };
  const handleEdited = (e) => {
    console.log("ieksa handleEdited");
    e.preventDefault();
    if (editTitle) {
      setQtn({
        ...qtn,
        title: updatedTitle,
      });
      setEditTitle(false);
    } else {
      setEditQuestion(false);
    }
  };
  const handleClosed = () => {
    if (editTitle) {
      setEditTitle(false);
    } else {
      setEditQuestion(false);
    }
  };

  return (
    <>
      <Header />
      <main className="ManageQtn">
        <div className="question-div">
          <h3>Title: {qtn.title}</h3>
          <button onClick={openEditTitle}>Edit</button>
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
        <div className="created-questions">
          <h3>Your questions:</h3>
          <div className="question-box">
            {qtn.content.map((item) => (
              <div className="question">
                <h4>{item.question}</h4>
                <p>{item.answer}</p>
                <button onClick={() => openEditQuestion(item)}>Edit</button>
              </div>
            ))}
          </div>
        </div>
      </main>
      {(editTitle || editQuestion) && (
        <div className="overlay">
          <div className="modal">
            {editTitle ? <h3>Edit your title</h3> : <h3>Edit your question</h3>}
            <form onSubmit={handleEdited}>
              {editTitle ? (
                <textarea
                  rows="1"
                  name="title"
                  id="title"
                  value={updatedTitle}
                  onChange={handleEditChange}
                  required
                />
              ) : (
                <>
                  <label htmlFor="question">Question:</label>
                  <textarea
                    id="question"
                    name="question"
                    value={item.question}
                    onChange={handleEditChange}
                    required
                  />
                  <label htmlFor="answer">Answer</label>
                  <textarea
                    id="answer"
                    name="answer"
                    value={item.answer}
                    onChange={handleEditChange}
                    required
                  />
                </>
              )}
              <button type="submit">Edit!</button>
              <button onClick={handleClosed}>Cancel</button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
export default ManageQtn;
