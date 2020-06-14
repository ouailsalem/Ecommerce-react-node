const jwt = require('jsonwebtoken')
require('dotenv').config()
module.exports = (req, res, next) => {
    const token = req.header('x-auth-token');

    if (!token) {
        return res.status(401).json({ message: 'No token, not authorized' })
    }
    //
    else {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SEC)
            req.user = decoded.user
            next();
        } catch (err) {
            res.status(401).json({ msg: 'token is not valid' })
        }
    }
}