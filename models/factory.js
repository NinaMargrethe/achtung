var Factory = function(Schema,mongoose) {
    this.Schema = Schema;
    this.mongoose = mongoose;
    this.Item = null;

    this.createSchemas = function() {
        var UserSchema = new this.Schema({
            username: String,
            password: String,
            gamescores: [Number],
            apoints: Number //Total score equals the mean value of the last two games played
        });
        this.User = mongoose.model('User', UserSchema);
    };

};
module.exports = Factory;