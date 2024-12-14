// import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Header() {
  // const { user } = useSelector((store) => store.main);
  const navigate = useNavigate();
  const navigationBtn = (link) => {
    navigate(link);
  };

  return (
    <header className="title">
      <h2>
        <a
          href="/"
          className="custom-link"
          onClick={(e) => {
            e.preventDefault();
            navigationBtn("/");
          }}
          onKeyDown={(e) => {
            if (e.key === " ") {
              e.preventDefault();
              navigationBtn("/");
            }
          }}
        >
          LAPAS NOSAUKUMS
        </a>
      </h2>

      {/* <h3>Welcome, {user}!</h3>
      {user === "Guest" ? (
        <div className="log-btns">
          <button>LOGIN</button>
          <button className="sign-up">SIGN UP</button>
        </div>
      ) : (
        <button>LOGOUT</button>
      )} */}
    </header>
  );
}

export default Header;
