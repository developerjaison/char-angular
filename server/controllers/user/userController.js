const jwt = require('jsonwebtoken');
const UserSchema = require('../../models/user/user');

const UserController = {
    all: async (req, res) => {
        try {
            const allUsers = await UserSchema.find();
            res.json(allUsers);
        } catch (error) {
            res.status(500).send(error);
        }
    },
    find: async (req, res) => {
        try {
            const foundUser = await UserSchema.find({ email: req.params.email });
            res.json(foundUser);
        } catch (error) {
            res.status(500).send(error);
        }
    },
    create: async (req, res) => {
        try {
            const newUser = new UserSchema(req.body);
            const savedUser = await newUser.save();
            res.json(savedUser);
        } catch (error) {
            res.status(500).send(error);
        }
    },
    getAllMessages: async (req, res) => {
        try {
            const foundUser = await UserSchema.find({ id: req.params.id }).populate('Message');
            res.json(foundUser);
        } catch (error) {
            res.status(500).send(error);
        }
    },
    login: async (req, res) => {
        try {
            var user = await UserSchema.findOne({ username: req.body.username }).exec();
            if (!user) {
                return res.status(400).send({ message: "The username does not exist" });
            }
            user.comparePassword(req.body.password, (error, match) => {
                if (!match) {
                    return res.status(400).send({ message: "The password is invalid" });
                }
            });
            // if user is found and password is right create a token
            var token = jwt.sign(user.toJSON(), 'my secret', { expiresIn: '30m' });
            // return the information including token as JSON
            res.json({success: true, token: 'CHAT ' + token});
            // res.send({ message: "The username and password combination is correct!" });
        } catch (error) {
            console.log(error)
            res.status(500).send(error);
        }
    }
}

module.exports = UserController;