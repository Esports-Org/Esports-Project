const mongoose = require("mongoose");

const DB_URI = `mongodb+srv://hassanabugareeb:hassan123@cluster0.ywpjobi.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const connectToMongo = () => {
  mongoose.connect(DB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

  db = mongoose.connection;

  db.once("open", () => {
    console.log("Database connected: ", url);
  });

  db.on("error", (err) => {
    console.error("Database connection error: ", err);
  });
};

module.exports = connectToMongo;
