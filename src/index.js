require('dotenv').config();

const {PORT} = require('./config/env');

const loggerMiddleware = require('./middleware/logger/logger-middleware');

const {initApp} = require('./express-app');

const appToken = process.env.MATTERMOST_APP_TOKEN;
const app = initApp({
    config: {
        appAuthorizationToken: appToken,
    },
    logger: loggerMiddleware,
});

app.listen(PORT, () => {
    console.log('Listening on ' + PORT);
    console.log('http://localhost:' + PORT);
});
