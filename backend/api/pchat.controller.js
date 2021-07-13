import PChatDAO from "../dao/PChatDAO.js";

export default class PChatCtrl {
  static async apiAddMessageToPChat(req, res, next) {
    try {
      const participants = req.body.participants;
      const sender_email = req.body.sender_email;
      const message = req.body.message;
      const date = req.body.date;
      const OperationResponse = await PChatDAO.addMessageToPChat(
        participants,
        sender_email,
        message,
        date
      );
      res.json({ status: "success adding message to pchat" });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }
  static async apiGetConversation(req, res, next) {
    try {
      const participants = req.query.participants;
      const OperationResponse = await PChatDAO.getConversationPChat(
        participants
      );
      res.json(OperationResponse);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }
}
