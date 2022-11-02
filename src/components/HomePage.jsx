import { useContext, useEffect, useState } from "react";
import { UserContext } from "../UserContext/UserContext";
import { useNavigate } from "react-router-dom";
import ApiRequests from "./ApiRequests";
import Categories from "./Categories";
const HomePage = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  return (
    <div>
      <h1>LARGEST GAMES REVIEW SITE!</h1>
      <button
        onClick={() => {
           navigate("/reviews");
        }}
      >
        View all reviews
      </button>
      <Categories />
    </div>
  );
};
export default HomePage;
