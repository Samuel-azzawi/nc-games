import { UserContext } from "../UserContext/UserContext";
import { useContext, useEffect, useState } from "react";
import ApiRequests from "./ApiRequests";
const UserLogIn = () => {
  const { user, setUser } = useContext(UserContext);
  const [allUsers, setAllUsers] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [information, setInformation] = useState("");
  useEffect(() => {
    ApiRequests.getUsers().then((res) => {
      setAllUsers(res.data.users);
      setIsLoading(false);
    });
  }, []);

  const logIn = () => {
    let found = false;
    allUsers.map((data, index) => {
      if (data.username === inputValue) {
        found = true;
        return setUser(data);
      } else if (allUsers.length - 1 === index && !found) {
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
    <div >
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
              return <div key={user.username + index}>{user.username}</div>;
            })}
          </div>
        </>
      ) : (
        <>
          <button onClick={logOut}>log out</button>
          <div>
            <div className="user_homepage">
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

export default UserLogIn;
