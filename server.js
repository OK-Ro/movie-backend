require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const routes = require("./routes");

const mongoString = process.env.DATABASE_URL;
const app = express();

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

app.use(cors());
app.use("/api", routes);

mongoose.connect(mongoString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const database = mongoose.connection;

database.on("error", (err) => console.log(err));

database.on("connected", () => {
  console.log("Database connected");

  const PORT = 3005;
  app.listen(PORT, () => {
    console.log(`Server started at localhost:${PORT}`);
  });
});
