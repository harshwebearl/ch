const Rating = require('../models/Rating');

// Create rating for a user
exports.createRating = async (req, res) => {
  try {
    const { ratedUserId, star, title } = req.body;
    const ratedByUserId = req.user?.id || req.user?._id || req.user?.userId;

    if (!ratedByUserId) {
      return res.status(401).json({ message: 'User not authenticated', user: req.user });
    }

    if (!ratedUserId || !star || !title) {
      return res.status(400).json({ message: 'ratedUserId, star and title are required' });
    }

    if (star < 1 || star > 5) {
      return res.status(400).json({ message: 'Star must be between 1 and 5' });
    }

    const rating = new Rating({
      ratedUserId,
      ratedByUserId,
      star,
      title,
    });

    await rating.save();
    res.status(201).json({ message: 'Rating created successfully', rating });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all ratings
exports.getAllRatings = async (req, res) => {
  try {
    const ratings = await Rating.find()
      .populate('ratedUserId', 'username email')
      .populate('ratedByUserId', 'username email');

    res.status(200).json(ratings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get rating by ID
exports.getRatingById = async (req, res) => {
  try {
    const rating = await Rating.findById(req.params.id)
      .populate('ratedUserId', 'username email')
      .populate('ratedByUserId', 'username email');

    if (!rating) {
      return res.status(404).json({ message: 'Rating not found' });
    }

    res.status(200).json(rating);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get ratings for a specific user (ratings received by user)
exports.getRatingsForUser = async (req, res) => {
  try {
    const ratings = await Rating.find({ ratedUserId: req.params.userId })
      .populate('ratedUserId', 'username email')
      .populate('ratedByUserId', 'username email');

    res.status(200).json(ratings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get ratings given by a user
exports.getRatingsFromUser = async (req, res) => {
  try {
    const ratings = await Rating.find({ ratedByUserId: req.params.userId })
      .populate('ratedUserId', 'username email')
      .populate('ratedByUserId', 'username email');

    res.status(200).json(ratings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get average rating for a user
exports.getAverageRating = async (req, res) => {
  try {
    const ratings = await Rating.find({ ratedUserId: req.params.userId });

    if (ratings.length === 0) {
      return res.status(200).json({ userId: req.params.userId, averageRating: 0, totalRatings: 0 });
    }

    const sum = ratings.reduce((acc, rating) => acc + rating.star, 0);
    const averageRating = (sum / ratings.length).toFixed(2);

    res.status(200).json({
      userId: req.params.userId,
      averageRating: parseFloat(averageRating),
      totalRatings: ratings.length,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update rating
exports.updateRating = async (req, res) => {
  try {
    const { star, title } = req.body;

    if (star && (star < 1 || star > 5)) {
      return res.status(400).json({ message: 'Star must be between 1 and 5' });
    }

    const rating = await Rating.findByIdAndUpdate(
      req.params.id,
      { star, title, updatedAt: Date.now() },
      { new: true }
    );

    if (!rating) {
      return res.status(404).json({ message: 'Rating not found' });
    }

    res.status(200).json({ message: 'Rating updated successfully', rating });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete rating
exports.deleteRating = async (req, res) => {
  try {
    const rating = await Rating.findByIdAndDelete(req.params.id);

    if (!rating) {
      return res.status(404).json({ message: 'Rating not found' });
    }

    res.status(200).json({ message: 'Rating deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
