import express, { Application } from "express";
import allRoutes from "./app/routes";

const app: Application = express();

app.use(express.json());
app.use("/api", allRoutes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

export default app;
