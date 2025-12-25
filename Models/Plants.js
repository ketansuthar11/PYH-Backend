const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PlantSchema = new Schema({
    name:{
        type:String,
        require:true,
        trim:true
    },
    desc:{
        type:String,
        require:true,
        maxLength:500
    },
    image:{
        type:String,
    },
    category:{
        type:String,
        require:true
    },
    stock:{
        type:Number,
        default:0
    },
    price:{
        type:Number,
        require:true,
        min:0
    },
    careTips:{
        type:String,
        require:true,
    },
    createdAt:{
        type:Date,
        default:Date.now()
    }
});

const PlantModel = mongoose.model('plant',PlantSchema);
module.exports = PlantModel