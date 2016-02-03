import config from 'app-config-chain'
import base from './default'

export default require(`./${config.env}`)(base)
