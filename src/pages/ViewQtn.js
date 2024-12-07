import { useNavigate, useParams } from "react-router-dom";
import Header from "../components/Header";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
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
    if (!isLoaded) {
      dispatch(loadDataFromIndexedDB());
    } else {
      console.log(qtn.content);
    }
  }, [dispatch, isLoaded]);

  if (!isLoaded) {
    return (
      <div className="loading-overlay">
        <h2 className="loading-text">Loading...</h2>
      </div>
    );
  }

  return (
    <div>
      <Header />
      <main className="ViewQtn">
        <h2>{qtn.title}</h2>
        <button
          onClick={() => navigateBtn(`/manage-questionnaire/${qtn.title}`)}
        >
          Manage your questionnaire
        </button>
        <h3>Your questions:</h3>
        {qtn.content.map((item) => (
          <div>
            <h4>{item.question}</h4>
            <p>{item.answer}</p>
          </div>
        ))}
      </main>
    </div>
  );
}
export default ViewQtn;
