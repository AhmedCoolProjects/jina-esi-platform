import app from "./server.js";
import mongodb from "mongodb";
import dotenv from "dotenv";
import ReviewsDAO from "./dao/reviewsDAO.js";
import RestaurantsDao from "./dao/restaurantsDao.js";

dotenv.config();
const MongoClient = mongodb.MongoClient;
const port = process.env.PORT || 8000;
// connecting to the db
MongoClient.connect(process.env.RESTREVIEWS_DB_URI, {
  poolSize: 50,
  wtimeout: 2500,
  useNewUrlParser: true,
})
  .catch((err) => {
    //   catch any errors while connecting to the db
    console.error(err.stack);
    process.exit(1);
  })
  .then(async (client) => {
    // get first reference to the collection in the db
    await RestaurantsDao.injectDB(client);
    await ReviewsDAO.injectDB(client);
    //   start the server
    app.listen(port, () => {
      console.log("listening on the port ");
      console.log(port);
    });
  });
