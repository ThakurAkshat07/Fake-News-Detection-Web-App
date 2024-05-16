import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import predictRoute from "./routes/predictRoute.js";
// Declaring our App
const app = express();

// Declaring paths to files and directory
const fileName = fileURLToPath(import.meta.url);
const dirName = path.dirname(fileName);
app.use(express.json());
app.use("/predict", predictRoute);
app.listen(5000, (req, res) => {
  console.log("App is listening on the Port number: 6000");
});
