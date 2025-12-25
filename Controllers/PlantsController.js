const PlantModel = require("../Models/Plants")
const getAllPlants = async(req,res)=>{
    try{
        const plants = await PlantModel.find();
        return res.status(200).json({plants,success:true});
    }
    catch(err){
        return res.status(403).json({message:"Failed to fetch plants",success:false})
    }
}

const getPlant = async(req,res)=>{
    try{
        const {id} = req.params;
        const plant = await PlantModel.findById(id);
        if(!plant){
            return res.status(403).json({message: "Plant not found",success:false});
        }
        else{
            return res.status(200).json({plant,success:true});
        }
    }
    catch(err){
        return res.status(500).json({message:"Failed to fetch plant",success:false})
    }
}



module.exports ={ getPlant,getAllPlants}