import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
    gift: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Gift'
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    rating: { type: Number, min: 1, max: 5 } // Ensure rating is between 1 and 5
});

const ReviewModel = mongoose.model('Review', reviewSchema);
export default ReviewModel;
