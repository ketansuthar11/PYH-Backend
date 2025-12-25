const { addtoCart, getCart, updateCartItem, removeCartItem } = require('../Controllers/AddToCart');
const {authMiddleware} = require('../Middlewares/AuthValidation')
const router = require('express').Router();

router.post('/',authMiddleware,addtoCart);
router.get('/',authMiddleware,getCart);
router.put('/',authMiddleware,updateCartItem);
router.delete('/',authMiddleware,removeCartItem);

module.exports = router