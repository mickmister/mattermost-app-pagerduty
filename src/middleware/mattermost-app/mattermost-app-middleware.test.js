const supertest = require('supertest');

const {initApp} = require('../../express-app');

describe('Mattermost app middleware', () => {
    let app;
    beforeEach(() => {
        app = initApp({
            config: {
                appAuthorizationToken: 'the_token',
            },
            logger: null,
        });
    });

    test('should bail if authorization header isnt present', async () => {
        await supertest(app).get('/manifest')
        .expect(401)
        .then((response) => {
            expect(response.body.error).toEqual('Missing Mattermost app authorization header');
        });
    });

    test('should bail if authorization header has the wrong token', async () => {
        await supertest(app).get('/manifest')
        .set('mattermost-app-authorization', 'Bearer wrong_token.random')
        .expect(401)
        .then((response) => {
            expect(response.body.error).toEqual('Invalid Mattermost app authorization token');
        });
    });

    test('should pass if authorization header has the correct token', async () => {
        await supertest(app).get('/manifest')
        .set('mattermost-app-authorization', 'Bearer the_token.random')
        .expect(200);
    });
});
