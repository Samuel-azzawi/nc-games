import { useNavigate } from "react-router-dom";
import Categories from "./Categories";
import UserLogIn from "./UserLogIn";
const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="container">
      <div className="header">
        <h1>LARGEST GAMES REVIEW WEBSITE!</h1>
      </div>
      <div className="userLogin">
        <UserLogIn />
      </div>
      <div className="button-reviews">
        <button
          onClick={() => {
            navigate("/reviews");
          }}
        >
          View all reviews
        </button>
      </div>
      <div className="categories-nav">
        <Categories />
      </div>
    </div>
  );
};
export default HomePage;
