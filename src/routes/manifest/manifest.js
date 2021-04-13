const express = require('express');
const router = new express.Router();

const config = require('../../config/env');

const manifest = require('./manifest.json');
manifest.root_url = 'http://localhost:' + config.PORT;

router.get('/', (req, res) => {
    res.json(manifest);
});

module.exports = router;
