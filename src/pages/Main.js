import "./Main.css";
import Header from "../components/Header";
import QtnSmall from "../components/QtnSmall";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Main() {
  const { data } = useSelector((store) => store.main);
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");

  const navigate = useNavigate();
  const navigationBtn = (link) => {
    navigate(link);
  };

  const formToggle = () => {
    setIsOpen(!isOpen);
  };

  const addQtn = () => {
    formToggle();
  };

  const handleChange = (e) => {
    setTitle(e.target.value);
  };
  const handleClosed = () => {
    formToggle();
    setTitle("");
  };

  const addQtnSubmit = (e) => {
    e.preventDefault();
    formToggle();
    navigationBtn(`/manage-a-questionnaire/${title}`);
  };

  return (
    <>
      <Header />
      <main className="Main">
        <div className="above-qtn-list">
          <h3>Your questionnaires:</h3>
          <button onClick={addQtn}>Create a questionnaire</button>
        </div>
        <div className="qtn-list">
          {data.map((qtn) => (
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
                value={title}
                onChange={handleChange}
                required
              />
              <button type="submit">Create a new questionnaire!</button>
              <button onClick={handleClosed}>Cancel</button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default Main;
