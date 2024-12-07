import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { store } from "./store";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ManageQtn from "./pages/ManageQtn";
import Main from "./pages/Main";
import ViewQtn from "./pages/ViewQtn";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route
            path="/manage-questionnaire/:newTitle"
            element={<ManageQtn />}
          />
          <Route path="/view-questionnaire/:id" element={<ViewQtn />} />
        </Routes>
      </Router>
    </Provider>
  </React.StrictMode>
);
