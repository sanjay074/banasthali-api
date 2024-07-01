const express = require("express");
const app = express();
const mongoose = require("mongoose");
const helmet = require("helmet");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

app.get("/", (req, res) => {
  res.send("<h1>A Node Js API is listening on port❗❗❗👌😒</h1>");
});

mongoose
  .connect(process.env.MONGO_URI, {
  })
  .then(() => console.log("DB Connected"));

mongoose.connection.on("error", (err) => {
  console.log(`DB connection error: ${err.message}`);
});

const Auth = require("./auth/routes/admin");
const Student = require("./student/routes/student");
const Payment =require("./account/routes/payment");


// middleware
app.use(helmet());
app.use(morgan("dev"));

app.use(cors());
// Increase the limit to 50mb, for example
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use("/api/auth",Auth);
app.use("/api",Student)
app.use("/api",Payment);

var PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`A Node Js API is listening on port: ${PORT}`);
});
