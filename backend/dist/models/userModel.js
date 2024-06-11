"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const crypto = require("crypto");
const mongoose_1 = __importStar(require("mongoose"));
var bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
const userSchema = new mongoose_1.Schema({
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
}, { timestamps: true });
//encrypting password before saving
userSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!this.isModified("password")) {
            next();
        }
        this.password = yield bcrypt.hash(this.password, 10);
    });
});
// compare user password
userSchema.methods.comparePassword = function (enteredPassword) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield bcrypt.compare(enteredPassword, this.password);
    });
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
module.exports = mongoose_1.default.model("User", userSchema);
