const TokenGenerator = require("../utils/token.generator")

class AuthMiddleware {

    static verifyToken(req, res, next) {
        try {
            const token = req.cookies?.token

            if(!token){
                res.status(400).json({
                    success: false,
                    message: "Login again.."
                })
                return
            }
            const verify = TokenGenerator.decodeToken(token)
            req.userid = verify.userId
            req.role = verify.role

            next()
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            })
        }
    }
}

module.exports = AuthMiddleware