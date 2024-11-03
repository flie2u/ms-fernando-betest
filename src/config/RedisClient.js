// src/config/redisClient.js
const { createClient } = require('redis');

const dotenv = require('dotenv');

dotenv.config();

const redisClient = createClient({
    url: process.env.REDIS_URI
});

(async () => {
    try {
        await redisClient.connect();
        console.log('Connected to Redis');
    } catch (error) {
        console.error('Redis connection error:', error);
    }
})();

// Handle connection errors
redisClient.on('error', (err) => console.error('Redis error:', err));

// Export the client for use in other modules
module.exports = redisClient;