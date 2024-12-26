import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  const navigationBtn = (link) => {
    navigate(link);
  };

  const handleClick = (e) => {
    e.preventDefault();
    navigationBtn("/");
  };

  return (
    <header className="title">
      <h2>
        <a
          href="/"
          className="custom-link"
          onClick={handleClick}
          onKeyDown={(e) => {
            if (e.key === " ") {
              handleClick(e);
            }
          }}
        >
          Quizzy
        </a>
      </h2>
    </header>
  );
}

export default Header;
