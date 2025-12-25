const {addNewPlant,updatedExistingPlant, updateOrderStatus} = require('../Controllers/AddStockController');
const addStockValidation = require('../Middlewares/AddStockValidation');
const { authMiddleware } = require('../Middlewares/AuthValidation');
// const ensureAuthorized = require('../Middlewares/Auth');

const router = require('express').Router();


router.post('/addstock',authMiddleware,addStockValidation,addNewPlant);
router.put('/updatestock/:id',authMiddleware,addStockValidation,updatedExistingPlant);
router.put('/updateorderstatus/:id',authMiddleware,updateOrderStatus);

module.exports = router;
