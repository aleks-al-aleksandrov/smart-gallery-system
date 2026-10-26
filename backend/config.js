// Loads runtime configuration.
// - data/config.json is created from config.example.json on first run (it is git-ignored).
// - Secrets come from environment variables, never from the repository.
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const ROOT = path.join(__dirname, '..');
const CONFIG_PATH = path.join(ROOT, 'data', 'config.json');
const EXAMPLE_PATH = path.join(ROOT, 'config.example.json');

if (!fs.existsSync(CONFIG_PATH)) {
    fs.mkdirSync(path.dirname(CONFIG_PATH), { recursive: true });
    fs.copyFileSync(EXAMPLE_PATH, CONFIG_PATH);
}

const config = JSON.parse(fs.readFileSync(CONFIG_PATH, 'utf8'));
config.server = config.server || {};

if (process.env.PORT) {
    config.server.port = Number(process.env.PORT);
}

const resolveSecret = (envName, current) => {
    if (process.env[envName]) return process.env[envName];
    if (current) return current;
    console.warn(`[config] ${envName} is not set - using a random secret for this run (sessions reset on restart).`);
    return crypto.randomBytes(32).toString('hex');
};

config.server.sessionSecret = resolveSecret('SESSION_SECRET', config.server.sessionSecret);
config.server.jwtSecret = resolveSecret('JWT_SECRET', config.server.jwtSecret);

module.exports = config;
