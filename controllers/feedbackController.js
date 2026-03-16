const Feedback = require('../models/Feedback');

// Create feedback
exports.createFeedback = async (req, res) => {
  try {
    const { star, comment, confessionId } = req.body;
    const userId = req.user.id;

    if (!star || !comment) {
      return res.status(400).json({ message: 'Star and comment are required' });
    }

    if (star < 1 || star > 5) {
      return res.status(400).json({ message: 'Star must be between 1 and 5' });
    }

    const feedback = new Feedback({
      userId,
      star,
      comment,
      confessionId,
    });

    await feedback.save();
    res.status(201).json({ message: 'Feedback created successfully', feedback });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all feedback
exports.getAllFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.find()
      .populate('userId', 'username email')
      .populate('confessionId', 'title');

    res.status(200).json(feedback);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get feedback by ID
exports.getFeedbackById = async (req, res) => {
  try {
    const feedback = await Feedback.findById(req.params.id)
      .populate('userId', 'username email')
      .populate('confessionId', 'title');

    if (!feedback) {
      return res.status(404).json({ message: 'Feedback not found' });
    }

    res.status(200).json(feedback);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get feedback by user ID
exports.getFeedbackByUserId = async (req, res) => {
  try {
    const feedback = await Feedback.find({ userId: req.params.userId })
      .populate('userId', 'username email')
      .populate('confessionId', 'title');

    res.status(200).json(feedback);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get feedback by confession ID
exports.getFeedbackByConfessionId = async (req, res) => {
  try {
    const feedback = await Feedback.find({ confessionId: req.params.confessionId })
      .populate('userId', 'username email')
      .populate('confessionId', 'title');

    res.status(200).json(feedback);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update feedback
exports.updateFeedback = async (req, res) => {
  try {
    const { star, comment } = req.body;

    if (star && (star < 1 || star > 5)) {
      return res.status(400).json({ message: 'Star must be between 1 and 5' });
    }

    const feedback = await Feedback.findByIdAndUpdate(
      req.params.id,
      { star, comment, updatedAt: Date.now() },
      { new: true }
    );

    if (!feedback) {
      return res.status(404).json({ message: 'Feedback not found' });
    }

    res.status(200).json({ message: 'Feedback updated successfully', feedback });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete feedback
exports.deleteFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.findByIdAndDelete(req.params.id);

    if (!feedback) {
      return res.status(404).json({ message: 'Feedback not found' });
    }

    res.status(200).json({ message: 'Feedback deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
