module.exports = function (mongoose) {

    var RatingSchema = new mongoose.Schema({
        createdAt: { type: Date, default: Date.now },
        c: { type: Number, unique: false, required: true },
        d: { type: Number, unique: false, required: true },
        o: { type: Number, unique: false, required: true },
        r: { type: Number, unique: false, required: true }
    });
    
    Rating = mongoose.model('Rating', RatingSchema);

    return {
        Rating: Rating
    };
}