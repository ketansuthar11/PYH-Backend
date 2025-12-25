const PlaceOrder = require("../Models/PlaceOrder");
const PlantModel = require("../Models/Plants");
const CartModel = require("../Models/AddtoCart")

const placeOrder = async (req, res) => {
    const userId = req.user._id;
    const { plants, address, paymentMethod } = req.body;
    try {
        if (!plants || plants.length === 0) {
            return res.status(400).json({ message: "No plants selected", success: false });
        }
        let totalAmount = 0;
        for (let plant of plants) {
            const plantData = await PlantModel.findById(plant.plantId);
            if (!plantData) {
                return res.status(404).json({ message: `Plant not found: ${plant.plantId}`, success: false });
            }
            if (plantData.stock < plant.quantity) {
                return res.status(400).json({ message: `Insufficient stock for ${plantData.name}`, success: false });
            }
            totalAmount += plantData.price * plant.quantity;
        }
        const order = new PlaceOrder({
            userId,
            plants,
            totalAmount,
            address,
            paymentMethod,
            status: "confirmed",
            paymentStatus: paymentMethod == 'cash' ? "pending" : "paid"
        });
        await order.save();
        for (let item of plants) {
            await PlantModel.findByIdAndUpdate(item.plantId, { $inc: { stock: -item.quantity } });
        }
        await CartModel.deleteMany({ userId });

        return res.status(201).json({ message: "Order placed successfully", success: true, order });
    }
    catch (err) {
        return res.status(500).json({ message: "Internel Server Error", success: false });
    }
}

const getOrders = async (req, res) => {
    try {
        let orders;
        const userId = req.user._id;
        const role = req.user.role;

        if (role === "admin") {
            orders = await PlaceOrder.find();
        } else {
            if (!userId) {
                return res.status(400).json({ message: "Required userId", success: false });
            }
            orders = await PlaceOrder.find({ userId });
        }

        if (!orders || orders.length === 0) {
            return res.status(404).json({ message: "No orders placed", success: false });
        }

        return res.status(200).json({ message: "Order fetched successfully", success: true, orders });
    } catch (err) {
        return res.status(500).json({ message: "Internel Server Error", success: false });
    }
}


const getOrderById = async (req, res) => {
    try {
        const order = await PlaceOrder.findById(req.params.id).populate("plants.plantId");
        if (!order) {
            return res.status(404).json({ success: false, message: "Order not found" });
        }
        return res.status(200).json({ success: true, order });
    } catch (err) {
        return res.status(500).json({ success: false, message: "Server Error" });
    }
}


module.exports = {
    placeOrder, getOrders,getOrderById
}