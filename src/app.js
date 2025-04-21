require("dotenv").config();
const express = require("express");
const morgan = require("morgan");


const connectDB = require("./config/connectDB");
const router = require("./routes");
const globalError = require("./middleware/errorMiddleware");

const cors = require("cors");

const PORT = process.env.PORT || 3000;

const app = express();
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.use('/uploads', express.static('uploads'));

app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.use("/", router);

app.use(globalError);

app.listen(PORT, async () => {
  await connectDB();

  console.log(`Server is running on port ${PORT}`);
});
