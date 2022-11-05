import { useContext, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import ApiRequests from "./ApiRequests";
import { UserContext } from "../UserContext/UserContext";
const ReviewsFiltered = ({ sort_by, order}) => {
  const [reviewData, setReviewData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useContext(UserContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (sort_by === "time created") {
      sort_by = "created_at";
    }
    ApiRequests.getFilteredReviews(sort_by,order).then((res) => {
      setReviewData(res.data.review);
      setIsLoading(false);
    });
  }, [sort_by,order]);
  if (isLoading) return <>loading...</>;
  return (
    <div className="review-card">
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
  );
};

export default ReviewsFiltered;
