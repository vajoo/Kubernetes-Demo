import express from 'express';
import os from 'os';

const app = express();
const port = 3000;

app.get('/', (req, res) => {
    const helloMessage = `Hello World from ${os.hostname()}`;
    console.log(helloMessage);
    res.send(helloMessage);
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});