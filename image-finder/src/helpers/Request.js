import axios from "axios";

const key = `18994228-5db683694ac8d5df35098f7e0`;

const fetchArticlesBYQuery = (searchQuery, page=1) => {
  return axios
    .get(
      `https://cors-anywhere.herokuapp.com/https://pixabay.com/api/?key=${key}&q=${searchQuery}&page=${page}&image_type=photo&per_page=12`
    )
    .then((response) => response.data.hits);
};


export default {
  fetchArticlesBYQuery,
};
