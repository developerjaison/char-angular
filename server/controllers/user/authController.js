const jwt = require('jsonwebtoken');
const UserSchema = require('../../models/user/user');

const Auth = {
    login: async (req, res) => {
        User.findOne({
          email: req.body.email
        }, (err, user) => {
          if (err) throw err;
       
          if (!user) {
            res.status(401).send({success: false, msg: 'Authentication failed. User not found.'});
          } else {
            // check if password matches
            user.comparePassword(req.body.password,  (err, isMatch) => {
              if (isMatch && !err) {
                // if user is found and password is right create a token
                var token = jwt.sign(user.toJSON(), config.secret,{ expiresIn: '30m' });
                // return the information including token as JSON
                res.json({success: true, token: 'JWT ' + token});
              } else {
                res.status(401).send({success: false, msg: 'Authentication failed. Wrong password.'});
              }
            });
          }
        });
    }
}