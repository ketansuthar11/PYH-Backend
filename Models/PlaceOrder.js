const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
    userId:{
        type : mongoose.Schema.Types.ObjectId,
        ref:'user',
        required:true
    },
    plants:[
        {
            plantId : {type: mongoose.Schema.Types.ObjectId,ref:'plant',required:true},
            quantity : {type : Number,required : true}
        }
    ],
    totalAmount:{type:Number,required:true},
    status:{type:String,enum:["pending","confirmed","shipped","delivered","cancelled"],default:"pending"},
    paymentMethod:{type:String,enum:["stripe","rozarpay","paypal","cash"],default:"cash"},
    paymentStatus:{type:String,enum:["pending","paid","cancelled"],default:"pending"},
    address:{type:String,required:true},
    orderDate:{type:Date,default:Date.now},
    },{timestamps:true}
);

module.exports=mongoose.model('order',OrderSchema);