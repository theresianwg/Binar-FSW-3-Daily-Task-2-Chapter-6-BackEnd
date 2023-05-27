require("dotenv").config();
// import atau panggil package yang kita mau pake di aplikasi kita
const express = require("express");
const routes = require("./routes");

const cors = require("cors");

// framework utk http server
const app = express();
const PORT = process.env.PORT || 5000;

// middleware, untuk baca json
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: "*", optionsSuccessStatus: 200 }));

app.use(routes);

// memulai server nya
app.listen(PORT, () => {
  console.log(`App running on localhost:${PORT}`);
});
