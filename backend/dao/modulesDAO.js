import mongodb from "mongodb";
const ObjectId = mongodb.ObjectID;
let modules;

export default class ModulesDAO {
  static async injectDB(conn) {
    if (modules) {
      return;
    }
    try {
      modules = await conn.db(process.env.DATABASE_NAME).collection("module");
    } catch (e) {
      console.error(
        `Unable to establish collection handles in moduleDao: ${e}`
      );
    }
  }
  static async addModule(
    prof_email,
    name,
    image,
    courses = [],
    room_chat = [],
    tps = []
  ) {
    try {
      const moduleDoc = {
        prof_email: prof_email,
        name: name,
        image: image,
        courses: courses,
        room_chat: room_chat,
        tps: tps,
      };
      return await modules.insertOne(moduleDoc);
    } catch (e) {
      console.error(`Unable to add module in modulesDao: ${e}`);
      return { error: e };
    }
  }
  static async addMessageToChatRoom(module_id, message, date, sender_email) {
    try {
      const chatRoomArr = {
        _id: ObjectId(),
        message: message,
        date: date,
        sender_email: sender_email,
      };
      return await modules.updateOne(
        { _id: ObjectId(module_id) },
        { $push: { chat_room: chatRoomArr } }
      );
    } catch (e) {
      console.error(`Unable to add message to chatroom in modulesDao: ${e}`);
      return { error: e };
    }
  }
  static async getAllModules() {
    let cursor;
    try {
      cursor = await modules.find({});
    } catch (e) {
      console.error(`Unable to find all for the cursor in modulesDao ${e}`);
      return { modulesList: [], totalNbrModules: 0 };
    }
    try {
      const modulesList = await cursor.toArray();
      const totalNbrModules = await modules.countDocuments();
      return { modulesList, totalNbrModules };
    } catch (e) {
      console.error(
        `Unable to convert cursor to array or problem counting docs in modulesDao, ${e}`
      );
      return { modulesList: [], totalNbrModules: 0 };
    }
  }
  static async getAllChatRoom(module_id) {
    try {
      const pipeline = [
        {
          $match: {
            _id: new ObjectId(module_id),
          },
        },
      ];
      const getting_chat_room = await modules.aggregate(pipeline).next();
      return getting_chat_room.chat_room;
    } catch (e) {
      console.error(`Something went wrong in getting all chatRooms : ${e}`);
      throw e;
    }
  }
}