require("dotenv").config();
// import atau panggil package yang kita mau pake di aplikasi kita
const express = require("express");
const routes = require("./routes");

const cors = require("cors");
const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
  optionSuccessStatus: 200,
};

// framework utk http server
const app = express();
const PORT = process.env.PORT || 5000;

// middleware, untuk baca json
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));

app.use("/api/v1", routes);

// memulai server nya
app.listen(PORT, () => {
  console.log(`App running on localhost:${PORT}`);
});
