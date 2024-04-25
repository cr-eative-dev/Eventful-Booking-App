import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
  clerkId: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  firstName: {
    type: String,
    requiered: true,
  },
  lastName: {
    type: String,
    requiered: true,
  },
  avatar: {
    type: String,
  },
  aboutMe: {
    type: String,
  },
  interests: {
    type: [
      {
        type: Schema.Types.ObjectId,
        ref: "Category",
      },
    ],
    default: [],
  },
  following: {
    type: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    default: [],
  },
});

const User = models.User || model("User", UserSchema, "users");

export default User;
