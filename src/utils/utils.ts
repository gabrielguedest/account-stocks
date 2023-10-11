import * as crypto from 'crypto';

export async function hashPassword(password: string, pwdSalt?: string) {
  const salt = pwdSalt || crypto.randomBytes(12).toString('base64');
  const pwdHash = crypto
    .pbkdf2Sync(password, salt, 10, 100, 'sha512')
    .toString('base64');
  return { salt, pwdHash };
}
