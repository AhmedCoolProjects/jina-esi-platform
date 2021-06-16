import ProfsDAO from "../dao/profsDAO.js";

export default class ProfsCtrl {
  static async apiGetAllProfs(req, res, next) {
    let filters = {};
    if (req.query.email) {
      filters.email = req.query.email;
    }
    const { profsList, totalNbrProfs } = await ProfsDAO.getAllProfs({
      filters,
    });
    let response = {
      profsList: profsList,
      filters: filters,
      totalNbrProfs: totalNbrProfs,
    };
    res.json(response);
  }
  static async apiPostProf(req, res, next) {
    try {
      const email = req.body.email;
      const first_name = req.body.first_name;
      const last_name = req.body.last_name;
      const OperationResponse = await ProfsDAO.addProf(
        email,
        first_name,
        last_name
      );
      res.json({ status: "success adding prof" });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }
}
