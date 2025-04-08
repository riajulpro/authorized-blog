import { Request, Response } from "express";
import { AuthServices } from "./user.service";
import bcrypt from "bcrypt";

const register = async (req: Request, res: Response) => {
  const { name, email, password } = req.body || {};

  try {
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        statusCode: 400,
        message: "Please provide all required fields",
        data: {},
      });
    }

    const { success: isEmailOk, message: emailMessage } =
      await AuthServices.isValidEmailAndExist(email);

    if (!isEmailOk) {
      return res.status(400).json({
        success: false,
        message: emailMessage,
        statusCode: 400,
        data: {},
      });
    }

    const user = await AuthServices.signUpUser(name, email, password);

    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "You succesfully register an account!",
      data: user,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      statusCode: 500,
      message: error.message as string,
      stack: error.stack || "",
    });
  }
};

const login = async (req: Request, res: Response) => {
  const { email, password } = req.body || {};

  try {
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        statusCode: 400,
        message: "Please provide all required fields",
        data: {},
      });
    }

    const {
      success: isEmailFound,
      message: emailMessage,
      user,
    } = await AuthServices.isEmailExist(email);

    if (!isEmailFound) {
      return res.status(400).json({
        success: false,
        statusCode: 400,
        message: emailMessage,
        data: {},
      });
    }

    const isPasswordMatched = await bcrypt.compare(
      password,
      user?.password || ""
    );

    if (!isPasswordMatched) {
      return res.status(400).json({
        success: false,
        statusCode: 400,
        message: "Password wrong!",
        data: {},
      });
    }

    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "You successfully hit the login endpoint!",
      data: user || {},
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      statusCode: 500,
      message: error.message as string,
      stack: error.stack || "",
    });
  }
};

export const AuthControllers = {
  register,
  login,
};
