module.exports = function(mongoose) {

    var RoleSchema = new mongoose.Schema({
        name:  { type: String, unique: true, required: true},
        permissions: []
    });

    Role = mongoose.model('Role', RoleSchema);

    return {
        Role: Role
    };
}