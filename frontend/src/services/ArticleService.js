import http from '../http-common';

const getAll = () => {
  return http.get('/articles');
};

const get = id => {
  return http.get(`/articles/${id}`);
};

const create = data => {
  return http.post('/articles', data);
};

const update = (id, data) => {
  return http.put(`/articles/${id}`, data);
};

const remove = id => {
  return http.delete(`/articles/${id}`);
};

const removeAll = () => {
  return http.delete(`/articles`);
};

const findByCategory = category => {
  return http.get(`/articles?department=${category}`);
};

const ArticleService = {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
  findByCategory,
};

export default ArticleService;
