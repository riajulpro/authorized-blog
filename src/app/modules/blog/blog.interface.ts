import { UserType } from "../user/user.interface";

export type BlogType = {
  title: string;
  content: string;
  author: UserType;
  createdAt: Date;
  updatedAt: Date;
};
