// Restricts file-system access to the content folders the system is configured to serve:
// the bundled data directory plus every network path assigned to a user.
// Requests for any other location (e.g. "../../etc/passwd") are rejected.
const path = require('path');
const auth = require('../auth');

const PROJECT_ROOT = path.resolve(__dirname, '../..');
const DATA_ROOT = path.join(PROJECT_ROOT, 'data');

function allowedRoots() {
    const roots = new Set([DATA_ROOT]);
    for (const user of auth.getAllUsers() || []) {
        for (const p of Object.values(user.networkPaths || {})) {
            if (typeof p === 'string' && p.trim()) {
                roots.add(path.resolve(PROJECT_ROOT, p));
            }
        }
    }
    return [...roots];
}

function resolveSafePath(requested) {
    if (typeof requested !== 'string' || !requested.trim()) {
        throw Object.assign(new Error('Path is required'), { status: 400 });
    }
    const resolved = path.resolve(PROJECT_ROOT, requested.replace(/^\/images\//, 'images/'));
    const ok = allowedRoots().some(root => resolved === root || resolved.startsWith(root + path.sep));
    if (!ok) {
        throw Object.assign(new Error('Access to this path is not allowed'), { status: 403 });
    }
    return resolved;
}

module.exports = { resolveSafePath };
