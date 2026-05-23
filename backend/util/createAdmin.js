import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import Admin from "../models/Admin.js";

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB Connected"))
    .catch( err => console.log(err));

const createAdmin = async () => {
    const hashedPassword = await bcrypt.hash(
        "jitun123",
        10
    );

    await Admin.create({
        email: "ishathapa2521@gmail.com",
        password: hashedPassword,
    });

    console.log("Admin Created");

    process.exit();
};

createAdmin();