import Order from "../models/Order.js";

export const createOrder = async (req, res) => {
    try {

        const {
        customerName,
        email,
        address,
        city,
        pincode,
        items,
        totalAmount,
        } = req.body;

        const order = new Order({
        customerName,
        email,
        address,
        city,
        pincode,
        items,
        totalAmount,
        });

        const savedOrder = await order.save();

        res.status(201).json(savedOrder);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};