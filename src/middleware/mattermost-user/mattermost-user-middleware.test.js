const supertest = require('supertest');

const {initApp} = require('../../express-app');

describe('Mattermost user middleware', () => {
    const appAuthHeader = {'mattermost-app-authorization': 'Bearer the_token.random'};
    let app;
    beforeEach(() => {
        app = initApp({
            config: {
                appAuthorizationToken: 'the_token',
            },
            logger: null,
        });
    });

    test('should bail if context is not present', async () => {
        await supertest(app).post('/bindings')
        .set(appAuthHeader)
        .expect(401)
        .then((response) => {
            expect(response.body.error).toEqual('Missing context in body');
        });
    });

    test('should bail if acting user id is not in the context', async () => {
        await supertest(app).post('/bindings')
        .set(appAuthHeader)
        .send({context: {}})
        .expect(401)
        .then((response) => {
            expect(response.body.error).toEqual('Missing acting user id in context');
        });
    });

    test('should pass if acting user id is in the context', async () => {
        await supertest(app).post('/bindings')
        .set(appAuthHeader)
        .send({context: {
            acting_user_id: 'some id',
        }})
        .expect(200);
    });
});
