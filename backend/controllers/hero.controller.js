require("dotenv").config();
const { client, connectDB } = require("../lib/db_connection/db_connection.js");
const hero = require("../models/hero.js");
const slugify = require("slugify");
const { ObjectId } = require("mongodb");

const generateUniqueSlug = async (collection, title, excludeId = null) => {
  const base = slugify(title, { lower: true, strict: true, trim: true });
  let slug = base || "hero";
  let count = 1;

  while (true) {
    const query = { slug };

    if (excludeId) {
      query._id = { $ne: new ObjectId(excludeId) };
    }

    const exists = await collection.findOne(query);
    if (!exists) return slug;

    count += 1;
    slug = `${base}-${count}`;
  }
};

exports.getHeroes = async (req, res) => {
  try {
    await connectDB();
    const db = client.db("Streams_Hero");
    const collection = db.collection("hero_landing");

    const heroes = await collection.find({}).sort({ createdAt: -1 }).toArray();
    res.json(heroes);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to load heroes" });
  }
};

exports.createHero = async (req, res) => {
  try {
    await connectDB();

    const db = client.db("Streams_Hero");
    const collection = db.collection("hero_landing");

    const { title, subtitle, imageUrl, cards } = req.body;

    if (!title || !imageUrl) {
      return res.status(400).json({ message: "Title and imageUrl are required" });
    }

    // cards optional, but if you want to enforce:
    // if (!Array.isArray(cards) || cards.length !== 2) {
    //   return res.status(400).json({ message: "cards must be an array of 2 items" });
    // }

    const slug = await generateUniqueSlug(collection, title);

    const doc = {
      title,
      subtitle: subtitle || "",
      imageUrl,
      cards: Array.isArray(cards) ? cards : [], 
      slug,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await collection.insertOne(doc);
    return res.json({ ...doc, _id: result.insertedId });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Failed to create hero" });
  }
};

const emptyCard = () => ({
  badge: "",
  description: "",
  price: "",
  duration: "",
  note: "",
  ctaText: "Get Both Now",
});

const normalizeCards = (cards) => {
  const arr = Array.isArray(cards) ? cards : [];
  const c0 = { ...emptyCard(), ...(arr[0] || {}) };
  const c1 = { ...emptyCard(), ...(arr[1] || {}) };
  return [c0, c1];
};

exports.updateHero = async (req, res) => {
  try {
    await connectDB(); 

    const db = client.db("Streams_Hero");
    const collection = db.collection("hero_landing");

    const id = req.params.id;
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid hero id" });
    }

    const { title, subtitle, imageUrl, cards } = req.body;

    if (!title || !imageUrl) {
      return res.status(400).json({ message: "Title and imageUrl are required" });
    }

    // get current doc to decide slug update
    const existing = await collection.findOne({ _id: new ObjectId(id) });
    if (!existing) {
      return res.status(404).json({ message: "Hero not found" });
    }

    let slug = existing.slug;
    if (existing.title !== title) {
      slug = await generateUniqueSlug(collection, title, id);
    }

    const updates = {
      title,
      subtitle: subtitle || "",
      imageUrl,
      cards: normalizeCards(cards),
      slug,
      updatedAt: new Date(),
    };

    const result = await collection.findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: updates },
      { returnDocument: "after" }
    );

    return res.json(result.value);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Failed to update hero" });
  }
};


exports.deleteHero = async (req, res) => {
  try {
    const db = client.db("Streams_Hero");
    const collection = db.collection("hero_landing");

    const id = req.params.id;

    await collection.deleteOne({ _id: new ObjectId(id) });
    res.json({ message: "Deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to delete hero" });
  }
};

exports.getBySlug = async (req, res) => {
  try {
    await connectDB();

    const { slug } = req.params;

    const db = client.db("Streams_Hero");
    const collection = db.collection("hero_landing");

    const heroDoc = await collection.findOne({ slug });

    if (!heroDoc) {
      return res.status(404).json({ message: "Hero not found" });
    }

    return res.json(heroDoc);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error" });
  }
};
