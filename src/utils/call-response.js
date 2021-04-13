module.exports.makeCallResponseError = (text = '') => {
    return {
        type: 'error',
        error: text,
    };
}
