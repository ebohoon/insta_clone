const jwt = require('jsonwebtoken');
const User = require('../schema/user');

module.exports = async (req, res, next) => {
  const { authorization } = req.headers;
  if (authorization === undefined) {
    return res.status(401).json({});
  }
  const [bearer, token] = authorization.split(' ');
  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const user = await User.findOne({
     userId: decoded.userId,
    });

    res.locals.user = user.id;

    console.log('해당 유저는?', res.locals.user);

    next();
  } catch (err) {
    console.error(err);
  }
};
