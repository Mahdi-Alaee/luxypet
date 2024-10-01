import { model, models, Schema } from "mongoose";

const ProductSchema = new Schema(
  {
    title: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
    video: { type: String, required: true },
    birthDate: { type: String, required: true },
    father: { type: String, required: true },
    mather: { type: String, required: true },
    sex: { type: String, required: true },
    code: { type: String, required: true },
    breed: { type: String, required: true }
  },
  { timestamps: true }
);

export const ProductModel = models.product || model("product", ProductSchema);
