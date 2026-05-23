import Admin from "../models/Admin.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

//ADMIN LOGIN
export const adminLogin = async (req, res) => {
    try {
        const {email, password} = req.body;

        const admin = await Admin.findOne({ email });

        if(!admin) {
            return res.status(404).json({
                message: "Admin not found",
            });
        }

        const isMatch = await bcrypt.compare(password, admin.password);

        if(!isMatch) {
            return res.status(400).json({
                message: "Invalid credentials"
            });
        }

        const token = jwt.sign(
            {
                id: admin._id, 
            },
            "secretkey",
            {
                expiresIn : "7d",
            }
        );

        res.json({
            token,
            admin,
        });
    }catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};