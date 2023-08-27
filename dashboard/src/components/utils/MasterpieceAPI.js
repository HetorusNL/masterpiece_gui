import axios from "axios";

const API_ENDPOINT = "https://api.masterpiece.hetorus.nl";

export const apiCourses = async () => {
  return await axios.get(`${API_ENDPOINT}/courses`);
};

export const apiCourse = async (co_id) => {
  return await axios.get(`${API_ENDPOINT}/course/${co_id}`);
};

export const apiCourseWords = async (co_id) => {
  return await axios.get(`${API_ENDPOINT}/course/${co_id}/words`);
};

export const apiCourseWord = async (co_id, wo_id) => {
  return await axios.get(`${API_ENDPOINT}/course/${co_id}/word/${wo_id}`);
};

export const apiWords = async () => {
  return await axios.get(`${API_ENDPOINT}/words`);
};

export const apiWord = async (id) => {
  return await axios.get(`${API_ENDPOINT}/word/${id}`);
};

export const apiUpdateDatabase = async () => {
  return await axios.get(`${API_ENDPOINT}/update-database`);
};
