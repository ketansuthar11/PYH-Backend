const AddressModel = require('../Models/Address');

const addAddress = async (req,res) =>{
    const userId = req.user._id;
    const {address} = req.body;
    try{
        const updated = await AddressModel.findOneAndUpdate({userId},{
            $push:{
                addresses:{
                    address,
                    isDefault:false
                }
            }
        },{ upsert: true, new: true });
        res.status(200).json({success:true,message:"Address added successfully",data:updated.addresses});
    }
    catch(e){
        res.status(500).json({success:false,message:"Failed to add address"});
    }
}

const getAddress = async (req,res) =>{
    const userId = req.user._id;
    try{
        const userAddresses = await AddressModel.findOne({userId});
        res.status(200).json({success:true, data: userAddresses?userAddresses.addresses:[]});
    }
    catch(e){
        res.status(500).json({success:true, message: "Failed to fetch addresses"});
    }
}

module.exports = {
    addAddress, getAddress
}