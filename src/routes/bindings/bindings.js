const express = require('express');
const router = new express.Router();

const userMiddleware = require('../../middleware/mattermost-user/mattermost-user-middleware');

const bindings = [
    {
        location: '/channel_header',
        bindings: [
            {
                location: 'dothething',
                label: 'Do the thing',
                call: {
                    path: '/dothething',
                },
            },
        ],
    },
]

router.use(userMiddleware);

router.post('/', (req, res) => {
    const callResponse = {
        type: 'ok',
        data: bindings,
    }
    res.json(callResponse);
});

module.exports = router;
