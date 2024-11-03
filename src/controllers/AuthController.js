const jwt = require('jsonwebtoken');

const dotenv = require('dotenv');

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

const authenticate = async (req, res) => {
    const clientKey = req.headers['client-key'];
    const clientPassword = req.headers['client-password'];

    try {
        if(clientKey !== process.env.CLIENT_KEY || clientPassword !== process.env.CLIENT_PASSWORD){
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        const payload = { user:clientKey };
        const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ message:'Success',token: token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    authenticate
};