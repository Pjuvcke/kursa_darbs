import "./ManageQtn.css";
import Header from "../components/Header";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  toggleLoaded,
  saveDataToIndexedDB,
  loadDataFromIndexedDB,
  deleteDataFromIndexedDB,
  setLastUsed,
  removeLast,
} from "../features/mainSlice";
import Error from "../components/Error";

function ManageQtn() {
  const { test_data, isLoaded, lastUsed } = useSelector((store) => store.main);
  const { id } = useParams();
  const manageId = parseInt(id);
  const dispatch = useDispatch();
  const [qtn, setQtn] = useState({
    id: -1,
  });
  const [showTitleError, setShowTitleError] = useState(false);
  const [showQuestionError, setShowQuestionError] = useState(false);
  const [showAnswerError, setShowAnswerError] = useState(false);

  //Data fetching
  useEffect(() => {
    if (!isLoaded) {
      dispatch(loadDataFromIndexedDB());
    } else {
      const manageQtn = test_data.find((item) => item.id === manageId);
      if (manageQtn) {
        setQtn(manageQtn);
      }
    }
  }, [dispatch, isLoaded, manageId, test_data]);

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
    const { name, value } = e.target;
    setItem({
      ...item,
      [name]: value,
    });
    if (showQuestionError) {
      if (name === "question" && value !== "") {
        setShowQuestionError(false);
      }
    }
    if (showAnswerError) {
      if (name === "answer" && value !== "") {
        setShowAnswerError(false);
      }
    }
    if (name === "question" && value === "") {
      setShowQuestionError(true);
    }
    if (name === "answer" && value === "") {
      setShowAnswerError(true);
    }
  };
  const handleSubmit = (e) => {
    if (item.question !== "" && item.answer !== "") {
      e.preventDefault();
      setQtn({
        ...qtn,
        content: [...qtn.content, item],
      });
      setItem({
        question: "",
        answer: "",
      });
    } else {
      e.preventDefault();
      if (item.question === "") {
        setShowQuestionError(true);
      }
      if (item.answer === "") {
        setShowAnswerError(true);
      }
    }
  };
  const handleFinish = () => {
    dispatch(toggleLoaded(false));
    dispatch(saveDataToIndexedDB(qtn));
    navigationBtn("/");
  };
  const deleteQtn = () => {
    dispatch(deleteDataFromIndexedDB(manageId));
    if (test_data.length !== 1) {
      dispatch(toggleLoaded(false));
    } else {
      dispatch(removeLast());
    }
    if (lastUsed === manageId) {
      dispatch(setLastUsed(0));
    }
    navigate("/");
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
  const [showEditQuestionError, setShowEditQuestionError] = useState(false);
  const [showEditAnswerError, setShowEditAnswerError] = useState(false);
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
      if (showTitleError) {
        if (e.target.value !== "") {
          setShowTitleError(false);
        }
      }
      if (e.target.value === "") {
        setShowTitleError(true);
      }
    } else {
      setUpdatedItem({
        ...updatedItem,
        [e.target.name]: e.target.value,
      });
      if (showEditQuestionError) {
        if (e.target.name === "question" && e.target.value !== "") {
          setShowEditQuestionError(false);
        }
      }
      if (showEditAnswerError) {
        if (e.target.name === "answer" && e.target.value !== "") {
          setShowEditAnswerError(false);
        }
      }
      if (e.target.name === "question" && e.target.value === "") {
        setShowEditQuestionError(true);
      }
      if (e.target.name === "answer" && e.target.value === "") {
        setShowEditAnswerError(true);
      }
    }
  };

  const handleEdited = (e) => {
    e.preventDefault();
    if (editTitle) {
      if (updatedTitle !== "") {
        setQtn({
          ...qtn,
          title: updatedTitle,
        });
        setEditTitle(false);
      } else {
        setShowTitleError(true);
      }
    } else {
      if (updatedItem.question !== "" && updatedItem.answer !== "") {
        setEditQuestion(false);
        setQtn({
          ...qtn,
          content: qtn.content.map((item, idx) =>
            idx === index ? updatedItem : item
          ),
        });
      } else {
        if (updatedItem.question === "") {
          setShowEditQuestionError(true);
        }
        if (updatedItem.answer === "") {
          setShowEditAnswerError(true);
        }
      }
    }
  };
  const handleClosed = () => {
    if (editTitle) {
      setEditTitle(false);
      setShowTitleError(false);
    } else {
      setEditQuestion(false);
      setShowEditAnswerError(false);
      setShowEditQuestionError(false);
    }
  };

  if (!isLoaded || qtn.id === -1) {
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
            />
            {showQuestionError ? (
              <Error
                errorClass="error-manage"
                text="Question must be provided!"
              />
            ) : (
              <></>
            )}
            <label htmlFor="answer">Answer:</label>
            <textarea
              id="answer"
              name="answer"
              value={item.answer}
              onChange={handleChange}
            />
            {showAnswerError ? (
              <Error
                errorClass="error-manage"
                text="Question must be provided!"
              />
            ) : (
              <></>
            )}
            <button type="submit">Add question</button>
          </form>
          <div className="finish-buttons">
            <button onClick={deleteQtn} className="leave">
              Delete
            </button>
            <button className="finish" onClick={handleFinish}>
              Save changes
            </button>
          </div>
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
                <div className="edit-buttons">
                  <button onClick={() => openEditQuestion(item, index)}>
                    Edit
                  </button>
                  <button
                    onClick={() => deleteQuestion(item)}
                    className="leave"
                  >
                    Delete
                  </button>
                </div>
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
                <>
                  <textarea
                    rows="1"
                    name="title"
                    id="title"
                    value={updatedTitle}
                    onChange={handleEditChange}
                    className="edit-title-textarea"
                  />
                  {showTitleError ? (
                    <Error
                      errorClass="error-manage"
                      text="Title must be provided!"
                    />
                  ) : (
                    <></>
                  )}
                </>
              ) : (
                <>
                  <label htmlFor="question">Question:</label>
                  <textarea
                    id="question"
                    name="question"
                    value={updatedItem.question}
                    onChange={handleEditChange}
                    className="edit-question-textarea"
                  />
                  {showEditQuestionError ? (
                    <Error
                      errorClass="error-manage"
                      text="Question must be provided!"
                    />
                  ) : (
                    <></>
                  )}
                  <label htmlFor="answer">Answer:</label>
                  <textarea
                    id="answer"
                    name="answer"
                    value={updatedItem.answer}
                    onChange={handleEditChange}
                    className="edit-question-textarea"
                  />
                  {showEditAnswerError ? (
                    <Error
                      errorClass="error-manage"
                      text="Answer must be provided!"
                    />
                  ) : (
                    <></>
                  )}
                </>
              )}
              <div className="edit-modal-buttons">
                <button type="submit">Edit!</button>
                <button
                  onClick={handleClosed}
                  className="leave"
                  style={{ padding: "5px 10px" }}
                >
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
export default ManageQtn;
