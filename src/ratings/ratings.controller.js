const ratings = require('../data/ratings-data');
function ratingExists(req, res, next) {
  const ratingFound = ratings.filter(
    (rating) => rating.id === Number(req.params.ratingId)
  );
  if (!ratingFound.length) {
    return next({
      status: 404,
      message: `${req.params.ratingId}`,
    });
  }
  res.locals.rating = ratingFound;
  next();
}
function read(req, res, next) {
  res.json({
    data: res.locals.rating[0],
  });
}
function list(req, res) {
  let results = [...ratings];
  if (res.locals.note) {
    results = results.filter((rating) => rating.noteId === res.locals.note.id);
  }
  res.json({ data: results });
}
module.exports = {
  list,
  read: [ratingExists, read],
  ratingExists,
};