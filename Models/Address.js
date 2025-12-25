const mongoose = require('mongoose');

const AddressSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
        required: true,
        unique: true
    },
    addresses: [{
        address:{
            type: String,
            required: true
        },
        isDefault:{
            type:Boolean,
            default:false
        }
    }]
});

const AddressModel = mongoose.model('addresses', AddressSchema);
module.exports = AddressModel;
