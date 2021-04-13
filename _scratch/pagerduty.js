require('dotenv').config();

const {api} = require('@pagerduty/pdjs');

const pd = api({token: process.env.API_TOKEN});

setTimeout(async () => {
    const res = await pd.get('/incidents');
    console.log(res.data);
    process.exit(0);
});
