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
            userId: req.user._id,
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

export const getMyOrders = async (req,res) => {
    try{
        const orders = await Order.find({userId: req.user._id}).sort({
            createdAt: -1,
        });
        res.json(orders);
    }catch (error){
        res.status(500).json({message: error.message});
    }
};