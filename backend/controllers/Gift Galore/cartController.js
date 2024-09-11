import CartModel from "../../models/Gift Galore/cart.js"

    export default class CartController{
        getCartProduct=async(req,res)=>{
            const userId=req.params.userId;
            try{
                const cartItems =await CartModel.find({userId}).populate('giftId');
                res.status(200).json(cartItems);
            }catch(error){
                console.log(error);
                res.status(500).send('Error fetching from cart');
            }
            
        }
        addToCart=async(req,res)=>{
            const {userId,giftId,quantity}=req.body;
            try{
                const qty = quantity !== undefined ? quantity : 1;
                let cartItem = await CartModel.findOne(
                    {userId,giftId},
                    {
                         $inc: { quantity: quantity || 1 }, // Increment quantity by the provided value or default to 1
                         $setOnInsert: { quantity: quantity || 1 } // Set quantity to 1 if the document is being inserted
                    },
                    {new:true, upsert:true}
                );
                res.status(201).send('Gift added/updated in cart',cartItem);
            }catch(error){
                console.log(error);
                res.status(500).send('error adding/updating in cart');
            }
        
        }
        removeFromCart=async(req,res)=>{
            const {userId,giftId}=req.body;
            try{
                await CartModel.findOneAndDelete({userId,giftId});
                res.status(200).send('Removed from cart');
            }catch(error){
                console.log(error);
                res.status(500).send('Error removing from cart');
            }
        }


    }

