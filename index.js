const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const userRoutes = require("./routes/user.routes");
const fileRoutes = require("./routes/file.routes");
const picsRoutes = require("./routes/pic.routes");

app.use("/api", userRoutes, fileRoutes, picsRoutes);
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

