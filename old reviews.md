import { useContext, useEffect, useState } from "react";
import { UserContext } from "../UserContext/UserContext";
import ApiRequests from "./ApiRequests";
import { useNavigate, useSearchParams } from "react-router-dom";
import Categories from "./Categories";
const Reviews = () => {
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");
  console.log(searchParams.get("category")); // 'name'

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
      <>
        <Categories />
        {category ? <h2>games in category: {category}</h2> : <></>}
      </>

      <div className="container">
        {reviewData.map((review) => {
          return (
            <a >
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
            </a>
          );
        })}
      </div>
    </>
  );
};
export default Reviews;
