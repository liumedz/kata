module.exports = function (mongoose) {

    var RatingSchema = new mongoose.Schema({
        created: { type: Date, default: Date.now },
        c: { type: Number, unique: false, required: true },
        d: { type: Number, unique: false, required: true },
        o: { type: Number, unique: false, required: true },
        r: { type: Number, unique: false, required: true },
        comment: { type: String, unique: false, required: false },
        ip: { type: String, unique: false, required: false },
        fingerprint: { type: String, unique: false, required: false },
        rid: { type: String, unique: false, required: false },
        isImported: { type: Boolean, unique: false, required: false, default: false },
        clientInfo: {type: mongoose.Schema.Types.Mixed },
        disabled: { type: Boolean, unique: false, required: false, default: false }
    });
    
    Rating = mongoose.model('Rating', RatingSchema);

    return {
        Rating: Rating
    };
}