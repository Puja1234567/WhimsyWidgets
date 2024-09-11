
import mongoose from "mongoose";

export const wishlistSchema = new mongoose.Schema({
    giftId:{
        type:mongoose.Schema.Types.ObjectId, ref:'Gifts'
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId, ref:'User'
    },
    
}) 

const WishlistModel=mongoose.model('Wishlist',wishlistSchema);
export default WishlistModel;