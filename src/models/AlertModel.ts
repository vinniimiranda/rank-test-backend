import mongoose from "mongoose";

const AlertSchema = new mongoose.Schema({
  keyword: String,
  interval: Number,
  created_at: {
    type: Date,
    default: Date.now
  },
  deleted_at: {
    type: Date,
    default: Date.now
  }
});

const AlertModel = mongoose.model("Alert", AlertSchema);

export default AlertModel;
