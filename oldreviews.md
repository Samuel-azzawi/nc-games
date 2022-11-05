import { useContext, useEffect, useRef, useState } from "react";
import { UserContext } from "../UserContext/UserContext";
import ApiRequests from "./ApiRequests";
import { useNavigate, useSearchParams } from "react-router-dom";
import Categories from "./Categories";
import Select from "react-select";
import ReviewsFiltered from "./ReviewsFiltered";
const Reviews = () => {
  const sortData = [
    { label: "votes" },
    { label: "time created" },
    { label: "designer" },
    { label: "owner" },
    { label: "category" },
    { label: "title" },
  ];
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");
  let sort_by = searchParams.get("sort_by");
  const order_by = searchParams.get("order");
  const navigate = useNavigate();
  const [reviewData, setReviewData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useContext(UserContext);
  const [asc, setAsc] = useState(false);
  const baseUrl = "/reviews?";
  const selectInputRef = useRef();
  const HomePage = () => {
    navigate("/");
  };
  const onChange = (e) => {
    const baseUrl = "/reviews?sort_by=";
    navigate(`${baseUrl}${e.label}&&order=desc`);
  };
  const order = () => {
    if (asc) {
      setAsc(false);
      if (!sort_by) sort_by = "category";
      navigate(`${baseUrl}sort_by=${sort_by}&&order=desc`);
    } else {
      if (!sort_by) sort_by = "category";
      setAsc(true);
      navigate(`${baseUrl}sort_by=${sort_by}&&order=asc`);
    }
  };
  useEffect(() => {
    ApiRequests.getReviews(category).then((res) => {
      console.log(res)
      setReviewData(res.data.review);
      setIsLoading(false);
    });
  }, [category]);
  if (isLoading) return <>loading...</>;

  return (
    <div className="reviews-container">
      <div className="home-btn">
        <button
          className="fa fa-home"
          id="homePage"
          onClick={() => {
            HomePage();
          }}
        />
        {console.log(sort_by, order_by)}
      </div>
      <div className="reviews-categories-nav">
        <Categories />
      </div>
      <div className="reset-review-btn">
        <button
          type="reset"
          onClick={() => {
            navigate("/reviews?sort_by=category&&order=desc");
          }}
        >
          reset options
        </button>
        <div className="sort-by-drop-down">
          <Select
            placeholder="sort by"
            className="dropbtn"
            onChange={onChange}
            options={sortData}
            getOptionValue={(selectedOption) => selectedOption.label || null}
          />
        </div>
        <button
          onClick={() => {
            order();
          }}
        >
          sort
        </button>
      </div>
      {user ? (
        <div className="user_reviews">
          <img className="avatar" src={user.avatar_url} alt="avatar" />
        </div>
      ) : (
        <></>
      )}
      {sort_by ? (
        <ReviewsFiltered sort_by={sort_by} order={order_by} />
      ) : (
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
      )}
    </div>
  );
};
export default Reviews;
