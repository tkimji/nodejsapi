const jwt = require("jsonwebtoken");

const config = require('config');

const verifyToken = (req, res, next) => {
    try {

        // get token via get
        //  const token =
        // req.query.token || req.body.token || req.headers["accesstoken"];

        const token = req.headers["accesstoken"];
        // get token via post
        //  token = req.body.token;
        // post token via get
        //  token = req.headers["accesstoken"];

        if (!token) {
            return res.status(403).send("A token is required for authentication");
        }
        console.log(token)
        const decoded = jwt.verify(token, config.get('TOKEN_KEY'));
        req.user = decoded;
    } catch (err) {
        return res.status(401).send("Invalid Token");
    }
    return next();
};

module.exports = verifyToken;