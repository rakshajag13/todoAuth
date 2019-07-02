var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var Schema = mongoose.Schema;
var authSchema = new Schema(
    {
        userId: {
            type: String,
            required: true,
            unique: true
        },

        password: {
            type: String,
            required: true
        }
    }
)


// authSchema.pre('save', function(next) {
//     var user = this;


//     bcrypt.genSalt(10, function(err, salt) {
//         if (err) return next(err);

//         // hash the password along with our new salt
//         bcrypt.hash(user.password, salt, function(err, hash) {
//             if (err) return next(err);

//             // override the cleartext password with the hashed one
//             user.password = hash;
//             next();
//         });
//     });
// });

authSchema.pre('save', function (next) {
    var authObj = this
    bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(authObj.password, salt, function (err, hash) {
            authObj.password = hash;

            next();
        });
    });

})
authSchema.methods.comparePwd= function (password, done) {
    bcrypt.compare(password, this.password, function (err, ismatch) {
        if (err) done(err);
        else
            done(ismatch)

    })


}




module.exports = mongoose.model('auth', authSchema);