const express = require('express');
const cors = require('cors');

const config = {
    name: 'sample-express-app',
    port: 3000,
    host: '0.0.0.0',
};

const PORT = process.env.port || config.port;

const app = express();

app.use(cors());

app.get('/', (req, res) => {
    res.status(200).send('hello world');
});



app.listen(PORT, config.host, (e)=> {
    if(e) {
        throw new Error('Internal Server Error');
    }
    console.log(`Express is running on port ${PORT}`)
});