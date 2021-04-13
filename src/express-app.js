const express = require('express');

const mattermostAppMiddleware = require('./middleware/mattermost-app/mattermost-app-middleware');

const LocalizationService = require('./services/localization/localization-service');

const manifestRouter = require('./routes/manifest/manifest');
const bindingsRouter = require('./routes/bindings/bindings');

const app = express();
app.use(express.json());

module.exports.initApp = (dependencies) => {
    if (dependencies.logger) {
        app.use(dependencies.logger);
    }

    app.use((req, res, next) => {
        req.dependencies = dependencies;
        req.services = {
            i18n: new LocalizationService('en'),
        };
        next();
    });

    app.use(mattermostAppMiddleware);

    app.use('/manifest', manifestRouter);
    app.use('/bindings', bindingsRouter);

    return app;
}
