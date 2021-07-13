import mongodb from "mongodb";
const ObjectId = mongodb.ObjectID;
let pchats;

export default class PChatDAO {
  static async injectDB(conn) {
    if (pchats) {
      return;
    }
    try {
      pchats = await conn.db(process.env.DATABASE_NAME).collection("pchat");
    } catch (e) {
      console.error(`Unable to establish collection handles in pchat: ${e}`);
    }
  }
  static async addMessageToPChat(participants, sender_email, message, date) {
    let query = { participants: { $eq: participants } };
    try {
      const totalOfPChats = await pchats.countDocuments(query);
      if (totalOfPChats === 0) {
        const pChatDoc = {
          participants: participants,
          messages: [
            {
              _id: ObjectId(),
              sender_email: sender_email,
              message: message,
              date: date,
            },
          ],
        };
        return await pchats.insertOne(pChatDoc);
      } else {
        const messageObj = {
          _id: ObjectId(),
          sender_email: sender_email,
          message: message,
          date: date,
        };
        return await pchats.updateOne(
          { participants: participants },
          { $push: { messages: messageObj } }
        );
      }
    } catch (e) {
      console.error(`Unable to add comment to post in pchat: ${e}`);
      return { error: e };
    }
  }
  static async getConversationPChat(participants) {
    try {
      const pipeline = [
        {
          $match: {
            participants: participants,
          },
        },
      ];
      const getting_pchat = await pchats.aggregate(pipeline).next();
      if (getting_pchat === null) {
        return [];
      } else {
        return getting_pchat?.messages?.reverse();
      }
    } catch (e) {
      console.error(`Something went wrong in getting all pchat : ${e}`);
      throw e;
    }
  }
}
