import sutro, { load } from 'sutro'
import config from 'app-config-chain'

export default sutro({
  prefix: config.api.path,
  resources: load(config.paths.resources)
})
