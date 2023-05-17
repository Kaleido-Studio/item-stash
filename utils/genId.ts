const generateId = () => {
  // use web crypto randomuuid
  const res = window.crypto.getRandomValues(new Uint32Array(1))[0];
  return res.toString(16);
};

export default generateId;
