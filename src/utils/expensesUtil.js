function isUserIdMissing(req) {
  return !!(req.body && !req.body.userId);
}

function isAmountMissing(req) {
  return !!(req.body && !req.body.amount);
}

function isCategoryMissing(req) {
  return !!(req.body && !req.body.category);
}

function isDateMissing(req) {
  return !!(req.body && !req.body.date);
}

function isUserIdMissingFromParams(req) {
  return !!(req.params && !req.params.userId);
}

module.exports = {
  isUserIdMissing,
  isAmountMissing,
  isCategoryMissing,
  isDateMissing,
  isUserIdMissingFromParams
};
