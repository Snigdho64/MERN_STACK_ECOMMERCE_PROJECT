module.exports = (asynFunc) => (req, res, next) => {
  Promise.resolve(asynFunc(req, res, next)).catch(next);
};
