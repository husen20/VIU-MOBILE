if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
const Redis = require('ioredis');

const redis = new Redis({
  port: 17022, // Redis port
  host: 'redis-17022.c1.ap-southeast-1-1.ec2.cloud.redislabs.com', // Redis host
  password: process.env.REDIS,
});

module.exports = redis;
