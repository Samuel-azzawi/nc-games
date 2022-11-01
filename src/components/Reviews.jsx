import { useContext, useEffect, useState } from "react";
import { UserContext } from "../UserContext/UserContext";
import ApiRequests from "./ApiRequests";
import { useNavigate } from "react-router-dom";
const Reviews = () => {
  const navigate = useNavigate();
  const [reviewData, setReviewData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useContext(UserContext);
  const HomePage = () => {
    navigate("/");
  };
  useEffect(() => {
    ApiRequests.getReviews().then((res) => {
      setIsLoading(true);
      setReviewData(res.data.review);
      setIsLoading(false);
    });
  }, []);
  if (isLoading) return <>loading...</>;
  return (
    <>
      <button
        id="homePage"
        onClick={() => {
          HomePage();
        }}
      >
        back to home
      </button>
      <div className="container">
        {reviewData.map((review) => {
          return (
            <div className="item" key={review.review_id}>
              <img
                className="review_img"
                src={review.review_img_url}
                alt="review img"
              />
              <div className="text">
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
