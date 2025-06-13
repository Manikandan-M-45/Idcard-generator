const IdCard = require('../models/idcard.model');

const createIdCard = async (req, res) => {
  try {
    const { name, email, address } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "Please upload an image" });
    }

    const newIdCard = new IdCard({
      name,
      email,
      address,
      imagePath: `/uploads/${req.file.filename}`,
    });

    await newIdCard.save();
    res.status(201).json(newIdCard);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

const viewIdCard = async (req, res) => {
  try {
    const idCards = await IdCard.find();
    res.json(idCards);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports={
  createIdCard,
  viewIdCard
}