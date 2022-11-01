import axios from "axios";
const ApiRequests = {
  getReviews() {
    return axios.get(`https://zombie-chan.herokuapp.com/api/reviews`);
  },
};

export default ApiRequests;
