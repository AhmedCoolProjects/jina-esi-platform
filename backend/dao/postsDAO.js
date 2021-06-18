import mongodb from "mongodb";
const ObjectId = mongodb.ObjectID;
let posts;

export default class PostsDAO {
  static async injectDB(conn) {
    if (posts) {
      return;
    }
    try {
      posts = await conn.db(process.env.DATABASE_NAME).collection("post");
    } catch (e) {
      console.error(`Unable to establish collection handles in postsDao: ${e}`);
    }
  }
  static async addPost(writer_email, title, content, date, module_name, image) {
    try {
      const postDoc = {
        writer_email: writer_email,
        title: title,
        content: content,
        date: date,
        module_name: module_name,
        image: image,
      };
      return await posts.insertOne(postDoc);
    } catch (e) {
      console.error(`Unable to user in postsDao: ${e}`);
      return { error: e };
    }
  }
  static async addCommentToPost(post_id, sender_email, content, date) {
    try {
      const commentArr = {
        _id: ObjectId(),
        sender_email: sender_email,
        content: content,
        date: date,
      };
      return await posts.updateOne(
        { _id: ObjectId(post_id) },
        { $push: { comments: commentArr } }
      );
    } catch (e) {
      console.error(`Unable to add comment to post in postsDao: ${e}`);
      return { error: e };
    }
  }
  static async getAllPosts({ filters = null } = {}) {
    let query;
    if (filters) {
      if ("writer_email" in filters) {
        query = { writer_email: { $eq: filters["writer_email"] } };
      } else if ("module_name" in filters) {
        query = { module_name: { $eq: filters["module_name"] } };
      } else if ("title" in filters) {
        query = { $text: { $search: filters["title"] } };
      } else if ("content" in filters) {
        query = { $text: { $search: filters["content"] } };
      } else if ("_id" in filters) {
        query = { _id: { $eq: ObjectId(filters["_id"]) } };
      }
    }
    let cursor;
    try {
      cursor = await posts.find(query).sort({ date: -1 });
    } catch (e) {
      console.error(`Unable to find query for the cursor in postsDao ${e}`);
      return { postsList: [], totalNbrPosts: 0 };
    }
    try {
      const postsList = await cursor.toArray();
      const totalNbrPosts = await posts.countDocuments(query);
      return { postsList, totalNbrPosts };
    } catch (e) {
      console.error(
        `Unable to convert cursor to array or problem counting docs in postsDao, ${e}`
      );
      return { postsList: [], totalNbrPosts: 0 };
    }
  }
  static async getAllComments(post_id) {
    try {
      const pipeline = [
        {
          $match: {
            _id: new ObjectId(post_id),
          },
        },
      ];
      const getting_post = await posts.aggregate(pipeline).next();
      return getting_post.comments?.reverse();
    } catch (e) {
      console.error(`Something went wrong in getting all comments : ${e}`);
      throw e;
    }
  }
}
