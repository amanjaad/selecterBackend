import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const verifyToken = (request, response, next) => {
  const token =
    request.body.token || request.query.token || request.header("auth-token");

  if (!token) {
    return response.status(403).send("A token is required for authentication");
  }
  try {
    const verified = jwt.verify(token, process.env.TOKEN_KEY);
    request.user = verified;
  } catch (err) {
    return response.status(401).send("Access Was Denied By The Admin Due To Invalid Token");
  }
  return next();
};

export default verifyToken;