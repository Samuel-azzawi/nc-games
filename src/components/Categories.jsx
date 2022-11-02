import Select from "react-select";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../UserContext/UserContext";
import ApiRequests from "./ApiRequests";
const Categories = () => {
  const [categoryData, setCategoryData] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");
  const [categoryUrl, setCategoryUrl] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    ApiRequests.getCategories().then((res) => {
      setCategoryData(() => {
        setIsLoading(false);
        return res.data.map((cat) => {
          return { label: cat.slug };
        });
      });
    });
  }, []);
  const onChange = (e) => {
    const baseUrl = "/reviews?category=";
    setCategoryUrl(() => {
      return `${baseUrl}${e.label}`;
    });
    setSelectedOption(e);
    navigate(`${baseUrl}${e.label}`);
    window.location.reload(false);
  };

  if (isLoading) {
    return (
      <>
        <Select
          className="dropbtn"
          defaultValue={selectedOption}
          onChange={onChange}
          options={categoryData}
          getOptionValue={(selectedOption) => selectedOption.label}
        />
        <h3>loading...</h3>
      </>
    );
  }
  return (
    <>
      {console.log(categoryUrl)}
      <Select
        className="dropbtn"
        defaultValue={selectedOption}
        onChange={onChange}
        options={categoryData}
        getOptionValue={(selectedOption) => selectedOption.label}
      />
      <Link to={categoryUrl}></Link>
    </>
  );
};

export default Categories;
