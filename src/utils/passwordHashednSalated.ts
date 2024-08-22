import { createHmac } from 'crypto';
import dotenv from 'dotenv';

function hashString(data: string) {
  dotenv.config();
  const SALT: any | string = process?.env.SALT;
  const hash = createHmac('sha256', SALT); // You can use 'sha256' or any other hashing algorithm
  hash.update(data);
  const hashedString = hash.digest('hex');
  return hashedString;
}

export { hashString };
