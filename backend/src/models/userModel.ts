const crypto = require("crypto");
import mongoose, { Schema } from "mongoose";
import { IUserDocument } from "../types/IUser";
var bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");

const userSchema = new Schema<IUserDocument>(
  {
    firstName: {
      type: String,
      trim: true,
      required: [true, "Nome é obrigatório"],
      maxLength: 32,
    },
    lastName: {
      type: String,
      trim: true,
      required: [true, "Sobrenome é obrigatório"],
      maxLength: 32,
    },
    email: {
      type: String,
      trim: true,
      required: [true, "e-mail é obrigatório"],
      unique: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Favor adicionar um e-mail valido",
      ],
    },
    password: {
      type: String,
      trim: true,
      required: [true, "Senha é obrigatória"],
      minLength: [6, "Senha deve ter no minimo (6) caracteres"],
    },

    role: {
      type: String,
      default: "user",
    },
    active: {
      type: Boolean,
      default: false,
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
  },
  { timestamps: true }
);

//encrypting password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

// compare user password
userSchema.methods.comparePassword = async function (enteredPassword: string) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// return a JWT token
userSchema.methods.getJwtToken = function () {
  return jwt.sign({ id: this.id }, process.env.JWT_SECRET, {
    expiresIn: 3600,
  });
};

//generate and hash password schema
userSchema.methods.getResetPasswordToken = function () {
  //generate token
  const resetToken = crypto.randomBytes(20).toString("hex");
  //hash token and set to resetPasswordToken
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  //set expire
  this.resetPasswordExpire = Date.now() + 10 * 60 * 1000;
  return resetToken;
};

module.exports = mongoose.model<IUserDocument>("User", userSchema);
