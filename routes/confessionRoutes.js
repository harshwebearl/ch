const express = require('express');
const router = express.Router();
const confessionController = require('../controllers/confessionController');

router.post('/', confessionController.createConfession);
router.get('/', confessionController.getConfessions);
router.get('/:id', confessionController.getConfession);
router.put('/:id', confessionController.updateConfession);
router.delete('/:id', confessionController.deleteConfession);

module.exports = router;