import jwt from "jsonwebtoken";
import User from "../model/userModel.js";
import bcryptjs from "bcryptjs";
import { renameSync, unlinkSync } from "fs";
const max_age = 3 * 24 * 60 * 60 * 1000;

const createToken = (email, userId) => {
  return jwt.sign({ email, userId }, process.env.JWT_KEY, {
    expiresIn: max_age,
  });
};

export const signup = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).send("Email and Password is required");
    }
    const userData = await User.create({ email, password });
    res.cookie("jwt", createToken(email, userData.id), {
      max_age,
      secure: true,
      sameSite: "None",
    });
    return res.status(201).json({
      userData: {
        id: userData.id,
        email: userData.email,
        profileSetup: userData.profileSetup,
      },
    });
  } catch (error) {
    ({ error });
    return res.status(500).send("Internal Server Error");
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).send("Email and Password is required");
    }
    const userData = await User.findOne({ email });
    if (!userData) {
      return res.status(404).send("User with the given email not found.");
    }
    const auth = await bcryptjs.compare(password, userData.password);
    if (!auth) {
      return res.status(400).send("Password is incorrect.");
    }
    res.cookie("jwt", createToken(email, userData.id), {
      max_age,
      secure: true,
      sameSite: "None",
    });
    return res.status(200).json({
      userData: {
        id: userData.id,
        email: userData.email,
        profileSetup: userData.profileSetup,
        firstName: userData.firstName,
        lastName: userData.lastName,
        image: userData.image,
        color: userData.color,
      },
    });
  } catch (error) {
    console.log({ error });
    return res.status(500).send("Internal Server Error");
  }
};

export const getUserInfo = async (req, res, next) => {
  try {
    const userData = await User.findById(req.userId);
    if (!userData) {
      return res.status(404).send("User with the given email not found.");
    }
    return res.status(200).json({
      id: userData.id,
      email: userData.email,
      profileSetup: userData.profileSetup,
      firstName: userData.firstName,
      lastName: userData.lastName,
      image: userData.image,
      color: userData.color,
    });
  } catch (error) {
    console.log({ error });
    return res.status(500).send("Internal Server Error");
  }
};
export const updateprofile = async (req, res, next) => {
  try {
    const { userId } = req;
    const { firstName, lastName, color } = req.body;
    console.log(firstName, lastName, color);
    if (!firstName || !lastName) {
      return res.status(400).send("Firstname lastname and color is required.");
    }

    const userData = await User.findByIdAndUpdate(
      userId,
      {
        firstName,
        lastName,
        color,
        profileSetup: true,
      },
      { new: true, runValidators: true }
    );
    return res.status(200).json({
      id: userData.id,
      email: userData.email,
      profileSetup: userData.profileSetup,
      firstName: userData.firstName,
      lastName: userData.lastName,
      image: userData.image,
      color: userData.color,
    });
  } catch (error) {
    console.log({ error });
    return res.status(500).send("Internal Server Error");
  }
};
export const addProfileImage = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).send("File is required");
    }
    const date = Date.now();
    let fileName = "uploads/profiles/" + date + req.file.originalname;
    renameSync(req.file.path, fileName);
    console.log(req.file.path);
    const updatedUser = await User.findByIdAndUpdate(
      req.userId,
      {
        image: fileName,
      },
      { new: true, runValidators: true }
    );
    return res.status(200).json({
      image: updatedUser.image,
    });
  } catch (error) {
    console.log({ error });
    return res.status(500).send("Internal Server Error");
  }
};
export const removeProfileImage = async (req, res, next) => {
  try {
    const { userId } = req;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).send("User not found.");
    }

    if (user.image) {
      unlinkSync(user.image);
    }
    user.image = null;
    await user.save();

    return res.status(200).send("Profile image removed successfully.");
  } catch (error) {
    console.log({ error });
    return res.status(500).send("Internal Server Error");
  }
};
export const logout = async (req, res, next) => {
  try {
    res.cookie("jwt", "",{max_age:1,secure:true,sameSite:"None"});

    return res.status(200).send("Logout successfull.");
  } catch (error) {
    console.log({ error });
    return res.status(500).send("Internal Server Error");
  }
};
