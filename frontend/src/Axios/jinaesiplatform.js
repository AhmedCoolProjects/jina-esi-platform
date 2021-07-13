import http from "./http-common";

class JinaEPDataService {
  // new
  sendPost(data) {
    return http.post("/posts", data);
  }
  sendPMsg(data) {
    return http.post(`/pmsgs`, data);
  }
  sendCRoomMsg(data) {
    return http.post(`/crooms`, data);
  }
  addCommentToPost(data) {
    return http.post(`/comments`, data);
  }
  countUserPosts(user_email) {
    return http.get(`/posts/countbyemail/${user_email}`);
  }
  getPostByEmail(writer_email) {
    return http.get(`/posts/bywriter/${writer_email}`);
  }
  getPostById(_id) {
    return http.get(`/posts/byid/${_id}`);
  }
  getPostComments(post_id) {
    return http.get(`/comments/post/${post_id}`);
  }
  getAllContacts() {
    return http.get(`/users`);
  }
  getConversation(participants) {
    return http.get(`/convs/${participants}`);
  }
  getMessagesOfConv(convId) {
    return http.get(`/pmsgs/conv/${convId}`);
  }
  getLastPosts() {
    return http.get(`/posts/last`);
  }
  getModulePosts(module_id) {
    return http.get(`/posts/bymodule/${module_id}`);
  }
  getModuleProf(prof_id) {
    return http.get(`/profs/byid/${prof_id}`);
  }
  getCRoomMsgs(module_id) {
    return http.get(`/crooms/bymodule/${module_id}`);
  }
  getUserByEmail(user_email) {
    return http.get(`/users/byemail/${user_email}`);
  }
  getAllModules() {
    return http.get(`/modules/all`);
  }
  getCoursesByModule(moduleId) {
    return http.get(`/courses/bymodule/${moduleId}`);
  }
}
export default new JinaEPDataService();
