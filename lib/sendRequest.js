const got = require('got');

async function sendRestRequestWithHeader(opts) {
    return got.get( opts.uri, {
        responseType: 'json',
        searchParams: opts.qs
    });
};

module.exports = sendRestRequestWithHeader;