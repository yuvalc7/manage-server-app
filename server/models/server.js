const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ServerType = new Schema({
  name: {
    type: String,
    default: "",
  },
  price: {
    type: Number,
    default: 0,
  },

  serverTypeIndex:{
      type:Number,
      default:-1
  }
});

const ServerTimer = new Schema({
  time: {
    type: Number,
    default: 0,
  },
  start: {
    type: Number,
    default: 0,
  },
});

const serverSchema = new Schema({
  server_name: {
    type: String,
    require: true,
  },
  ip_address: {
    type: String,
    require: true,
  },
  type: {
    type: ServerType,
  },
  isRunning: {
    type: Boolean,
    default: false,
  },
  timer: {
    type: ServerTimer,
  },
});

module.exports = mongoose.model("servers", serverSchema);
