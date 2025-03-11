require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");


const empRoutes = require("./routes/empRoute");
const taskRoute = require("./routes/taskRoute");
console.log(process.env.MONGO_URI);
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MONGODB Connected"))
.catch(err => console.error(err));

app.use(express.json());
app.use(cors());
app.use("/api/emp",empRoutes);
app.use("/api/task",taskRoute);

//app.use("/api/task",taskRoutes);

const PORT = process.env.PORT || 5500;

app.listen(PORT , () => console.log("Server running on PORT",PORT));
