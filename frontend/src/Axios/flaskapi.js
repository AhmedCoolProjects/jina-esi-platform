import http from "./http-flaskapi";

class JinaepFlaskAPI {
  // new
  getData(semester) {
    return http.get(`/data/${semester}`);
  }
  calcNote(data) {
    return http.post(`/cfn`, data);
  }
}
export default new JinaepFlaskAPI();
