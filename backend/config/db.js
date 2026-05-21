const mongoose = require("mongoose");

const connectDB = async () => {
 try {
  await mongoose.connect(process.env.MONGO_URI, {});
  console.log("MongoDB Bağlandı");
  
 } catch (error) {
  console.error("MongoDB bağlantısında hata", err);
  process.exit(1);
 }
};

module.exports = connectDB;