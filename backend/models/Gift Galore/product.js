import mongoose from "mongoose";

const giftSchema = new mongoose.Schema({
    productImage:{type:String},
    productName:{type:String},
    price:{type:Number}, 
    description:{type:String},
    productInfo:{type:String},
    sameDayDelivery:{type:Boolean},

    categories:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:'Categories'
        }
    ],
    reviews:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:'Reviews'
        }
    ],
   
    
},
 {timestamps: true}
);

var GiftModel = mongoose.model('Gifts',giftSchema);
export default GiftModel;




