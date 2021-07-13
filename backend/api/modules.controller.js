import ModulesDAO from "../dao/modulesDAO.js";

export default class ModulesCtrl {
  static async apiGetAllModules(req, res, next) {
    let filters = {};
    if (req.query.module_name) {
      filters.module_name = req.query.module_name;
    }
    const { modulesList, totalNbrModules } = await ModulesDAO.getAllModules({
      filters,
    });
    let response = {
      modulesList: modulesList,
      totalNbrModules: totalNbrModules,
    };
    res.json(response);
  }
  static async apiPostModule(req, res, next) {
    try {
      const prof_email = req.body.prof_email;
      const name = req.body.name;
      const image = req.body.image;
      const OperationResponse = await ModulesDAO.addModule(
        prof_email,
        name,
        image
      );
      res.json({ status: "success adding module" });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }
  static async apiAddMessageToChatRoom(req, res, next) {
    try {
      const module_name = req.body.module_name;
      const sender_email = req.body.sender_email;
      const message = req.body.message;
      const date = req.body.date;
      const OperationResponse = await ModulesDAO.addMessageToChatRoom(
        module_name,
        message,
        date,
        sender_email
      );
      res.json({ status: "success adding chatroom to module" });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }
  static async apiGetAllChatRoom(req, res, next) {
    try {
      const module_name = req.query.module_name;
      const OperationResponse = await ModulesDAO.getAllChatRoom(module_name);
      res.json(OperationResponse);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }
}
