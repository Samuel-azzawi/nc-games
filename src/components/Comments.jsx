import { useContext, useEffect, useState } from "react";
import ApiRequests from "./ApiRequests";
import { UserContext } from "../UserContext/UserContext";
const Comments = ({ id }) => {
  const { user } = useContext(UserContext);
  const [comments, setComments] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [inputValue, setInputValue] = useState("");
  const [sendComment, setSendComment] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [information, setInformation] = useState(false);
  const [disabledButton, setDisabledButton] = useState(false);
  const handleComment = () => {
    if (!user) {
      return setInformation(true);
    }
    ApiRequests.PostComments(id, user.username, inputValue).then((res) => {
      setSendComment(true);
      setNewComment(res.data.comment);
      setInputValue("");
    });
  };
  useEffect(() => {
    ApiRequests.getComments(id).then((res) => {
      setComments(res.data.comment);
      setIsLoading(false);
    });
  }, [id]);
  const deleteCommentbtn = (id) => {
    ApiRequests.deleteComment(id).then(() => {
      setDisabledButton(false)
      setComments(comments.filter((comment) => { return comment.comment_id !== id }))
      setSendComment(false)
    })
  }

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
        <>
          <div className="item">
            <ul>
              <li>
                <strong>author: </strong> {newComment.author}
              </li>
              <li>
                <strong>votes: </strong>0
              </li>
              <li>
                <strong>created at: </strong> {newComment.created_at}
              </li>
              <br />
              <li>{newComment.body}</li>
            </ul>
          </div>
          <button disabled={disabledButton}
            onClick={() => {
              setDisabledButton(true)
              deleteCommentbtn(newComment.comment_id);
            }}
          >
            Delete comment
          </button>
        </>
      ) : (
        <></>
      )}
      {!comments ? (
        <></>
      ) : (
        comments.map((comment) => {
          return (
            <div key={comment.comment_id}>
              <div className="item">
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
              {comment.author === user.username ? (
                <button disabled={disabledButton}
                  onClick={() => {
                    setDisabledButton(true)
                    deleteCommentbtn(comment.comment_id);
                  }}
                >
                  Delete comment
                </button>
              ) : (
                <></>
              )}
            </div>
          );
        })
      )}
    </>
  );
};

export default Comments;
