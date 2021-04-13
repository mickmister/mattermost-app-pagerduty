const {makeCallResponseError} = require('../../utils/call-response');

const MattermostUserService = require('../../services/mattermost-user/mattermost-user-service');

module.exports = (req, res, next) => {
    if (!req.body || !req.body.context) {
        const message = req.services.i18n.t('middleware.missing_context', 'Missing context in body');

        res.statusCode = 401;
        res.json(makeCallResponseError(message));
        return;
    }

    const context = req.body.context;
    if (!context.acting_user_id) {
        const message = req.services.i18n.t('middleware.missing_acting_user_id', 'Missing acting user id in context');

        res.statusCode = 401;
        res.json(makeCallResponseError(message));
        return;
    }

    if (!context.acting_user_id) {
        const message = req.services.i18n.t('middleware.missing_acting_user_id', 'Missing acting user id in context');

        res.statusCode = 401;
        res.json(makeCallResponseError(message));
        return;
    }

    req.services.user = new MattermostUserService(context.acting_user_token);
    next();
}
