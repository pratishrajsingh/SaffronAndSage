import axios from "axios";

// Free public recipe API used as our restaurant's menu source
const api = axios.create({
  baseURL: "https://www.themealdb.com/api/json/v1/1",
  timeout: 10000,
});

export const ENDPOINTS = {
  categories: "/categories.php",
  byCategory: (category) => `/filter.php?c=${encodeURIComponent(category)}`,
  search: (query) => `/search.php?s=${encodeURIComponent(query)}`,
  lookup: (id) => `/lookup.php?i=${encodeURIComponent(id)}`,
};

export default api;
