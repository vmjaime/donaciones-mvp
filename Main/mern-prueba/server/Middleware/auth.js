import jwt from 'jsonwebtoken';

export const auth = (req, res, next) => {
  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : null;
  if (!token) return res.status(401).json({ error: 'No token' });
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = payload; // { id, email, name }
    next();
  } catch (e) {
    res.status(401).json({ error: 'Token inválido' });
  }
};
