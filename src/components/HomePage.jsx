import { useContext } from "react";
import { UserContext } from "../UserContext/UserContext";
import { useNavigate } from "react-router-dom";
const HomePage = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const reviews = () => {
    navigate("/reviews");
  };
  return (
    <>
      <h1>LARGEST GAMES REVIEW SITE!</h1>
      <button
        onClick={() => {
          reviews();
        }}
      >
        View all reviews
      </button>
    </>
  );
};
export default HomePage;
