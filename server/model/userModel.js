import mongoose from "mongoose";
import bcryptjs from "bcryptjs";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    require: [true, "Email is Required."],
    unique: true,
  },
  password: {
    type: String,
    require: [true, "Password is Required."],
  },
  firstName: {
    type: String,
    require: false,
  },
  lastName: {
    type: String,
    require: false,
  },
  image: {
    type: String,
    require: false,
  },
  color: {
    type: Number,
    require: false,
  },
  profileSetup: {
    type: Number,
    default: false,
  },
});

userSchema.pre("save", async function (next) {
 
  this.password = await bcryptjs.hash(this.password, 10);
  next();
});

const User = mongoose.model("Users", userSchema);

export default User;
