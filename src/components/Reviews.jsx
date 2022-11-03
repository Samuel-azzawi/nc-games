import { useContext, useEffect, useState } from "react";
import { UserContext } from "../UserContext/UserContext";
import ApiRequests from "./ApiRequests";
import { useNavigate, useSearchParams } from "react-router-dom";
import Categories from "./Categories";
const Reviews = () => {
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");

  const navigate = useNavigate();
  const [reviewData, setReviewData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useContext(UserContext);
  const HomePage = () => {
    navigate("/");
  };
  useEffect(() => {
    ApiRequests.getReviews(category).then((res) => {
      setReviewData(res.data.review);
      setIsLoading(false);
    });
  }, [reviewData]);
  if (isLoading) return <>loading...</>;

  return (
    <>
      <button
        id="homePage"
        onClick={() => {
          HomePage();
        }}
      >
        Home
      </button>
      <>
        <Categories />
        <button
          onClick={() => {
            navigate("/reviews");
          }}
        >
          reset options
        </button>
      </>
      <br/>
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
      <div className="container">
        {reviewData.map((review) => {
          return (
            <div
              className="item"
              key={review.review_id}
              onClick={() => {
                navigate(`/reviews/${review.review_id}`);
              }}
            >
              <img
                className="review_img"
                src={review.review_img_url}
                alt="review img"
              />
              <div className="words">
                <p>
                  <strong>Category:</strong> {review.category}
                </p>
                <p>
                  <strong>Title:</strong> {review.title}
                </p>
                <p>
                  <strong>Designer:</strong> {review.designer}
                </p>
                <p>
                  <strong>Owner:</strong> {review.owner}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};
export default Reviews;
