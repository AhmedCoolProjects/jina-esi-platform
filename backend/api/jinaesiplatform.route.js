import express from "express";
import UsersCtrl from "./users.controller.js";
import ProfsCtrl from "./profs.controller.js";
import ModulesCtrl from "./modules.controller.js";
import PostsCtrl from "./posts.controller.js";

const router = express.Router();
router.route("/").get(UsersCtrl.apiGetAllUsers);

router.route("/user").post(UsersCtrl.apiPostUser).get(UsersCtrl.apiGetAllUsers);
router.route("/prof").post(ProfsCtrl.apiPostProf).get(ProfsCtrl.apiGetAllProfs);
router.route("/post").post(PostsCtrl.apiPostPost).get(PostsCtrl.apiGetAllPosts);
router
  .route("/comment")
  .post(PostsCtrl.apiAddCommentToPost)
  .get(PostsCtrl.apiGetAllComments);
router
  .route("/module")
  .post(ModulesCtrl.apiPostModule)
  .get(ModulesCtrl.apiGetAllModules);
router
  .route("/chatroom")
  .post(ModulesCtrl.apiAddMessageToChatRoom)
  .get(ModulesCtrl.apiGetAllChatRoom);
export default router;
