export function sortObjectKeys(obj) {
  if (Array.isArray(obj)) {
    return obj.map(sortObjectKeys);
  }

  if (obj !== null && typeof obj === 'object') {
    return Object.keys(obj)
      .sort()
      .reduce((acc, key) => {
        acc[key] = sortObjectKeys(obj[key]);
        return acc;
      }, {});
  }

  return obj;
}

export function formatJsonValue(value, options = {}) {
  const {
    indent = 2,
    minify = false,
  } = options;

  if (minify) {
    return JSON.stringify(value);
  }

  return JSON.stringify(value, null, indent);
}

export function formatYamlValue(YAML, value, options = {}) {
  const {
    indent = 2,
    minify = false,
    sortKeys = false,
  } = options;

  const normalized = sortKeys ? sortObjectKeys(value) : value;

  const yamlOptions = {
    indent: typeof indent === 'number' ? indent : 2,
    lineWidth: 0,
  };

  const formatted = minify
    ? YAML.stringify(normalized, yamlOptions)
    : YAML.stringify(normalized, yamlOptions);

  if (typeof indent === 'string' && indent === '\t') {
    return formatted.replace(/^((?: {2})+)/gm, (match) => '\t'.repeat(Math.floor(match.length / 2)));
  }

  return formatted;
}
