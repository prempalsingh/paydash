'use strict';

const Mailer = require('../../lib/mailer');
const Code = require('code');
const Config = require('../../config/config');
const Hapi = require('hapi');
const Lab = require('lab');

const lab = (exports.lab = Lab.script());
let request;
let server;

lab.beforeEach(done => {
    const plugins = [
        {
            register: Mailer,
            options: Config.get('/mailer')
        }
    ];
    server = new Hapi.Server();
    server.connection({ port: Config.get('/port/web') });
    server.register(plugins, err => {
        Code.expect(err).to.not.exist();
        done();
    });
});
