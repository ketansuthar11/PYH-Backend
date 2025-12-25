const {getPlant, getAllPlants} = require('../Controllers/PlantsController');

const router = require('express').Router();


router.get('/',getAllPlants)
router.get('/:id',getPlant)
module.exports = router;