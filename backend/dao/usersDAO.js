import mongodb from "mongodb";

let users;

export default class UsersDAO {
  static async injectDB(conn) {
    if (users) {
      return;
    }
    try {
      users = await conn.db(process.env.DATABASE_NAME).collection("user");
    } catch (e) {
      console.error(`Unable to establish collection handles in usersDAO: ${e}`);
    }
  }
  static async getAllUsers({
    filters = null,
    page = 0,
    usersPerPage = 20,
  } = {}) {
    let query;
    if (filters) {
      if ("name" in filters) {
        query = { $text: { $search: filters["first_name"] } };
      }
    }
    let cursor;
    try {
      cursor = await users.find(query);
    } catch (e) {
      console.error(`Unable to find query for the cursor in usersDao ${e}`);
      return { usersList: [], totalNbrUsers: 0 };
    }
    const displayCursor = cursor.limit(usersPerPage).skip(usersPerPage * page);
    try {
      const usersList = await displayCursor.toArray();
      const totalNbrUsers = await users.countDocuments(query);
      return { usersList, totalNbrUsers };
    } catch (e) {
      console.error(
        `Unable to convert cursor to array or problem counting docs in usersDao, ${e}`
      );
      return { usersList: [], totalNbrUsers: 0 };
    }
  }

  static async addUser(email, first_name, last_name) {
    try {
      const userDoc = {
        email: email,
        first_name: first_name,
        last_name: last_name,
      };
      return await users.insertOne(userDoc);
    } catch (e) {
      console.error(`Unable to user in usersDao: ${e}`);
      return { error: e };
    }
  }
}
