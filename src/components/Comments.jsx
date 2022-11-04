import { useContext, useEffect, useState } from "react";
import ApiRequests from "./ApiRequests";
import { UserContext } from "../UserContext/UserContext";
const Comments = ({ id }) => {
  const { user } = useContext(UserContext);
  const [comments, setComments] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [inputValue, setInputValue] = useState("");
  const [sendComment, setSendComment] = useState(false);
  const [fakeComment, setFakeComment] = useState("");
  const [information, setInformation] = useState(false);
  const handleComment = () => {
    if (!user) {
      return setInformation(true)
    }
    setFakeComment(inputValue);
    setSendComment(true);
    ApiRequests.PostComments(id, user.username, inputValue).then(() => {
      setInputValue("");
    });
  };
  useEffect(() => {
    ApiRequests.getComments(id).then((res) => {
      setComments(res.data.comment);
      setIsLoading(false);
    });
  }, [id]);
  if (isLoading) return <>loading...</>;
  return (
    <>
      <h2>comments: </h2>
      <h4>write your comment</h4>
      <textarea
        value={inputValue}
        onChange={(e) => {
          setInputValue(e.target.value);
        }}
        rows="5"
        cols="50"
      ></textarea>
      <button onClick={handleComment}>submit</button>
      {information ? <>sign in to write a comment!</> : <></>}
      {sendComment ? (
        <div className="item">
          <ul>
            <li>
              <strong>author: </strong> {user.username}
            </li>
            <li>
              <strong>votes: </strong>0
            </li>
            <li>
              <strong>created at: </strong> {Date.now()}
            </li>
            <br />
            <li>{fakeComment}</li>
          </ul>
        </div>
      ) : (
        <></>
      )}
      {!comments ? (
        <></>
      ) : (
        comments.map((comment) => {
          return (
            <div key={comment.comment_id} className="item">
              <ul>
                <li>
                  <strong>author: </strong> {comment.author}
                </li>
                <li>
                  <strong>votes: </strong>
                  {comment.votes}
                </li>
                <li>
                  <strong>created at: </strong> {comment.created_at}
                </li>
                <br />
                <li>{comment.body}</li>
              </ul>
            </div>
          );
        })
      )}
    </>
  );
};

export default Comments;
