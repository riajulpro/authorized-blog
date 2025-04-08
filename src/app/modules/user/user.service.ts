import { UserModel } from "./user.model";

const isValidEmailAndExist = async (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { success: false, message: "Invalid email!" };
  }

  const existingUser = await UserModel.findOne({ email });
  if (existingUser) {
    return {
      success: false,
      message: "Email already exists!",
    };
  }

  return {
    success: true,
    message: "Email is valid and does not exist!",
  };
};

const isEmailExist = async (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { success: false, message: "Invalid email!" };
  }

  const existingUser = await UserModel.findOne({ email });
  if (existingUser) {
    return {
      success: true,
      message: "Email exists!",
      user: existingUser || {},
    };
  }

  return {
    success: false,
    message: "Email doesn't exists!",
  };
};

const signUpUser = async (name: string, email: string, password: string) => {
  const newUser = new UserModel({
    name,
    email,
    password,
  });

  const savedUser = await newUser.save();

  return savedUser;
};

export const AuthServices = {
  isValidEmailAndExist,
  signUpUser,
  isEmailExist,
};
