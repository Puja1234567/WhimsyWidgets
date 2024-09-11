import express from "express";
import GiftController from "../controllers/Gift Galore/giftControllers.js";
import CartController from "../controllers/Gift Galore/cartController.js";
import WishlistController from '../controllers/Gift Galore/wishlistController.js'
import { uploadFile } from "../middlewares/fileUpload.js";

const giftRouter=express.Router();
const giftController =new GiftController();
const cartController=new CartController();
const wishlistController =new WishlistController();

giftRouter.post("/add",uploadFile.single('productImage'),(req,res)=>{giftController.addProduct(req,res)});
giftRouter.patch("/update",uploadFile.single('productImage'),(req,res)=>{giftController.updateProduct(req,res)});

//giftRouter.get("/price",(req,res)=>{giftController.getProductByCategoryAndPrice(req,res)});
giftRouter.get("/",(req,res)=>{giftController.getAllProduct(req,res)});

giftRouter.get("/filter/:categoryName",(req,res)=>{giftController.getProductByCategory(req,res)});
giftRouter.get("/filter-by-price",(req,res)=>{giftController.filterByPrice(req,res)})
giftRouter.get("/:id",(req,res)=>{giftController.getProductById(req,res)});
giftRouter.delete("/:id",(req,res)=>{giftController.deleteProduct(req,res)});

giftRouter.get("/wishlist/:userId",(req,res)=>{wishlistController.getWishlishtedProduct(req,res)});
giftRouter.post("/wishlist/add",(req,res)=>{wishlistController.addToWishlist(req,res)});
giftRouter.delete("/wishlist/remove",(req,res)=>{wishlistController.removeFromWishlist(req,res)});

giftRouter.get('/cart/:userId',(req,res)=>{cartController.getCartProduct(req,res)});
giftRouter.post('/cart/add',(req,res)=>{cartController.addToCart(req,res)});
giftRouter.delete('/cart/remove',(req,res)=>{cartController.removeFromCart(req,res)});



export default giftRouter;