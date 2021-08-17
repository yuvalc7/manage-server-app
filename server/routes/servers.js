const Server = require("../models/server");
const express = require("express");
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { server_name, ip_address } = req.body.server;
    const server = await new Server(req.body.server).save();
    res.send(server);
  } catch (error) {
    res.send(error);
  }
});

router.get("/", async (req, res) => {
  try {
    const servers = await Server.find();
    res.send(servers);
  } catch (error) {
    res.send(error);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const server = await Server.findOneAndUpdate(
      { _id: req.params.id },
      req.body
    );
    res.send(server);
  } catch (error) {
    res.send(error);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const server = await Server.findByIdAndDelete(req.params.id);
    res.send(server);
  } catch (error) {
    res.send(error);
  }
});

module.exports = router;
