const express = require("express");
const dotenv = require("dotenv");
const { mongoose } = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const path = require("path");
// imports

const authController = require("./routes/auth");
const questionsController = require("./routes/questions");
const userController = require("./routes/user");
const categoryController = require("./routes/category");
const resourceController = require("./routes/resource");

dotenv.config();
const port = process.env.PORT || 8000;
const mongo_url = process.env.MONGO_URL;

mongoose.set("strictQuery", false);
mongoose.connect(
  "mongodb+srv://kartikeyamathur16:kartikeya@cluster0.foqphxt.mongodb.net/?retryWrites=true&w=majority"
);

app.use(express.json());
app.use(bodyParser.json());
app.use(
  cors({
    origin: "*",
  })
);

app.use("/auth", authController);
app.use("/question", questionsController);
app.use("/user", userController);
app.use("/category", categoryController);
app.use("/resources", resourceController);

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "../frontend", `/public/index.html`));
});

app.listen(port, () => {
  console.log(`Server is listening at ${port}`);
});
