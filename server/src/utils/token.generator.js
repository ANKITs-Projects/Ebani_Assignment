const jwt = require('jsonwebtoken');

class TokenGenerator {
    static generateToke(data) {
        return jwt.sign(data, process.env.TOKEN_SECRET_KEY);
    }

    static decodeToken(token) {
        return jwt.verify(token, process.env.TOKEN_SECRET_KEY)
    } 
}

module.exports = TokenGenerator