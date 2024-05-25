const express = require("express");
const Subscriber = require("../models/subscribers");
const router = express.Router();

// getting all
router.get("/", async (req, res) => {
  try {
    const subscribers = await Subscriber.find();
    res.json(subscribers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// getting one
router.get("/:id", getSubscriber, async (req, res) => {
  res.json(res.subscriber);
});

// creating one
router.post("/", async (req, res) => {
  const subscriber = new Subscriber({
    name: req.body.name,
    subscribedToChannel: req.body.subscribedToChannel,
  });
  try {
    const newSubscriber = await subscriber.save();
    res.status(201).json(newSubscriber);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// updating one
router.patch("/:id", getSubscriber, async (req, res) => {
  if (req.body.name !== null) {
    res.subscriber.name = req.body.name;
  }
  if (req.body.subscribedToChannel !== null) {
    res.subscriber.subscribedToChannel = req.body.subscribedToChannel;
  }
  try {
    const updatedSubscriber = await Subscriber.findOneAndUpdate(
      { _id: res.subscriber.id },
      res.subscriber
    );
    res.json(updatedSubscriber);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Deleting one
router.delete("/:id", getSubscriber, async (req, res) => {
  try {
    await Subscriber.deleteOne({ _id: res.subscriber.id });
    res.json({ message: "Deleted the subscriber" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

async function getSubscriber(req, res, next) {
  let subscriber;
  try {
    subscriber = await Subscriber.findById(req.params.id);
    if (subscriber === null) {
      return res.status(404).json({ message: "Subscriber not found" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }

  res.subscriber = subscriber;
  next();
}

module.exports = router;
