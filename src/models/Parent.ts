import { model, models, Schema } from "mongoose";

const ParentSchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    image: { type: String, required: true },
    body: { type: String, required: false },
  },
  { timestamps: true }
);

export const ParentModel = models.parent || model("parent", ParentSchema);
