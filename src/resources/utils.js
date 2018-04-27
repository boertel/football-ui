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


export const proxy = (obj, state) => {
  const handler = {
    get: (target, key) => {
      const value = target[key];
      if (value !== null && typeof value === 'object') {
        const child = get(state, [value._type, value.id]);
        if (child) {
          return proxy(child, state);
        }
        return {}
      }
      return value;
    }
  }
  return new Proxy(obj, handler);
}
