import { useContext, useEffect, useState } from "react";
import { UserContext } from "../UserContext/UserContext";
import ApiRequests from "./ApiRequests";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import Select from "react-select";


const Reviews = () => {
  const sortByOptions = [
    { label: "votes" },
    { label: "time created" },
    { label: "designer" },
    { label: "owner" },
    { label: "category" },
    { label: "title" },
  ];
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");
  let sort_by = searchParams.get("sort_by");
  const order_by = searchParams.get("order");
  const [categoryValue, setCategoryValue] = useState("");
  const [sortByValue, setSortByValue] = useState("");
  const [reviewData, setReviewData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoad, setIsLoad] = useState(true);
  const [categoryData, setCategoryData] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");
  const [categoryUrl, setCategoryUrl] = useState("");
  const { user } = useContext(UserContext);
  const [asc, setAsc] = useState(false);
  const baseUrl = "/reviews?";
  const HomePage = () => {
    navigate("/");
  };
  const onChange = (e) => {
    setAsc(false);
    setSortByValue(e);
    if (category) {
      const baseUrl = "/reviews?";
      navigate(
        `${baseUrl}category=${category}&&sort_by=${e.label}&&order=desc`
      );
    } else {
      const baseUrl = "/reviews?sort_by=";
      navigate(`${baseUrl}${e.label}&&order=desc`);
    }
  };
  const order = () => {
    if (category) {
      if (asc) {
        setAsc(false);
        if (!sort_by) sort_by = "category";
        navigate(
          `${baseUrl}category=${category}&&sort_by=${sort_by}&&order=desc`
        );
      } else {
        if (!sort_by) sort_by = "category";
        setAsc(true);
        navigate(
          `${baseUrl}category=${category}&&sort_by=${sort_by}&&order=asc`
        );
      }
    } else {
      if (asc) {
        setAsc(false);
        if (!sort_by) sort_by = "category";
        navigate(`${baseUrl}sort_by=${sort_by}&&order=desc`);
      } else {
        if (!sort_by) sort_by = "category";
        setAsc(true);
        navigate(`${baseUrl}sort_by=${sort_by}&&order=asc`);
      }
    }
  };
  useEffect(() => {
    setIsLoading(true);
    if (sort_by === "time created") {
      sort_by = "created_at";
    }
    ApiRequests.getReviews(category, null, sort_by, order_by).then((res) => {
      setReviewData(res.data.review);
      setIsLoading(false);
    });
  }, [category, sort_by, order_by]);
  useEffect(() => {
    setIsLoad(true);
    ApiRequests.getCategories().then((res) => {
      setCategoryData(() => {
        setIsLoad(false);
        return res.data.map((cat) => {
          return { label: cat.slug };
        });
      });
    });
  }, []);
  const onChangeCat = (e) => {
    setAsc(false);
    setSortByValue("");
    setCategoryValue(e);
    const baseUrl = "/reviews?category=";
    setCategoryUrl(() => {
      return `${baseUrl}${e.label}`;
    });
    setSelectedOption(e);
    navigate(`${baseUrl}${e.label}`);
  };

  if (isLoading || isLoad) return <>loading...</>;

  return (
    <div className="reviews-container">
      <header>
          <button
            className="fa fa-home"
            id="homePage"
            onClick={() => {
              HomePage();
            }}
          />
          <button
            type="reset"
            onClick={() => {
              setAsc(false);
              setCategoryValue("");
              setSortByValue("");
              navigate("/reviews");
            }}
          >
            reset options
          </button>
        <div className="navAndSortGrid">
            <Select
              value={!category ? categoryValue : { label: category }}
              placeholder="Filter by..."
              className="dropbtn"
              defaultValue={selectedOption}
              onChange={onChangeCat}
              options={categoryData}
              getOptionValue={(selectedOption) => selectedOption.label}
            />
            {isLoading ? <h3>loading...</h3> : <Link to={categoryUrl}></Link>}

            <Select
              value={!sort_by ? sortByValue : { label: sort_by }}
              placeholder="sort by"
              className="dropbtn"
              onChange={onChange}
              options={sortByOptions}
              getOptionValue={(selectedOption) => selectedOption || null}
            />

            {asc ? (
              <button
                className="fa fa-arrow-up"
                onClick={() => {
                  order();
                }}
              />
            ) : (
              <button
                className="fa fa-arrow-down"
                onClick={() => {
                  order();
                }}
              />
            )}

        </div>
        {user ? (
          <div className="user_reviews">
            <img className="avatar" src={user.avatar_url} alt="avatar" />
          </div>
        ) : (
          <></>
        )}
      </header>
      <main>
        {sort_by ? (
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
      </main>
    </div>
  );
};
export default Reviews;
