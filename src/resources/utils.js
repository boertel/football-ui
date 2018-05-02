import { mapValues, get } from 'lodash'

export const createProxify = (mapping) => {
  return (obj) => {
    const proxified = mapValues(mapping, (dest, src) => {
      let id = get(obj, src);
      if (typeof id === 'object' && id !== null) {
        id = id.id;
      }
      return {
        id,
        _type: dest,
      }
    });
    return {
      ...obj,
      ...proxified,
    }
  };
};


export const proxy = (obj, state, exclude=[]) => {
  const handler = {
    get: (target, key) => {
      const value = target[key];
      if (value !== null && typeof value === 'object') {
        const child = get(state, [value._type, value.id]);
        if (child) {
          if (exclude.indexOf(key) === -1) {
            return proxy(child, state);
          } else {
            return child;
          }
        }
        return {}
      }
      return value;
    }
  }
  return new Proxy(obj, handler);
}
