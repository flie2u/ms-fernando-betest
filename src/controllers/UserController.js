const User = require('../entities/User');
const redisClient = require('../config/RedisClient');
const dotenv = require('dotenv');

dotenv.config();

const createUser = async (req, res) => {
    const { userName, accountNumber, emailAddress, identityNumber } = req.body;
    try {
        const user = new User({ userName, accountNumber, emailAddress, identityNumber });
        await user.save();
        res.status(201).json({ message: 'User created successfully', user });

        await redisClient.del('redis_fernando_betest:users');
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getAllUsers = async (req, res) => {
    try {
        const cacheKey = 'redis_fernando_betest:users';
        const cachedUsers = await redisClient.get(cacheKey);
        
        if (cachedUsers) {
            return res.status(200).json({ message: 'Users retrieved from cache', users: JSON.parse(cachedUsers) });
        }

        const users = await User.find();
        await redisClient.set(cacheKey, JSON.stringify(users), 'EX', process.env.USER_CACHE_LIFETIME);
        res.status(200).json({ message: 'Users retrieved from database', users });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getUserById = async (req, res) => {
    try {
        const cacheKey = `redis_fernando_betest:user:${req.params.id}`;
        const cachedUser = await redisClient.get(cacheKey);
        
        if (cachedUser) {
            return res.status(200).json({ message: 'User found in cache', user: JSON.parse(cachedUser) });
        }

        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        await redisClient.set(cacheKey, JSON.stringify(user), 'EX', process.env.USER_CACHE_LIFETIME);
        res.status(200).json({ message: 'User found', user });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getUserByAccountNumber = async (req, res) => {
    try {
        const cacheKey = `redis_fernando_betest:user:account:${req.params.accountNumber}`;
        const cachedUser = await redisClient.get(cacheKey);
        
        if (cachedUser) {
            return res.status(200).json({ message: 'User found in cache', user: JSON.parse(cachedUser) });
        }

        const user = await User.findOne({ accountNumber: req.params.accountNumber });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        await redisClient.set(cacheKey, JSON.stringify(user), 'EX', process.env.USER_CACHE_LIFETIME);
        res.status(200).json({ message: 'User found', user });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getUserByIdentityNumber = async (req, res) => {
    try {
        const cacheKey = `redis_fernando_betest:user:identity:${req.params.identityNumber}`;
        const cachedUser = await redisClient.get(cacheKey);
        
        if (cachedUser) {
            return res.status(200).json({ message: 'User found in cache', user: JSON.parse(cachedUser) });
        }

        const user = await User.findOne({ identityNumber: req.params.identityNumber });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        await redisClient.set(cacheKey, JSON.stringify(user), 'EX', process.env.USER_CACHE_LIFETIME);
        res.status(200).json({ message: 'User found', user });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateUser = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        await redisClient.del(`redis_fernando_betest:user:${req.params.id}`);
        await redisClient.del(`redis_fernando_betest:user:account:${user.accountNumber}`);
        await redisClient.del(`redis_fernando_betest:user:identity:${user.identityNumber}`);

        res.status(200).json({ message: 'User updated', user });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        await redisClient.del(`redis_fernando_betest:user:${req.params.id}`);
        await redisClient.del(`redis_fernando_betest:user:account:${user.accountNumber}`);
        await redisClient.del(`redis_fernando_betest:user:identity:${user.identityNumber}`);

        res.status(204).json({ message: 'User deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createUser,
    getAllUsers,
    getUserById,
    getUserByAccountNumber,
    getUserByIdentityNumber,
    updateUser,
    deleteUser,
};
