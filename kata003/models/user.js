module.exports = function(mongoose) {

    var UserSchema = new mongoose.Schema({
        email:  { type: String, unique: true, required: true},
        password: { type: String, unique: false, required: true},
        firstName: { type: String, unique: false, required: true},
        lastName: { type: String, unique: false, required: true},
        locked: { type: Boolean},
        customers : [{ type: mongoose.Schema.Types.ObjectId, ref: 'Customer' }],
        roles: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Role' }]
    });

    User = mongoose.model('User', UserSchema);

    return {
        User: User
    };
}