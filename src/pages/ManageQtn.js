import "./ManageQtn.css";
import Header from "../components/Header";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";

import {
  saveDataToIndexedDB,
  loadDataFromIndexedDB,
} from "../features/mainSlice";
import { toggleLoaded } from "../features/mainSlice";

function ManageQtn() {
  const { test_data, isLoaded } = useSelector((store) => store.main);
  const { id } = useParams();
  const manageId = parseInt(id);
  const dispatch = useDispatch();
  const [qtn, setQtn] = useState({
    id: -1,
  });

  //Data fetching
  useEffect(() => {
    if (!isLoaded) {
      console.log("Dati nav ieladeti");
      dispatch(loadDataFromIndexedDB());
    } else {
      console.log("manageID: ", manageId);
      console.log("testda: ", test_data);
      const manageQtn = test_data.find((item) => item.id === manageId);
      if (manageQtn) {
        console.log("Ir managing: ", manageQtn);
        setQtn(manageQtn);
      }
    }
  }, [dispatch, isLoaded, manageId, test_data]);

  useEffect(() => {
    console.log("isLoaded:", isLoaded);
    console.log("test_data:", test_data);
  }, [isLoaded, test_data]);

  const [item, setItem] = useState({
    question: "",
    answer: "",
  });

  const navigate = useNavigate();
  const navigationBtn = (link) => {
    navigate(link);
  };

  //Question adding
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
    dispatch(toggleLoaded(false));
    dispatch(saveDataToIndexedDB(qtn));
    navigationBtn("/");
  };

  //Question, title editing
  const [editTitle, setEditTitle] = useState(false);
  const [editQuestion, setEditQuestion] = useState(false);
  const [updatedTitle, setUpdatedTitle] = useState("");
  const [index, setIndex] = useState();
  const [updatedItem, setUpdatedItem] = useState({
    question: "",
    answer: "",
  });
  const openEditTitle = () => {
    setEditTitle(true);
    setUpdatedTitle(qtn.title);
  };

  const deleteQuestion = (received_item) => {
    setQtn((prevQtn) => ({
      ...prevQtn,
      content: prevQtn.content.filter((item) => item !== received_item),
    }));
  };
  const openEditQuestion = (received_item, received_index) => {
    setEditQuestion(true);
    setIndex(received_index);
    setUpdatedItem({
      question: received_item.question,
      answer: received_item.answer,
    });
  };
  const handleEditChange = (e) => {
    if (e.target.name === "title") {
      setUpdatedTitle(e.target.value);
    } else {
      setUpdatedItem({
        ...updatedItem,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleEdited = (e) => {
    e.preventDefault();
    if (editTitle) {
      setQtn({
        ...qtn,
        title: updatedTitle,
      });
      setEditTitle(false);
    } else {
      setEditQuestion(false);
      setQtn({
        ...qtn,
        content: qtn.content.map((item, idx) =>
          idx === index ? updatedItem : item
        ),
      });
    }
  };
  const handleClosed = () => {
    if (editTitle) {
      setEditTitle(false);
    } else {
      setEditQuestion(false);
    }
  };

  if (!isLoaded || qtn.id === -1) {
    return (
      <div className="loading-overlay">
        <h2 className="loading-text">Loading...</h2>
      </div>
    );
  }

  return (
    <>
      <Header />
      <main className="ManageQtn">
        <div className="question-div">
          <div className="title">
            <h3>Title: {qtn.title}</h3>
            <button onClick={openEditTitle}>Edit</button>
          </div>
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
            <button type="submit">Add question</button>
          </form>
          <button className="finish" onClick={handleFinish}>
            Finished!
          </button>
        </div>
        <div className="created-questions">
          {qtn.content.length === 0 ? (
            <h3>Add some questions!</h3>
          ) : (
            <h3>Your questions:</h3>
          )}
          <div className="question-box">
            {qtn.content.map((item, index) => (
              <div className="question" key={index}>
                <h4 style={{ whiteSpace: "pre-line" }}>{item.question}</h4>
                <p style={{ whiteSpace: "pre-line" }}>{item.answer}</p>

                <button onClick={() => openEditQuestion(item, index)}>
                  Edit
                </button>
                <button onClick={() => deleteQuestion(item)}>Delete</button>
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
                    value={updatedItem.question}
                    onChange={handleEditChange}
                    required
                  />
                  <label htmlFor="answer">Answer</label>
                  <textarea
                    id="answer"
                    name="answer"
                    value={updatedItem.answer}
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
