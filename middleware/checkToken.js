 const jwt = require("jsonwebtoken")
 const checkToken = (req, res, next) => {

    let token = req.get("token")
    jwt.verify(token, "secret", (err, decoded) => {
        if (err) {
            return res.status(401).json({ error })
        }

        next()
    })
}

module.exports = {
    checkToken
}