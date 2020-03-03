const chai = require('chai');
const chaiQuantifiers = require('chai-quantifiers');
const sendRequest = require('../lib/sendRequest');
const filterEpisodes = require('../data/t3_filterEpisodes');
const env = require('../endpoint/test');
const expect = chai.expect;
chai.use(chaiQuantifiers);

describe('Filter of Episodes', () => {

    filterEpisodes.map((data) => {
        let response, body;

        before(async () => {
            data.uri = env.url + data.url;
            response = await sendRequest(data);
            body = response.body;
        });

        it('Verifying episodes result', () => {
            expect(body.results).to.be.an('array');
        });

        it('Verifying count episodes', () => {
            expect(body.info.count).to.eql(data.result.count);
        });

        it('Verifying property "id"', () => {
            let bid = body.results.map(item => item.id);
            expect(bid).to.eql(data.result.ids);
        });

        it('Verifying property "name"', () => {
            let bname = body.results.map(item => item.name);
            expect(bname).to.eql(data.result.names);
        });
    })
});