import PostsDAO from "../dao/postsDAO.js";

export default class PostsCtrl {
  static async apiGetAllPosts(req, res, next) {
    let filters = {};
    if (req.query.writer_email) {
      filters.writer_email = req.query.writer_email;
    } else if (req.query.title) {
      filters.title = req.query.title;
    } else if (req.query.module_name) {
      filters.module_name = req.query.module_name;
    } else if (req.query.content) {
      filters.content = req.query.content;
    } else if (req.query._id) {
      filters._id = req.query._id;
    }

    const { postsList, totalNbrPosts } = await PostsDAO.getAllPosts({
      filters,
    });
    let response = {
      postsList: postsList,
      filters: filters,
      totalNbrPosts: totalNbrPosts,
    };
    res.json(response);
  }
  static async apiPostPost(req, res, next) {
    try {
      const writer_email = req.body.writer_email;
      const title = req.body.title;
      const content = req.body.content;
      const date = req.body.date;
      const module_name = req.body.module_name;
      const image = req.body.image;
      // uploadImagePost.single();
      const OperationResponse = await PostsDAO.addPost(
        writer_email,
        title,
        content,
        date,
        module_name,
        image
      );
      res.json({ status: "success adding post" });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }
  static async apiAddCommentToPost(req, res, next) {
    try {
      const post_id = req.body.post_id;
      const sender_email = req.body.sender_email;
      const content = req.body.content;
      const date = req.body.date;
      const OperationResponse = await PostsDAO.addCommentToPost(
        post_id,
        sender_email,
        content,
        date
      );
      res.json({ status: "success adding comment to  post" });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }
  static async apiGetAllComments(req, res, next) {
    try {
      const post_id = req.query.post_id;
      const OperationResponse = await PostsDAO.getAllComments(post_id);

      res.json(OperationResponse);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }
}
