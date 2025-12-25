const { placeOrder, getOrders, getOrderById } = require('../Controllers/PlaceOrderController');
const { authMiddleware } = require('../Middlewares/AuthValidation');
const { orderValidation } = require('../Middlewares/PlaceOrderValidation');
const { getAddress, addAddress} = require('../Controllers/Addresses')
const router = require('express').Router();

router.post('/placeorder',authMiddleware,orderValidation,placeOrder);
router.get('/getorders',authMiddleware,getOrders);
router.get('/orders/:id', authMiddleware, getOrderById);
router.get('/getaddress', authMiddleware, getAddress);
router.post('/addaddress', authMiddleware, addAddress);


module.exports = router