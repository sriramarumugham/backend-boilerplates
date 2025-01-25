import { FastifyRequest } from 'fastify';
import jwt from 'jsonwebtoken'

export const signToken = (userId: string): string => {
  const token = jwt.sign({ userId: userId }, process.env.SECRET_KEY!, {
    expiresIn: '24h',
  });
  return token;
};

export const verifyToken = (token: string) => {
  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY!);
    return decoded;
  } catch (error) {
    throw new Error('Invalid token');
  }
};

export const getUserIdFromRequestHeader = (
  req: FastifyRequest,
): { userId: string } => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new Error('Authorization header missing');
  }
  const token = authHeader?.split(' ')[1] ?? authHeader?.split(' ')[0]; 
  const decodedToken = verifyToken(token);
  return decodedToken as { userId: string };
};
