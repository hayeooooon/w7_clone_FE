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
  loadMembers: (id) => api.get(`/api/socials/${id}/members?approved=1`),
  loadDetail: (id) => api.get(`/api/socials/${id}`),
  updateSocialing: (cid, sid, formdata, config) => api.patch(`/api/categories/${cid}/socials/${sid}`, formdata, config),
  updateAnswer: (id, answer) => api.post(`/api/socials/${id}/participation`, answer),

  // user
  signIn: (info) => api.post('/api/login', info),
  signUp: (formdata, config) => api.post('/api/signup', formdata, config),
  userInfo: () => api.get('/api/authentication'),

};

