// importing express package
const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

const workoutRoutes = require("./routes/workouts");

dotenv.config();

const PORT = process.env.PORT || 4000;
// express app
const app = express();

//middleware
app.use(express.json());
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

//Routes (http://localhost:4400/)
app.get("/", (req, res) => {
  res.json({ msg: "Welcome to our application" });
});

app.use("/api/workouts/", workoutRoutes);


// connect to db
mongoose.connect(process.env.MONGO_URI)
.then(() => {
  //listen for requests
app.listen(PORT, () => {
  console.log(`server is up and listeing at: http://localhost:${PORT} & connected to db `);
});
})
.catch((error) => {
console.log(error)});



