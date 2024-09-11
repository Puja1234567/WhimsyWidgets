import mongoose from "mongoose";

export const categorySchema = new mongoose.Schema({
    name: { type: String, required: true },
    giftProduct:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:'Gifts'
        }
    ],
   
})
const CategoryModel = mongoose.model('Categories', categorySchema);
export default CategoryModel;