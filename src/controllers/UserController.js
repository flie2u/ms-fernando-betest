const User = require('../entities/User');

const createUser = async (req, res) => {
    const { userName, accountNumber, emailAddress, identityNumber } = req.body;
    try {
        const user = new User({ userName, accountNumber, emailAddress, identityNumber });
        await user.save();
        res.status(201).json({ message: 'User created successfully', user });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json({ message: 'User created successfully', user: users });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User found', user: user });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getUserByAccountNumber = async (req, res) => {
    try {
        const user = await User.findOne({ accountNumber: req.params.accountNumber });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User found', user: user });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getUserByIdentityNumber = async (req, res) => {
    try {
        const user = await User.findOne({ identityNumber: req.params.identityNumber });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User found', user: user });
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
        res.status(200).json({ message: 'User updated', user: user });
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
        res.status(204).json({ message: 'User deleted', user: user });
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
