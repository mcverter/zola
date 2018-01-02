var jwt = require('jsonwebtoken');

const express = require('express'),
    router = express.Router();

const logins = [{email: 'test@zola.com', password: 'zola#frontend'}];

function checkLogin(email, password) {
    let idx;
    return (email && password &&
        ((idx = logins.findIndex(login=>login.email === email)) > -1) &&
        logins[idx].password === password)
}

router.post('/', function (req, res) {
    const {email, password} = req.body;

    if (checkLogin(email, password)) {
        res.status(200).json({auth_token:
                jwt.sign({email, password}, "foobar")});
    } else {
        res.status(401).json({error: 'bad login'});
    }
});

module.exports = router;