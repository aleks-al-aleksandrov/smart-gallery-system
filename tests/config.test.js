const test = require('node:test');
const assert = require('node:assert/strict');

const freshConfig = (env) => {
    const saved = { ...process.env };
    Object.assign(process.env, env);
    delete require.cache[require.resolve('../backend/config')];
    try {
        return require('../backend/config');
    } finally {
        process.env = saved;
    }
};

test('reads secrets and port from environment variables', () => {
    const config = freshConfig({ SESSION_SECRET: 'session-from-env', JWT_SECRET: 'jwt-from-env', PORT: '4321' });
    assert.equal(config.server.sessionSecret, 'session-from-env');
    assert.equal(config.server.jwtSecret, 'jwt-from-env');
    assert.equal(config.server.port, 4321);
});

test('never falls back to a hard-coded secret', () => {
    delete process.env.SESSION_SECRET;
    delete process.env.JWT_SECRET;
    const config = freshConfig({});
    assert.ok(config.server.jwtSecret.length >= 32, 'a random secret is generated');
    assert.doesNotMatch(config.server.jwtSecret, /change-in-production/);
});
