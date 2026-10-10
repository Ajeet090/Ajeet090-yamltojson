import test from 'node:test';
import assert from 'node:assert/strict';
import { formatJsonValue, formatYamlValue, sortObjectKeys } from './converter.js';
import YAML from 'yaml';

test('sortObjectKeys sorts nested object keys recursively', () => {
  const input = {
    z: 1,
    a: {
      zeta: true,
      alpha: [3, 1, 2],
    },
  };

  assert.deepEqual(sortObjectKeys(input), {
    a: {
      alpha: [3, 1, 2],
      zeta: true,
    },
    z: 1,
  });
});

test('formatJsonValue preserves indentation when pretty printing', () => {
  const value = { name: 'demo', enabled: true };

  assert.equal(formatJsonValue(value, { indent: 2 }), '{\n  "name": "demo",\n  "enabled": true\n}');
});

test('formatJsonValue minifies JSON output', () => {
  const value = { name: 'demo', enabled: true };

  assert.equal(formatJsonValue(value, { minify: true }), '{"name":"demo","enabled":true}');
});

test('formatYamlValue produces valid YAML with chosen indent', () => {
  const value = { name: 'demo', nested: { enabled: true } };

  assert.equal(
    formatYamlValue(YAML, value, { indent: 2 }),
    'name: demo\nnested:\n  enabled: true\n',
  );
});
