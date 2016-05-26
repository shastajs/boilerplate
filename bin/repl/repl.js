import repl, { Recoverable } from 'repl'
import vm from 'vm'
import { transform } from 'babel-core'
import pkg from '../../package'
import _debug from 'debug'
const debug = _debug('app:bin:repl')

debug(`Environment is set to: ${process.env.NODE_ENV || 'default'}`)

repl.start({
  prompt: `${pkg.name}> `,
  useGlobal: true,
  eval: evalCode,
  input: process.stdin,
  output: process.stdout
})

function evalCode(code, context, filename, cb) {
  let result
  try {
    result = vm.runInThisContext(transform(code).code)
  } catch (e) {
    if (isRecoverableError(e)) {
      return cb(new Recoverable(e))
    }
  }
  cb(null, result)
}

function isRecoverableError(error) {
  if (error.name === 'SyntaxError') {
    return /^(Unexpected end of input|Unexpected token)/.test(error.message)
  }
  return false
}
