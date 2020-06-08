const mongoose = require('mongoose');
const Bcrypt = require("bcryptjs");

const User = new mongoose.Schema({
    name: {
        type: String,
        required: '{PATH} is required!'
    },
    email: {
        type: String,
        required: '{PATH} is required!'
    },
    password: {
        type: String,
        required: '{PATH} is required!'
    },
    messages: [
        { type: mongoose.Schema.Types.ObjectId, ref: 'Message' }
    ]
}, {
    timestamps: true
});

User.pre("save", function (next, done) {
    if (!this.isModified("password")) {
        return next();
    }
    this.password = Bcrypt.hashSync(this.password, 10);
    next();
});

User.methods.comparePassword = function (plaintext, callback) {
    return callback(null, Bcrypt.compareSync(plaintext, this.password));
};

// User.methods.checkDuplicatEmail = (req, res, next) => {

//     });
//   };

module.exports = mongoose.model('User', User);