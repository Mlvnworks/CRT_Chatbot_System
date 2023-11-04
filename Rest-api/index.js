const { PORT } = require('./config');
const express = require('express');
const Ai = require('./modules/AI');

// Initilize ezpress app
const app = express();
// Initilize AI class
const ai = new Ai();

// Parse Json Body from POST request
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Catch User's query and send it to API and return the ai response
app.post('/api/ai/ask', async (req, res) => {
    const { query } = req.body;
    try {
        const response = await ai.query(query);
        res.status(200);
        res.json({
            err: false,
            errMsg: null,
            data: response,
        });
    } catch (err) {
        res.status(404);
        res.json({
            err: true,
            errMsg: err.message,
            data: null,
        });
    }
});

app.get('/', (req, res) => {
    res.status(404);
    res.json({
        err: true,
        errMsg: 'Cannot find request!',
        data: null,
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
