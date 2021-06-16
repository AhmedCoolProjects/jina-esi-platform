import express from "express";
import cors from "cors";
import jinaesiplatform from "./api/jinaesiplatform.route.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/v1/jinaesiplatform", jinaesiplatform);
app.use("*", (req, res) => res.status(404).json({ error: "route not found" }));

export default app;
