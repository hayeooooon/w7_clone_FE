import axios from "axios";

const api = axios.create({
  baseURL: "http://15.164.218.19",
});
api.defaults.headers.common["Authorization"] = sessionStorage.getItem("token") ? 'Bearer ' + sessionStorage.getItem("token") : '';


export const apis = {
  // Socialing
  getCategory: () => api.get('/api/categories'),
  loadSocialings: (tab) => api.get(`/api/categories/${tab}/socials?page=0&size=5`),
  createSocialing: (category, formdata, config) => api.post(`/api/categories/${category}/socials`, formdata, config),
  loadMembers: (id, approved) => api.get(`/api/socials/${id}/members?approved=1`),
  loadDetail: (id) => api.get(`/api/socials/${id}`),

  // user
  signIn: (info) => api.post('/api/login', info),
  signUp: (formdata, config) => api.post('/api/signup', formdata, config),


};

