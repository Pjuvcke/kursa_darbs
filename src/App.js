import "./App.css";
import Header from "./components/Header";
import Qtn from "./components/Qtn";
import data from "./data";

function App() {
  return (
    <>
      <Header />
      <main>
        <h3>Your questionnaires:</h3>
        <div className="qtn-box">
          {data.map((qtn) => (
            <Qtn key={qtn.id} title={qtn.title} content={qtn.content} />
          ))}
        </div>
      </main>
    </>
  );
}

export default App;
