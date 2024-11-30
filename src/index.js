import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { store } from "./store";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CreateQtn from "./pages/CreateQtn";
import Main from "./pages/Main";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route
            path="/create-a-questionnaire/:newTitle"
            element={<CreateQtn />}
          />
        </Routes>
      </Router>
    </Provider>
  </React.StrictMode>
);
