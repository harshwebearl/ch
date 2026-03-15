const Confession = require('../models/Confession');

exports.createConfession = async (req, res) => {
  try {
    const { title } = req.body;
    const confession = new Confession({ title });
    await confession.save();
    res.status(201).json(confession);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getConfessions = async (req, res) => {
  try {
    const confessions = await Confession.find();
    res.json(confessions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getConfession = async (req, res) => {
  try {
    const confession = await Confession.findById(req.params.id);
    if (!confession) return res.status(404).json({ message: 'Confession not found' });
    res.json(confession);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateConfession = async (req, res) => {
  try {
    const { title } = req.body;
    const confession = await Confession.findByIdAndUpdate(req.params.id, { title }, { new: true });
    if (!confession) return res.status(404).json({ message: 'Confession not found' });
    res.json(confession);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteConfession = async (req, res) => {
  try {
    const confession = await Confession.findByIdAndDelete(req.params.id);
    if (!confession) return res.status(404).json({ message: 'Confession not found' });
    res.json({ message: 'Confession deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};