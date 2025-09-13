const mongoose = require("mongoose");
const User = require("./user");

// Replace this with your MongoDB URI
const DB = "mongodb+srv://nithish:nithish123@nithish.4cd4ik5.mongodb.net/lumen";

mongoose.connect(DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connected successfully"))
.catch(err => console.error("MongoDB connection error:", err));

async function createSampleUser() {
  try {
    const user = await User.create({
      username: "John Doe",
      email: "johndoe@example.com",
      password: "123456",
      confirmPassword: "123456",
    });
    console.log("User created:", user);
  } catch (err) {
    console.error("Error creating user:", err.message);
  } finally {
    mongoose.connection.close();
  }
}

createSampleUser();
