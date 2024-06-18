import axios from "axios";

const API_URL = "https://65f17541034bdbecc762acf0.mockapi.io";
const API_URL_REVIEW = "https://6661a67863e6a0189feaedd7.mockapi.io";


export const register = (username, password) => {
  return axios.post(`${API_URL}/forms/`, { username, password });
};

export const logIn = () => {
  return axios.get(`${API_URL}/forms`);
};

export const getProducts = () => {
  return axios.get(`${API_URL}/items/`);
};

export const getProductReviews = async () => {
  try {
    const response = await axios.get(`${API_URL_REVIEW}/reviews`);
    return response.data;
  } catch (error) {
    throw new Error("Произошла ошибка при получении отзывов");
  }
};

export const postReview = async (newReview) => {
  try {
    const response = await axios.post(`${API_URL_REVIEW}/reviews`, newReview);
    return response.data;
  } catch (error) {
    throw new Error("Произошла ошибка при отправке отзыва");
  }
};
