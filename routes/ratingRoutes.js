const express = require('express');
const router = express.Router();
const ratingController = require('../controllers/ratingController');
const auth = require('../middleware/auth');

// Create rating for a user (protected - requires authentication)
router.post('/', auth, ratingController.createRating);

// Get all ratings
router.get('/', ratingController.getAllRatings);

// Get rating by ID
router.get('/:id', ratingController.getRatingById);

// Get ratings for a specific user (ratings received)
router.get('/for/:userId', ratingController.getRatingsForUser);

// Get ratings given by a user
router.get('/from/:userId', ratingController.getRatingsFromUser);

// Get average rating for a user
router.get('/average/:userId', ratingController.getAverageRating);

// Update rating (protected - requires authentication)
router.put('/:id', auth, ratingController.updateRating);

// Delete rating (protected - requires authentication)
router.delete('/:id', auth, ratingController.deleteRating);

module.exports = router;
