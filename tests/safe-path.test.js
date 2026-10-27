const test = require('node:test');
const assert = require('node:assert/strict');
const path = require('path');
const { resolveSafePath } = require('../backend/utils/safe-path');

const ROOT = path.resolve(__dirname, '..');

test('allows files inside the data folder', () => {
    const resolved = resolveSafePath('data/content/demo-images/kpi/kpi1/kpi-card-1.png');
    assert.equal(resolved, path.join(ROOT, 'data/content/demo-images/kpi/kpi1/kpi-card-1.png'));
});

test('rejects absolute paths outside the content folders', () => {
    assert.throws(() => resolveSafePath('/etc/passwd'), { status: 403 });
});

test('rejects path traversal out of the data folder', () => {
    assert.throws(() => resolveSafePath('data/../../../etc/passwd'), { status: 403 });
});

test('rejects a sibling folder that only shares the prefix', () => {
    assert.throws(() => resolveSafePath('data-backup/secret.txt'), { status: 403 });
});

test('rejects empty input with 400', () => {
    assert.throws(() => resolveSafePath(''), { status: 400 });
    assert.throws(() => resolveSafePath(undefined), { status: 400 });
});
