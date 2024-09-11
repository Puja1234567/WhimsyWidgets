import WishlistModel from "../../models/Gift Galore/wishlist.js"
    export default  class WishlistController{
        getWishlishtedProduct=async(req,res)=>{
            const userId=req.params.userId;
            try{
                //if logged in then only
                const wishlistItems=await WishlistModel.find({userId}).populate('giftId');
                res.status(200).json(wishlistItems);
            }catch(error){
                console.log(error)
                res.status(500).send('Error fetching wishlist');
            }
        } 
        addToWishlist=async(req,res)=>{
            const {userId,giftId}=req.body;
            try{

                 const wishlistItem = new WishlistModel({userId,giftId});
                 await wishlistItem.save();
                 res.status(200).send("added to wishlist");
                }
                catch(error){
                    console.log(error);
                    res.status(500).send("error adding to wishlist");
                }
            }
        removeFromWishlist=async(req,res)=>{
            const {userId,giftId}=req.body;
            try{
                await WishlistModel.findOneAndDelete({userId,giftId});
                res.status(200).send('Gift removed from wishlist');
            }
            catch(error){
                console.log(error);
                res.status(500).send('error removing from wishlist');
            }
        }
    }