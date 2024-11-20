import "./Main.css";
import Header from "../components/Header";
import QtnSmall from "../components/QtnSmall";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { addQuestionnaire } from "../features/mainSlice";

function Main() {
  const { data } = useSelector((store) => store.main);
  const [isOpen, setIsOpen] = useState(false);

  const dispatch = useDispatch();

  const navigate = useNavigate();
  const navigationBtn = (link) => {
    navigate(link);
  };

  const formToggle = () => {
    setIsOpen(!isOpen);
  };

  const addQtn = () => {
    //Pirms veido jaunu čupiņu, uzprasīs čupiņas title
    formToggle();
  };
  const addQtnSubmit = (e) => {
    e.preventDefault();
    dispatch(
      addQuestionnaire({
        id: Date.now(),
        title: e.target.value,
        content: [],
      })
    );
    formToggle();
    navigationBtn("/create-a-questionnaire");
  };

  return (
    <>
      <Header />
      <main>
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
              <textarea rows="1" name="title" id="title" />
              <button type="submit">Create a new questionnaire!</button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default Main;
