import UsersDAO from "../dao/usersDAO.js";

export default class UsersCtrl {
  static async apiGetAllUsers(req, res, next) {
    let filters = {};
    if (req.query.email) {
      filters.email = req.query.email;
    }
    const { usersList, totalNbrUsers } = await UsersDAO.getAllUsers({
      filters,
    });
    let response = {
      usersList: usersList,
      filters: filters,
      totalNbrUsers: totalNbrUsers,
    };
    res.json(response);
  }
  static async apiPostUser(req, res, next) {
    try {
      const email = req.body.email;
      const first_name = req.body.first_name;
      const last_name = req.body.last_name;
      const OperationResponse = await UsersDAO.addUser(
        email,
        first_name,
        last_name
      );
      res.json({ status: "success adding user" });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }
}
