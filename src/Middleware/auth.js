const jwtUtil = require('../utils/jwt.util.js');

module.exports = roles => async (req, res, next) => {
    let token = req.headers.authorization;
    if (token && token.startsWith('Bearer ')) {
        token = token.slice(7, token.length);
    }
    if (token) {
        try {
            token = token.trim();
            const decoded = await jwtUtil.verifyToken(token);
            req.user = decoded;
            req.token = token;
            if (!roles.includes(req.user.role) && req.user.role !== 'admin') {
                return res.status(403).json({ message: `Forbidden: only ${roles.join(', ')} can perform this action.` });
            }
            next();
        } catch (error) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
    } else {
        return res.status(400).json({ message: 'Authorization header is missing.' })
    }
}
