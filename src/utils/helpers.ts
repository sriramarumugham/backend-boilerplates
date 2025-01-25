import { Type } from '@sinclair/typebox';


export interface IRouteTypes {
  method: String;
  url: String;
}
const checkRoutesAndBypass = (
  routesArray: [IRouteTypes],
  method: string,
  url: string,
): any => {
  let newUrl = url.endsWith('/') ? url.substring(0, url.length) : url;
  let res =
    routesArray &&
    routesArray?.some((val: any) => {
      return (
        val?.method === method &&
        val?.url?.toLowerCase() === newUrl?.toLowerCase()
      );
    });
  return res;
};

export { checkRoutesAndBypass };



export function generateSchemaDescription(schema: any): string {
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

