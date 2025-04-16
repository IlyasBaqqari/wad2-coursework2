import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { organiserModel } from '../models/instances/instances.js';

export const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const organiser = await organiserModel.getByUsername(username);
    if (!organiser) {
      return res.redirect('/organiser/login?err=invalid');
    }
    const isValid = await bcrypt.compare(password, organiser.password);
    if (!isValid) {
      return res.redirect('/organiser/login?err=invalid');
    }

    const payload = { username: organiser.username };
    const token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET);
    res.cookie('jwt', token);
    next();
  } catch (err) {
    console.error('ERROR - auth > login(): ', err);
    res.status(500).send('[500] Internal server error');
  }
};

export const verify = (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    return res.redirect('/organiser/login');
  }

  try {
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    next();
  } catch (err) {
    return res.status(401).send('[401] Invalid token');
  }
};
