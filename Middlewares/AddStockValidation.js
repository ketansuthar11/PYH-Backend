const Joi = require('joi');

const addStockValidation = (req, res, next) => {
    const Schema = Joi.object({
        name: Joi.string().min(3).required(),
        desc: Joi.string().min(4).max(500).required(),
        image: Joi.string().uri().required(),      
        category: Joi.string().min(3).max(100).required(),
        price: Joi.number().min(0).required(),
        stock: Joi.number().min(0).required(),
        careTips: Joi.string().min(3).max(500).required(), 
    });

    const { error } = Schema.validate(req.body);

    if (error) {
        return res.status(400).json({
            message: error.details[0].message
        });
    }

    next();
};

module.exports = addStockValidation;
