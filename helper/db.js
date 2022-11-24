const mongoose = require("mongoose");
module.exports = () => {
  mongoose.connect(
    "mongodb+srv://receppek:vQKWuoyNt5QAu2sW@pithgrowth.zlrfn9m.mongodb.net/Pithgrowth",
    { useUnifiedTopology: true, useNewUrlParser: true }
  );
  mongoose.connection.on("open", () => {
    console.log("MongoDB Connected");
  });
  mongoose.connection.on("uncaughtException", (err) => {
    console.log(err);
  });
  mongoose.connection.on("error", (err) => {
    console.log("MongoDB Error", err);
  });
  mongoose.Promise = global.Promise;
};