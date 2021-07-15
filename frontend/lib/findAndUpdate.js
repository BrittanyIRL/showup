const findAndUpdate = (id, replacementObj) => (obj) => {
  if (obj.id === id) {
    obj = { ...obj, ...replacementObj };
  }
  return obj;
};

export { findAndUpdate };
