const chai = require('chai');
const expect = chai.expect;
const sendRequest = require('../lib/sendRequest');
const getCharacters = require('../data/t1_getCharacters');
const env = require('../endpoint/test');

describe('Get characters by id', () => {

    getCharacters.map((data) => {
        let response, statusCode, body;
        
        let idStr = data.url.split('/')[2];
        let id = (idStr.split(',')).map(parseFloat);
        let numCharacters = id.length;

        describe(`character with id ${idStr}`, () => {
            before(async () => {
                data.uri = env.url + data.url;
                response = await sendRequest(data);
                body = response.body;
                statusCode = response.statusCode;
            });

            it('Verifying status Code', () => {
                expect(statusCode).to.eql(200);
            });

            it('Verifying returned type', () => {
                if (Array.isArray(body) ) {
                    expect(body).to.be.an('array');
                }else{
                    expect(body).to.be.an('object');
                }
            });

            it('Verifying Character properties', () => {
                let expectValue;
                if (Array.isArray(body) ) {
                    expectValue = body[0];
                }else{
                    expectValue = body;
                }
                expect(expectValue).to.have.all.keys(
                    "id",
                    "name",
                    "status",
                    "species",
                    "type",
                    "gender",
                    "origin",
                    "location",
                    "image",
                    "episode",
                    "url",
                    "created"
                );
            });

            it('Verifying Character id', () => {
                if (numCharacters != 1 ){
                    let bid = body.map(item => item.id)
                    expect(bid).to.eql(id);
                }else{
                    expect(body.id).to.eql(id[0]);
                }
            });

            it('Verifying Character name', () => {
                if (numCharacters != 1 ){
                    let bnames = body.map(item => item.name)
                    expect(bnames).to.eql(data.result.names);
                }else{
                    expect(body.name).to.eql(data.result.name);
                }
            });
        });
    });
});