import mongoose from "mongoose";

const petSchema = new mongoose.Schema({
  name: String,
  species: String,
  age: Number
});

export default mongoose.model("Pet", petSchema);