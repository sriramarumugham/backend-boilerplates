"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkRoutesAndBypass = void 0;
exports.generateSchemaDescription = generateSchemaDescription;
const checkRoutesAndBypass = (routesArray, method, url) => {
    let newUrl = url.endsWith('/') ? url.substring(0, url.length) : url;
    let res = routesArray &&
        routesArray?.some((val) => {
            return (val?.method === method &&
                val?.url?.toLowerCase() === newUrl?.toLowerCase());
        });
    return res;
};
exports.checkRoutesAndBypass = checkRoutesAndBypass;
function generateSchemaDescription(schema) {
    if (schema.type === 'object' && schema.properties) {
        return Object.entries(schema.properties)
            .map(([key, value]) => `${key}: { ${generateSchemaDescription(value)} }`)
            .join('\n');
    }
    if (schema.type === 'array' && schema.items) {
        return `Array of ${generateSchemaDescription(schema.items)}`;
    }
    if (schema.type === 'string') {
        return 'string';
    }
    if (schema.type === 'number') {
        return 'number';
    }
    if (schema.type === 'boolean') {
        return 'boolean';
    }
    if (schema.enum) {
        return `enum(${schema.enum.join(', ')})`;
    }
    if (schema.type === 'any') {
        return 'any';
    }
    return 'unknown';
}
