const jwt = require('jsonwebtoken')


const authUser = (req, res, next) => {
    try {
        let decoded = jwt.verify(req.header('x-auth-token'), process.env.TOKEN_KEY)
        
        req.user = decoded
        
        next()
    }
    catch(err) {
        return res.status(400).send(err.message)
    }
}


module.exports = authUser