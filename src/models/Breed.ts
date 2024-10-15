import { model, models, Schema } from "mongoose";

const BreedSchema = new Schema(
  {
    title: { type: String, required: true },
    image: { type: String, required: true },
    body: { type: String, required: false },
  },
  { timestamps: true }
);

export const BreedModel = models.breed || model("breed", BreedSchema);
