const express = require('express');

const db = require('./data/db');
const server = express();

server.use(express.json());

server.get('/', (req, res) => {
    res.send('Hello World');
});

server.get('/hubs', (req, res) => {
    db.hubs
        .find()
        .then(hubs => { res.status(200).json(hubs) })
        .catch(err => {
            res.json({
                error: err,
                message: 'Unable to get /hubs'
            })
        })
});

server.post('/hubs', (req, res) => {
    const hubInformation = req.body;
    console.log('request body: ', hubInformation)

    db.hubs
        .add(hubInformation)
        .then(hub => { res.status(201).json(hub) })
        .catch(err => {
            res.status(500).json({
                error: err,
                message: 'Unable to add hubInformation'
            })
        })
});

server.delete('/hubs:id', (req, res) => {
    const hubId = req.params.id;

    db.hubs
        .remove(hubId)
        .then(deleted => {
            res.status(204).end();
        })
        .catch(err => {
            res.status(500).json({ error: err, message: 'Error deleting the hub' })
        })
});

server.listen(5000, () => {
    console.log('\n Server running on localhost:5000 \n');
});