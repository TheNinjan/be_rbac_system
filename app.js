const express = require("express");
const app = express();
const cors = require("cors");
const db = require("./db.js");
const bodyParser = require("body-parser");
const path = require('path');
require("dotenv").config({ path: ".env" });
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});


const usersRoute = require("./routes/users.js");
app.use("/users", usersRoute);

const rolesRoute = require("./routes/roles.js");
app.use('/roles', rolesRoute);

const permissionsRoute = require("./routes/permissions.js");
app.use('/permissions',permissionsRoute);


const PORT = process.env.PORT || 4000;

app.listen(PORT, function () {
  console.log(`App running on port  ${PORT}`);
  db.connect(function (err) {
    if (err) {
      console.log("DB connection error", err);
    } else {
      console.log("DB Connection successful");
    }
  });
});


// code to keep server live 
function printTime() {
  const currentTime = new Date().toLocaleTimeString();
  console.log(`Current Time: ${currentTime}`);
}
setInterval(printTime, 60000);

printTime();