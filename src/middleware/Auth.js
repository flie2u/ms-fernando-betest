const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

const authenticateToken = async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.sendStatus(401); 
    }

    const token = authHeader.split(' ')[1]; 

    jwt.verify(token, JWT_SECRET, async (err, decoded) => {
        if (err) {
            return res.sendStatus(403); 
        }

        if (!decoded.user) {
            return res.status(400).json({ message: 'Invalid token payload' });
        }

        next(); 
    });
};

module.exports = {
    authenticateToken
};