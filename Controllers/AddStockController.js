const PlantModel = require('../Models/Plants');
const PlaceOrder = require("../Models/PlaceOrder");

const addNewPlant = async(req,res)=>{
    const {name,desc,image,category,price,stock,careTips} = req.body;
    try{
        const plantModel = new PlantModel({name,desc,image,category,price,stock,careTips});
        await plantModel.save();
        res.status(200).json({message:"Stock added Successfully",success:true});
    }
    catch(er){
        res.status(500).json({message:"Failed to add stock",success:false});
    }
}

const updatedExistingPlant = async(req,res)=>{
    const {id} = req.params;
    const updateData = req.body;

    try{
        const updatedPlant = await PlantModel.findByIdAndUpdate(id, updateData, { new: true });
        if (!updatedPlant) {
            return res.status(404).json({ message: "Plant Not Found", success: false });
        }
        return res.status(200).json({message:"Plant Updated Successfully",success:true})
    }
    catch(err){
        return res.status(500).json({message:"Server Error",success:false})
    }
}

const updateOrderStatus = async (req, res) => {
    try {
        const { status } = req.body;
        if (status === undefined || status === null) {
            return res.status(400).json({
                success: false,
                message: "Status is required"
            });
        }
        const numericStatus = Number(status);

        if (status === undefined) {
            return res.status(400).json({ success: false, message: "Status is required" });
        }
        
        const order = await PlaceOrder.findById(req.params.id);
        if (!order) {
            return res.status(403).json({ success: false, message: "Order not found" });
        }
        
        const statusMap = ["confirmed", "shipped", "delivered"];

        if (numericStatus < 0 || numericStatus >= statusMap.length) {
            return res.status(400).json({ success: false, message: "Invalid status value" });
        }
        if (numericStatus === 2 && order.paymentStatus==='pending') {
            return res.status(400).json({ success: false, message: "Payment is pending" });
        }
        order.status = statusMap[numericStatus];
        await order.save();

        return res.status(200).json({
            success: true,
            message: "Status successfully updated",
        });

    } catch (err) {
        return res.status(500).json({ success: false, message: err.message || "Server Error" });
    }
}


module.exports={
    addNewPlant,updatedExistingPlant,updateOrderStatus
}