const jwt = require('jsonwebtoken');
const config = require('../config');

const JWT_SECRET = config.server.jwtSecret;
const JWT_EXPIRES_IN = config.server.jwtExpiresIn || '7d';
const JWT_REFRESH_EXPIRES_IN = config.server.jwtRefreshExpiresIn || '30d';

function generateToken(user) {
    const payload = {
        userId: user.id,
        username: user.username,
        role: user.role
    };

    return jwt.sign(payload, JWT_SECRET, {
        expiresIn: JWT_EXPIRES_IN,
        issuer: 'smart-gallery-system',
        audience: 'smart-gallery-system'
    });
}

function generateRefreshToken(user) {
    const payload = {
        userId: user.id,
        type: 'refresh'
    };

    return jwt.sign(payload, JWT_SECRET, {
        expiresIn: JWT_REFRESH_EXPIRES_IN,
        issuer: 'smart-gallery-system',
        audience: 'smart-gallery-system'
    });
}

function verifyToken(token) {
    try {
        return jwt.verify(token, JWT_SECRET, {
            issuer: 'smart-gallery-system',
            audience: 'smart-gallery-system'
        });
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            throw new Error('Token expired');
        } else if (error.name === 'JsonWebTokenError') {
            throw new Error('Invalid token');
        }
        throw error;
    }
}

function decodeToken(token) {
    try {
        return jwt.decode(token);
    } catch (error) {
        return null;
    }
}

module.exports = {
    generateToken,
    generateRefreshToken,
    verifyToken,
    decodeToken,
    JWT_SECRET,
    JWT_EXPIRES_IN,
    JWT_REFRESH_EXPIRES_IN
};


