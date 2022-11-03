import { useNavigate } from "react-router-dom";
import Categories from "./Categories";
import UserLogIn from "./UserLogIn";
const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h1>LARGEST GAMES REVIEW WEBSITE!</h1>
      <button
        onClick={() => {
          navigate("/reviews");
        }}
      >
        View all reviews
      </button>
      <Categories />
      <UserLogIn />
    </div>
  );
};
export default HomePage;
