import axios from "axios";
const baseUrl = `https://zombie-chan.herokuapp.com`;
const ApiRequests = {
  getReviews(category) {
    if (category) {
      return axios.get(`${baseUrl}/api/reviews?category=${category}`)
    }
     return axios.get(`${baseUrl}/api/reviews`);
  },
  getCategories() {
    return axios.get(`${baseUrl}/api/categories`);
  }
};

export default ApiRequests;
