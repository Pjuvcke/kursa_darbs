import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

function Header() {
  const { test_data, lastUsed, isLoaded } = useSelector((store) => store.main);
  const [qtn, setQtn] = useState({});
  useEffect(() => {
    if (isLoaded && lastUsed !== 0) {
      const foundQtn = test_data.find((item) => item.id === lastUsed);
      setQtn(foundQtn);
    }
  }, [isLoaded, lastUsed, test_data]);
  const navigate = useNavigate();
  const navigationBtn = (link) => {
    navigate(link);
  };
  const location = useLocation();
  const isHomeActive = location.pathname === "/";
  const isLastUsedActive =
    qtn && location.pathname === `/view-questionnaire/${qtn.id}`;

  const handleClickHome = (e) => {
    e.preventDefault();
    navigationBtn("/");
  };

  const handleClickLast = (e) => {
    e.preventDefault();
    navigationBtn(`/view-questionnaire/${qtn.id}`);
  };

  return (
    <header className="title">
      <h2>
        <a
          href={`/`}
          className={`custom-link ${isHomeActive ? "" : "active"}`}
          style={{ cursor: isHomeActive ? "default" : "pointer" }}
          onClick={handleClickHome}
          onKeyDown={(e) => {
            if (e.key === " ") {
              handleClickHome(e);
            }
          }}
        >
          Quizzy
        </a>
      </h2>
      {lastUsed !== 0 ? (
        <h3>
          <a
            href={`/view-questionnaire/${qtn.id}`}
            className={`custom-link ${isLastUsedActive ? "" : "active"}`}
            style={{ cursor: isLastUsedActive ? "default" : "pointer" }}
            onClick={handleClickLast}
            onKeyDown={(e) => {
              if (e.key === " ") {
                handleClickLast(e);
              }
            }}
          >
            Last used: {qtn.title}
          </a>
        </h3>
      ) : (
        <h3>Start learning!</h3>
      )}
    </header>
  );
}

export default Header;
