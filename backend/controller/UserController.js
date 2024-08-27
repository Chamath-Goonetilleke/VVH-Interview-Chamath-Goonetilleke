import bcrypt from "bcrypt";
import User from "../models/User.js";
import jwt from "jsonwebtoken";

export async function RegisterUser(req, res) {
  try {
    const { name, email, password } = req.body;

    const user = await User.findOne({ email: email });
    if (user) return res.status(400).send("User Already Exist");

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User({
      name,
      email,
      password: hashedPassword,
    });
    await newUser.save();

    res.status(201).send("User Registration Successful");
    console.log("created");
  } catch (error) {
    res.status(500).send("Something went wrong");
  }
}

export async function Login(req, res) {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email });

    if (!user) return res.status(400).send("Invalid Email or Password");

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch)
      return res.status(400).send("Invalid Email or Password");

    const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY);
    console.log(token);
    res.status(200).send(token);
  } catch (error) {
    console.log(error);
    res.status(500).send("Something went wrong");
  }
}
