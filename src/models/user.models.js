import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      lowercase: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please fill a valid email address",
      ],
    },
    password: { 
        type: String, 
        required: true, 
        trim: true,
        minlength: 6,
        match: [
          /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}$/,
          "Password must contain at least 6 characters, one uppercase letter, one lowercase letter, and one number",
        ],
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
