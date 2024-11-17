import { useGlobalContext } from "../Context";

function Header() {
  const { user } = useGlobalContext();

  return (
    <header>
      <h2 className="title">LAPAS NOSAUKUMS</h2>
      <h3>Welcome, {user}!</h3>
      {user === "Guest" ? (
        <div className="log-btns">
          <button>LOGIN</button>
          <button className="sign-up">SIGN UP</button>
        </div>
      ) : (
        <button>LOGOUT</button>
      )}
    </header>
  );
}

export default Header;
