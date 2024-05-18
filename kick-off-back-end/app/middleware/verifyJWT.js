const jwt = require('jsonwebtoken');

const verifyJWT = (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization;

    if (!authHeader?.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const token = authHeader.split(' ')[1];

    jwt.verify(
        token,
        process.env.TOKEN_KEY,
        (err, decoded) => {
            if (err) return res.status(403).json({ message: 'Forbidden' });

            // Check if 'id' property exists in the decoded JWT payload
            if (!decoded.id) {
                return res.status(403).json({ message: 'Forbidden: No user ID found in token' });
            }

            // Attach the decoded JWT payload to the request object
            req.user = decoded;

            next();
        }
    );
};

module.exports = verifyJWT;
