const express = require('express');
const router = express.Router();
const confessionController = require('../controllers/confessionController');
const auth = require('../middleware/auth');

router.post('/', auth, confessionController.createConfession);
router.get('/', confessionController.getConfessions);
router.get('/:id', confessionController.getConfession);
router.put('/:id', auth, confessionController.updateConfession);
router.delete('/:id', auth, confessionController.deleteConfession);

module.exports = router;