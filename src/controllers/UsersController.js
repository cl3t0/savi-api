const mongoose = require('mongoose');

const Users = mongoose.model('Users');

module.exports = {
    async register(req, res) {

        const user = await Users.create(req.body);

        return res.json(user);
    },
    async login(req, res) {
        
        const email_try = req.query.email;
        const password_try = req.query.password;

        const can_login = await Users.find({ email: email_try, password: password_try, logged: 0});

        if (can_login.length) {
            res.send(true);
        } else {
            res.send(false);
        }
    }
};