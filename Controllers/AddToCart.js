const CartModel = require('../Models/AddtoCart');
const PlantModel = require('../Models/Plants')
const mongoose = require('mongoose');
const addtoCart = async(req,res)=>{
    try{
        const {userId,plantId,quantity} = req.body;

        if(!userId || !plantId)
            return res.status(400).json({message:"Missing userId or plantId",success:false});

        const qty = Number(quantity) || 1;


        const plant = await PlantModel.findById(plantId);

        if (!plant.stock) {
            return res.status(400).json({
                message: "Not enough stock or invalid plantId",
                success: false
            });
        }

        let cart = await CartModel.findOne({userId});
        if(!cart){
            cart = new CartModel({
                userId,
                items:[{plantId,quantity:quantity||1}]
            })
        }
        else{
            const itemIndex = cart.items.findIndex(item=>item.plantId.toString()===plantId);
            if(itemIndex>-1){
                cart.items[itemIndex].quantity+=quantity || 1;
            }
            else{
                cart.items.push({plantId,quantity:quantity||1});
            }
        }
        cart.updatedAt=Date.now();
        await cart.save();
        return res.status(200).json({message:"Item added successfully",success:true});
    }
    catch(err){
        return res.status(500).json({message:"Failed to add to cart",success:false});
    }
}

const getCart = async(req,res)=>{
    try{
        const userId = req.user._id;
        
        if(!userId)
            return res.status(400).json({message:"Missing userId",success:false});

        let cart = await CartModel.findOne({userId}).populate("items.plantId");
        if(!cart){
            return res.status(400).json({message:"No item added yet"});
        }
        else{
            return res.status(200).json({cart:cart.items,message:"Data fetched successfully",success:true});
        }
    }
    catch(err){
        return res.status(500).json({message:"Error in getting data",success:false});
    }
}

const updateCartItem = async(req,res)=>{
    try{
        const userId = req.user._id;
        const {plantId,quantity} = req.body;

        if(!userId || !plantId || !quantity)
            return res.status(400).json({message:"Missing required field",success:false});

        let cart = await CartModel.findOne({userId});

        if(!cart){
            return res.status(400).json({message:"Cart not found",success:false});
        }
        
        let item = await cart.items.find(i=>(i.plantId.toString()===plantId));
        if(item){
            item.quantity=quantity;
        }
        else{
            cart.items.push({plantId,quantity});
        }

        await cart.save();
        return res.status(200).json({message:"Cart updated successfully",success:true})
    }
    catch(err){
        return res.status(500).json({message:"Error in updating data",success:false});
    }
}
const removeCartItem = async(req,res)=>{
    try{
        const userId = req.user._id;
        const {plantId} = req.body;

        if(!userId || !plantId)
            return res.status(400).json({message:"Missing required field",success:false});

        let cart = await CartModel.findOne({userId});

        if(!cart){
            return res.status(400).json({message:"Cart not found",success:false});
        }
        
        cart.items =  cart.items.filter(i=>(i.plantId.toString()!==plantId));

        await cart.save();
        return res.status(200).json({message:"Cart item deleted successfully",success:true})
    }
    catch(err){
        return res.status(500).json({message:"Error deleting cart item",success:false});
    }
}

module.exports={
    addtoCart,getCart,updateCartItem,removeCartItem
}