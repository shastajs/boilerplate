import crypto from 'crypto'

export default (str) =>
  crypto.createHash('md5').update(str).digest('hex')
