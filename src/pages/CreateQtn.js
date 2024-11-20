import { useSelector } from "react-redux";
import Header from "../components/Header";
import "./CreateQtn.css";

function CreateQtn() {
  const { data } = useSelector((store) => store.main);

  console.log(data);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <Header />
      <main className="form-div">
        <div className="question-div">
          <form onSubmit={handleSubmit}>
            <label htmlFor="question">Question:</label>
            <textarea id="question" name="question" required />

            <label htmlFor="answer">Answer</label>
            <textarea id="answer" name="answer" required />

            <button type="submit">Submit</button>
          </form>
        </div>
      </main>
    </>
  );
}
export default CreateQtn;
