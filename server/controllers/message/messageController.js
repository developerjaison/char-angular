const jwt = require('jsonwebtoken');
const mongooseObjectId = require('mongoose').Types.ObjectId;
const MessageSchema = require('../../models/message/message');
const UserSchema = require('../../models/user/user');

const MessageController = {
    all: async (req, res) => {
        const token = getToken(req.headers['x-access-token']);
        if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });
        jwt.verify(token, 'my secret', function (err, decoded) {
            if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
            const allMessage = MessageSchema.find();
            res.json(allMessage);
        });
    },
    find: async (req, res) => {
        const token = getToken(req.headers['x-access-token']);
        if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });
        jwt.verify(token, 'my secret', function (err, decoded) {
            if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
            const foundMessage = MessageSchema.find({ email: req.params.email });
            res.json(foundMessage);
        });
    },
    findByUser: async (req, res) => {
        try {
            const token = getToken(req.headers['x-access-token']);
            if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });
            const tokenobj = await jwt.verify(token, 'my secret');
            if (tokenobj && tokenobj._id) {
                const foundMessage = await MessageSchema.find({ user: new mongooseObjectId(tokenobj._id)},'name message createdAt updatedAt',{lean: true}); 
                const responseObj = {

                }
                res.send(foundMessage);
            } else {
                res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
            }
        } catch (error) {
            res.status(500).send(error);
        }
    },
    create: async (req, res, next) => {
        try {
            const token = getToken(req.headers['x-access-token']);
            if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });
            jwt.verify(token, 'my secret', function (err, decoded) {
                if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
                const message = req.body;
                message.user = new mongooseObjectId(decoded._id);
                message.name = decoded.name;
                const newMessage = new MessageSchema(message);
                const savedMessage = newMessage.save();
                res.json(savedMessage);
            });
        } catch (error) {
            res.status(500).send(error);
        }
    },
    getAllMessages: async (req, res) => {
        const token = getToken(req.headers['x-access-token']);
        if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });
        jwt.verify(token, 'my secret', function (err, decoded) {
            if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
            const foundMessage = MessageSchema.find({ id: req.params.id }).populate('User');
            res.json(foundMessage);
        });
    },
}
function getToken(tokeHeader) {
    const token = tokeHeader.replace('CHAT ', '');
    return token;
}

module.exports = MessageController;