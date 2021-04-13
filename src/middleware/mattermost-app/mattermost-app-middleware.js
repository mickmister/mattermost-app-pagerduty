const {makeCallResponseError} = require('../../utils/call-response');

module.exports = (req, res, next) => {
    const authHeader = req.headers['mattermost-app-authorization'];
    if (!authHeader) {
        const message = req.services.i18n.t('middleware.missing_app_auth_header', 'Missing Mattermost app authorization header');

        res.status(401);
        res.json(makeCallResponseError(message));
        return;
    }

    const appToken = req.dependencies.config.appAuthorizationToken;
    const headerShortened = authHeader.substring(0, authHeader.indexOf('.'));

    if (headerShortened !== 'Bearer ' + appToken) {
        const message = req.services.i18n.t('middleware.invalid_app_auth_header', 'Invalid Mattermost app authorization token');

        res.status(401);
        res.json(makeCallResponseError(message));
        return;
    }

    next();
}
