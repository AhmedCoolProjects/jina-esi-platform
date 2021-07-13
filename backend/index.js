import app from "./server.js";
import mongodb from "mongodb";
import dotenv from "dotenv";
import UsersDAO from "./dao/usersDAO.js";
import ProfsDAO from "./dao/usersDAO.js";
import PostsDAO from "./dao/postsDAO.js";
import ModulesDAO from "./dao/modulesDAO.js";
import PChatDAO from "./dao/PChatDAO.js";

dotenv.config();
const MongoClient = mongodb.MongoClient;
const port = process.env.PORT || 8000;
// connecting to the db
MongoClient.connect(process.env.JINAESIPLATFORM_DB_URI, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
})
  .catch((err) => {
    //   catch any errors while connecting to the db
    console.error(err.stack);
    process.exit(1);
  })
  .then(async (client) => {
    // get first reference to the collection in the db
    await UsersDAO.injectDB(client);
    await ProfsDAO.injectDB(client);
    await PostsDAO.injectDB(client);
    await ModulesDAO.injectDB(client);
    await PChatDAO.injectDB(client);
    //   start the server
    app.listen(port, () => {
      console.log("listening on the port ");
      console.log(port);
    });
  });
