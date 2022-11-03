import axios from "axios";
const baseUrl = `https://zombie-chan.herokuapp.com`;
const ApiRequests = {
  getReviews(category, id) {
    if (id) {
      return axios.get(`${baseUrl}/api/reviews/${id}`);
    }
    if (category) {
      return axios.get(`${baseUrl}/api/reviews?category=${category}`);
    }
    return axios.get(`${baseUrl}/api/reviews`);
  },
  getCategories() {
    return axios.get(`${baseUrl}/api/categories`);
  },
  getComments(id) {
    return axios.get(`${baseUrl}/api/reviews/${id}/comments`);
  },
  getUsers() {
    return axios.get(`${baseUrl}/api/users/`);
  },
  patchReviweVotes(id, vote) {
    return axios.patch(`${baseUrl}/api/reviews/${id}`, {inc_votes : vote});
  },
};

export default ApiRequests;
