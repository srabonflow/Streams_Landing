const express = require("express");
const router = express.Router();
const heroController = require("../controllers/hero.controller.js");

router.get("/landing", heroController.getHeroes);
router.get("/landing/:slug", heroController.getBySlug);
router.post("/landing", heroController.createHero);
router.put("/landing/:id", heroController.updateHero);
router.delete("/landing/:id", heroController.deleteHero);


module.exports = router;
