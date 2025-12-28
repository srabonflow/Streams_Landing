const mongoose = require("mongoose");

const HeroSchema = new mongoose.Schema(
  {
    title: { type: String, require: true },
    slug: { type: String, required: true, unique: true, index: true }, 
    subtitle: String,
    buttonText: String,
    buttonLink: String,
    imageUrl: { type: String, required: true },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);


module.exports = mongoose.model('hero', HeroSchema)