import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ApiRequests from "./ApiRequests";
import { UserContext } from "../UserContext/UserContext";
const ReviewDetails = () => {
  const [review, setReview] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoad, setIsLoad] = useState(true);
  const [comments, setComments] = useState(null);
  const [votes, setVotes] = useState(false);
  const [reviewVotes, setReviewVotes] = useState(0);
  const [information,setInformation] = useState(false)
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  let { id } = useParams();
  
  const addVotes = (vote) => {
            setVotes(!votes);
      return setReviewVotes(() => {
        return vote;
      });
  };
  useEffect(() => {
    ApiRequests.patchReviweVotes(id, reviewVotes).then((res) => {
      console.log(res)
      setReviewVotes(0);
    });
  }, [reviewVotes, id]);

  useEffect(() => {
    ApiRequests.getReviews(null, id).then((res) => {
      setReview(res.data);
      setIsLoad(false);
    });
    ApiRequests.getComments(id).then((res) => {
      setComments(res.data.comment);
      setIsLoading(false);
    });
  }, [id]);
  if (isLoading || isLoad) return <>loading...</>;
  return (
    <>
      <button
        onClick={() => {
          navigate("/reviews");
        }}
      >
        View all reviews
      </button>
      <button
        onClick={() => {
          navigate("/");
        }}
      >
        Home
      </button>
      <br />
      {user ? (
        <>
          <div>
            <img className="avatar" src={user.avatar_url} alt="avatar" />
          </div>
          <>{user.name}</>
        </>
      ) : (
        <></>
      )}
      <div key={review.review_id}>
        <img
          className="review_img"
          src={review.review_img_url}
          alt="review img"
        />
        <div className="words">
          <p>
            <strong>Category: </strong> {review.category}
          </p>
          <p>
            <strong>comments: </strong> {review.comment_count}
          </p>
          <p>
            <strong>created at: </strong> {review.created_at}
          </p>
          <p>
            <strong>Title: </strong> {review.title}
          </p>
          <p>
            <strong>Designer: </strong> {review.designer}
          </p>
          <p>
            <strong>Owner: </strong> {review.owner}
          </p>
          <p>
            <strong>review: </strong> {review.review_body}
          </p>

          <p>
            <strong>votes: </strong> {review.votes}
          </p>

          {votes ? (
            <button
              onClick={() => {
                review.votes -= 1;
                addVotes(-1);
              }}
            >
              vote down
            </button>
          ) : (
            <button
                onClick={() => {
                  if (!user) {
                    return setInformation(true);
                  }
                 review.votes += 1;
                addVotes(1);
              }}
            >
              vote up
            </button>
          )}
          {information?<>sign in to vote!</>:<></>}
          <div className="line"></div>
          <h2>comments: </h2>
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
        </div>
      </div>
    </>
  );
};
export default ReviewDetails;
