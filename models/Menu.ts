import { Schema, model, models } from "mongoose";

const MenuItemSchema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  ingredients: { type: String, required: true },
  slug: { type: String, required: true },
});

export const MenuCategorySchema = new Schema({
  section: {
    type: String,
    required: true,
  },
  items: [MenuItemSchema],
});

const MenuSchema = new Schema({
  categories: [MenuCategorySchema],
});

const Menu = models.Menu || model("Menu", MenuSchema);
export default Menu;
