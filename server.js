require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");

// routers
const subscriberRouter = require("./routes/subscribers");

mongoose.connect(process.env.DATABASE_URL);
const db = mongoose.connection;

db.on("error", (error) => console.log(error));
db.once("open", () => console.log("DB connected"));

app.use(express.json());
app.use("/subscribers", subscriberRouter);

app.listen(3000, () => console.log("server running on port 3000"));
