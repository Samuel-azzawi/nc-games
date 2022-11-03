import { useContext, useEffect, useState } from "react";
import { UserContext } from "../UserContext/UserContext";
import { useNavigate } from "react-router-dom";
import ApiRequests from "./ApiRequests";
import Categories from "./Categories";
const HomePage = () => {
  const { user, setUser } = useContext(UserContext);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [allUsers, setAllUsers] = useState("");
  const [information, setInformation] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    ApiRequests.getUsers().then((res) => {
      setAllUsers(res.data.users);
      setIsLoading(false);
    });
  }, []);
  const logIn = () => {
    let found = false;
    let count = 0;
    allUsers.map((data, index) => {
      if (data.username === inputValue) {
        console.log(count);
        found = true;
        return setUser(data);
      } else if (allUsers.length - 1 === index && !found) {
        console.log("not found");
        found = true;
        return setInformation("user not found");
      }
    });
    setInputValue("");
  };
  const logOut = () => {
    setUser(null);
  };
  if (isLoading) return <>loading...</>;
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
      {!user ? (
        <>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => {
              setInformation("");
              setInputValue(e.target.value);
            }}
          />
          <button onClick={logIn}>log in</button>
          <div>user names allowed:</div>
          <div>
            {allUsers.map((user, index) => {
              return <div key={user.username+index}>{user.username}</div>;
            })}
          </div>
        </>
      ) : (
        <>
          <button onClick={logOut}>log out</button>
            <div>
              <br/>
            <div>
              <img className="avatar" src={user.avatar_url} alt="avatar" />
            </div>
            <>Welcome back {user.name}!</>
          </div>
        </>
      )}
      <h4>{information}</h4>
    </div>
  );
};
export default HomePage;
