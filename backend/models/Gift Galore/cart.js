
import mongoose from "mongoose";

export const cartSchema = new mongoose.Schema({
    giftId:{
        type:mongoose.Schema.Types.ObjectId, ref:'Gifts'
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId, ref:'User'
    },
    quantity:{type:Number,default:1,min:1},

})

const CartModel=mongoose.model('Cart',cartSchema);
export default CartModel;