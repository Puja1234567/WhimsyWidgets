import GiftModel from "../../models/Gift Galore/product.js";
import CategoryModel from "../../models/Gift Galore/category.js";
export default class GiftController{
    addProduct=async(req,res)=>{
        const{productName,price,categories=[],description,productInfo,sameDayDelivery}=req.body;
        const productImage=req.file ? req.file.filename : null; // Handle file being undefined
        try{
            let categoryIds=[];
            for(const categoryName of categories){
                let category=await CategoryModel.findOne({name:categoryName});
                if(!category){
                    category=new CategoryModel({name:categoryName});
                    await category.save();
                }
                categoryIds.push(category._id);
            }
            const newProduct=new GiftModel({productImage,productName,price,categories:categoryIds,description,productInfo,sameDayDelivery});
            await newProduct.save();
            // Update categories to include the new product
            await CategoryModel.updateMany(
                { _id: { $in: categoryIds } }, // Find categories by their IDs
                { $push: { giftProduct: newProduct._id } } // Add the new product ID to the giftProduct array
            );

            res.status(200).send("Product added successfully");
        }catch(error){
            console.log(error);
            res.status(500).send("Something Went Wrong in backend");
        }
    };
    updateProduct=async(req,res)=>{
        const productId=req.params.id;
        const {userId}=req.body;
        try{
            const product=await GiftModel.findById(productId);
            if(product.userId === userId){
                await product.updateOne({$set:req.body});
                res.status(200).send('Gift Product Updated');
            }else{
                res.status(403).send("Action Forbidden");
            }
        }catch(error){
            res.status(500).send("Server Error");
        }
    }
    getAllProduct=async(req,res)=>{
        try{
            const product = await GiftModel.find();
            res.status(200).json(product)
        }catch(error){
            res.status(500).send("Server Error")
        }
    }
    
    getProductByCategory=async(req,res)=>{
         try{
            const categoryName=req.params.categoryName;
            const category=await CategoryModel.findOne({name:categoryName}).populate('giftProduct');
            if(!category){
                return res.status(404).send("category not found");
            }
           res.status(200).json(category.giftProduct);
        }catch(err){
            console.log(err);
            res.status(500).send("Server Error idhr error h");
        } 
    }
    getProductById=async(req,res)=>{
        const productId=req.params.id;
        try{
            const product=await GiftModel.findById(productId);
            if(!product)res.status(404).send("Product Not Found");
            res.status(200).json(product);
        }catch(error){
            res.status(500).send("Server Error");
        }
    }
 filterByPrice=async(req,res)=>{
        const maxPrice=parseInt(req.query.maxPrice);
        try{
            const products = await GiftModel.find({ price: { $lte: maxPrice } });
            res.status(200).json(products);
        }catch(error){
             console.log("Error filtering products by price:", error);
             res.status(500).send("backend Server Error");
            }
    }

    deleteProduct=async(req,res)=>{
        const productId=req.params.id;
        const {userId}=req.body;
        try{
            const product=await GiftModel.findById(productId);
            if(product.userId === userId){
                await product.deleteOne();
                res.status(200).send('Gift Product Deleted');
            }else{
                res.status(403).send("Action Forbidden");
            }
        }catch(error){
            res.status(500).send("Server Error");
        }
    }

    // getProductByCategoryAndPrice=async(req,res)=>{
       
    //     const {categoryId,minPrice,maxPrice}=req.query;
        
    //   try{
    //      const product= await GiftModel.find({categories: {$in:[categoryId]},price:{$gte:minPrice, $lte:maxPrice}
    //     });
         
    //     if(product){
            
    //         res.status(200).send(product);
    //     }
    //     else{
    //         res.send("category not found");
    //     }

    //   }
    //    catch(error){
    //     console.log(error);
    //     res.status(500).send("error")
    //    }
    //  }
   
}