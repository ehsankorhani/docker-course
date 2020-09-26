const express = require('express');
const cors = require('cors');
const app = express();
const redisClient = require('./redis/client');

// Enable All CORS Requests
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.post('/store', async (req, res) => {
    const key = Object.keys(req.body)[0];
    const value = req.body[key];
    await redisClient.setAsync(key, value);
    return res.send('Success');
});

app.get('/:key', async (req, res) => {
    const { key } = req.params;
    const rawData = await redisClient.getAsync(key);
    return res.send(rawData);
});

app.get('/', (req, res) => {
    res.status(200).send('Auto Showroom API!');
});

const PORT = process.env.port || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
});