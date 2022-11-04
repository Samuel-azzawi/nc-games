import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ApiRequests from "./ApiRequests";
import { UserContext } from "../UserContext/UserContext";
import Comments from "./Comments";
const ReviewDetails = () => {
  const [review, setReview] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
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
      setIsLoading(false);
    });
    
  }, [id]);
  if (isLoading) return <>loading...</>;
  return (
    <>
      <button
        id="homePage"
        onClick={() => {
          navigate("/reviews");
        }}
      >
        View all reviews
      </button>
      <button
        class="fa fa-home home-btn"
        id="homePage"
        onClick={() => {
          navigate("/");
        }}
      />
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
          {information ? <>sign in to vote!</> : <></>}
          <div className="line"></div>
          <Comments id={id} />
        </div>
      </div>
    </>
  );
};
export default ReviewDetails;
