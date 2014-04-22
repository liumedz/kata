module.exports = function (mongoose) {

    var CustomerSchema = new mongoose.Schema({

        c: { type: Number, unique: true, required: true },
        name: { type: String, unique: true, required: true },
        code: { type: String, unique: true, required: true },
        address: { type: String, required: false },
        departments: [
            {
                d: { type: Number, unique: false, required: true },
                name: { type: String, unique: false, required: true },
                code: { type: String, unique: false, required: true },
                city: { type: String, unique: false, required: true },
                address: { type: String, required: false },
                objects: [
                    {
                        o: { type: Number, unique: false, required: true },
                        name: { type: String, unique: false, required: true },
                        ratingtypes: [{
                            r: { type: Number, required: true },
                            name: { type: String, required: true }
                        }]
                    }
                ]
            }
        ]
    });

    Customer = mongoose.model('Customer', CustomerSchema);

    return {
        Customer: Customer
    }
}