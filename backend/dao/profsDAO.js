import mongodb from "mongodb";
let profs;

export default class ProfsDAO {
  static async injectDB(conn) {
    if (profs) {
      return;
    }
    try {
      profs = await conn.db(process.env.DATABASE_NAME).collection("prof");
    } catch (e) {
      console.error(`Unable to establish collection handles in profsDao: ${e}`);
    }
  }
  static async getAllProfs({ filters = null } = {}) {
    let query;
    if (filters) {
      if ("email" in filters) {
        query = { $text: { $search: filters["email"] } };
      }
    }
    let cursor;
    try {
      cursor = await profs.find(query);
    } catch (e) {
      console.error(`Unable to find query for the cursor in profsDao ${e}`);
      return { profsList: [], totalNbrProfs: 0 };
    }
    try {
      const profsList = await cursor.toArray();
      const totalNbrProfs = await profs.countDocuments(query);
      return { profsList, totalNbrProfs };
    } catch (e) {
      console.error(
        `Unable to convert cursor to array or problem counting docs in profsDao, ${e}`
      );
      return { profsList: [], totalNbrProfs: 0 };
    }
  }
  static async addProf(email, first_name, last_name) {
    try {
      const profDoc = {
        email: email,
        first_name: first_name,
        last_name: last_name,
      };
      return await profs.insertOne(profDoc);
    } catch (e) {
      console.error(`Unable to user in profsDao: ${e}`);
      return { error: e };
    }
  }
}
