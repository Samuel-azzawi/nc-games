import { useContext, useEffect, useState } from "react";
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
  const sort_by = searchParams.get("sort_by")
  const order_by = searchParams.get("order")
const [selectedOption, setSelectedOption] = useState("");
  const navigate = useNavigate();
  const [reviewData, setReviewData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useContext(UserContext);
  const [sortUrl, setSortUrl] = useState("");
  const [orderUrl, setOrderUrl] = useState(null)
  const[asc, setAsc] = useState(false)
  const HomePage = () => {
    navigate("/");
  };
  const onChange = (e) => {
    const baseUrl = "/reviews?sort_by=";
    setSortUrl(() => {
      return `${baseUrl}${e.label}`;
    });
    setSelectedOption(e);
    navigate(`${baseUrl}${e.label}`);
  };
  const order = () => {
    console.log(sortUrl)
    console.log(orderUrl)
    if (asc) {
      setAsc(false);
      setOrderUrl(() => {
        return `${sortUrl}&&order=asc`;
      });
      navigate(`${sortUrl}&&order=asc`);
    }
    else {
      setAsc(true);
      setOrderUrl(() => {
        return `${sortUrl}&&order=desc`;
      });
      navigate(`${sortUrl}&&order=desc`);
    }
  }
  useEffect(() => {
    ApiRequests.getReviews(category).then((res) => {
      setReviewData(res.data.review);
      setIsLoading(false);
      console.log(res);
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
      </div>
      <div className="reviews-categories-nav">
        <Categories />
      </div>
      <div className="reset-review-btn">
        <button
          onClick={() => {
            navigate("/reviews");
          }}
        >
          reset options
        </button>
        <div className="sort-by-drop-down">
          {console.log(orderUrl)}
          <Select
            className="dropbtn"
            defaultValue={sort_by ? { label: sort_by } : { label: "sort by" }}
            onChange={onChange}
            options={sortData}
            getOptionValue={(selectedOption) => selectedOption.label}
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
