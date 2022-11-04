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
  patchReviweVotes(id, inc_votes) {
    return axios.patch(`${baseUrl}/api/reviews/${id}`, { inc_votes });
  },
  PostComments(id, username, body) {
    return axios.post(`${baseUrl}/api/reviews/${id}/comments`, { username, body })
  },
  getFilteredReviews(sort_by, order) {
    if (order) {
      return axios.get(
        `${baseUrl}/api/reviews?sort_by=${sort_by}&&order=${order}`
      );
    }
    return axios.get(
      `${baseUrl}/api/reviews?sort_by=${sort_by}`
    );
  }
}
export default ApiRequests;
