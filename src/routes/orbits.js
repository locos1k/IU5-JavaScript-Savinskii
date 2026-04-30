const express = require('express');
const router = express.Router();

const orbitsController = require('../controllers/orbitsController');

router.get('/', orbitsController.getAllOrbits);
router.get('/:id', orbitsController.getOrbitById);
router.post('/', orbitsController.createOrbit);
router.patch('/:id', orbitsController.updateOrbit);
router.delete('/:id', orbitsController.deleteOrbit);

module.exports = router;