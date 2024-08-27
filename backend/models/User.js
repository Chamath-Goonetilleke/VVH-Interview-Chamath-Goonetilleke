import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: { type: String, Required: true },
  email: { type: String, Required: true, Unique:true },
  password: { type: String, Required: true },
});

const User = mongoose.model('Users', UserSchema)
export default User;