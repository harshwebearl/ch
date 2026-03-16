const express = require('express');
const router = express.Router();
const feedbackController = require('../controllers/feedbackController');
const auth = require('../middleware/auth');

// Create feedback (protected - requires authentication)
router.post('/', auth, feedbackController.createFeedback);

// Get all feedback
router.get('/', feedbackController.getAllFeedback);

// Get feedback by ID
router.get('/:id', feedbackController.getFeedbackById);

// Get feedback by user ID
router.get('/user/:userId', feedbackController.getFeedbackByUserId);

// Get feedback by confession ID
router.get('/confession/:confessionId', feedbackController.getFeedbackByConfessionId);

// Update feedback (protected - requires authentication)
router.put('/:id', auth, feedbackController.updateFeedback);

// Delete feedback (protected - requires authentication)
router.delete('/:id', auth, feedbackController.deleteFeedback);

module.exports = router;
