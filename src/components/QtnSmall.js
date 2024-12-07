import { useNavigate } from "react-router-dom";

function QtnSmall({ qtn }) {
  const navigate = useNavigate();
  const navigationBtn = (link) => {
    navigate(link);
  };

  const handleClick = () => {
    navigationBtn(`/view-questionnaire/${qtn.id}`);
  };

  return (
    <div
      className="qtn-small"
      role="button"
      tabIndex="0"
      onClick={handleClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          handleClick();
        }
      }}
      style={{ cursor: "pointer" }}
    >
      <h4>{qtn.title}</h4>
    </div>
  );
}

export default QtnSmall;
