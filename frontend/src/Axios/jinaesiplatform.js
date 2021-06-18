import http from "./http-common";

class JinaEPDataService {
  getPostByEmail(writer_email) {
    return http.get(`/post?writer_email=${writer_email}`);
  }
  getAllPosts() {
    return http.get(`/post`);
  }
  getPostById(_id) {
    return http.get(`/post?_id=${_id}`);
  }
  getAllModulePosts(module_name) {
    return http.get(`/post?module_name=${module_name}`);
  }
  addPost(data) {
    return http.post("/post", data);
  }
  getAllComments(post_id) {
    return http.get(`/comment?post_id=${post_id}`);
  }
  addComment(data) {
    return http.post(`/comment`, data);
  }
  getAllUsers(email) {
    return http.get(`/user?email=${email}`);
  }
}
export default new JinaEPDataService();
