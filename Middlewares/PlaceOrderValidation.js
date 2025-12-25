const Joi = require('joi');
const orderValidation = (req, res, next)=>{
    const Schema = Joi.object({
        plants: Joi.array()
            .items(
                Joi.object({
                    plantId: Joi.string().required(),
                    quantity: Joi.number().min(1).required()
                })
            )
            .min(1)
            .required(),
        address: Joi.string().min(5).required(),
        paymentMethod: Joi.string().valid('stripe', 'paypal', 'razorpay', 'cash').required()
    });
    const { error } = Schema.validate(req.body);
    if (error) {
        res.status(400).json({ message: "Bad request", error })
    }
    next();
}

module.exports={
    orderValidation
}