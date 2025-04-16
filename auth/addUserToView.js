import jwt from 'jsonwebtoken';

export const addUserToView = (req, res, next) => {
  const token = req.cookies.jwt;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      res.locals.user = decoded.username || 'organiser';
    } catch (err) {
      console.error('ERROR - addUserToView > addUserToView(): ', err);
      res.clearCookie('jwt');
    }
  }

  next();
};
