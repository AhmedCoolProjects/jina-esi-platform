import UsersDAO from "../dao/usersDAO.js";

export default class UsersCtrl {
  static async apiGetAllUsers(req, res, next) {
    const usersPerPage = req.query.usersPerPage
      ? parseInt(req.query.usersPerPage, 10)
      : 20;
    const page = req.query.page ? parseInt(req.query.page, 10) : 0;
    let filters = {};
    if (req.query.name) {
      filters.name = req.query.name;
    }
    const { usersList, totalNbrUsers } = await UsersDAO.getAllUsers({
      filters,
      page,
      usersPerPage,
    });
    let response = {
      usersList: usersList,
      page: page,
      filters: filters,
      usersPerPage: usersPerPage,
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
