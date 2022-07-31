import crypto from 'crypto';
export default class Crypto {
  algorithm: string;
  password: string;
  constructor() {
    this.algorithm = 'ase-256-ctr';
    this.password = 'd6F3Efe1';
  }
  encrypt(text: string) {
    const cipher = crypto.createCipher(this.algorithm, this.password);
    let crypted = cipher.update(text, 'utf8', 'hex');
    crypted += cipher.final('hex');
    return crypted;
  }
  decrypt(text: string) {
    const decipher = crypto.createDecipher(this.algorithm, this.password);
    let dec = decipher.update(text, 'hex', 'utf8');
    dec += decipher.final('utf8');
    return dec;
  }
}
