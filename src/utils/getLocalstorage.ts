const getLocalstorage = <T>(key: string, fallback: T) => {
  const value = localStorage.getItem(key);
  if (value) {
    try {
      return JSON.parse(value);
    } catch (e) {
      return fallback;
    }
  }
  return fallback;
};

export default getLocalstorage;
