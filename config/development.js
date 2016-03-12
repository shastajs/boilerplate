import baseConfig from './default'

export default {
  paths: {
    ...baseConfig.paths,
    public: `http://${baseConfig.http.host}:${baseConfig.http.port}/`
  },

  // databases
  redis: 'redis://localhost/2',
  rethink: {
    silent: true,
    host: 'localhost',
    port: 28015,
    db: 'stack',
    enforce_extra: 'remove'
  },

  // auth stuff
  facebook: {
    id: '946814205398323',
    secret: '568fa31830811386f09b195091cbb699',
    scope: [
      'email',
      'public_profile',
      'user_about_me',
      'user_birthday',
      'user_location'
    ]
  },

  google: {
    id: 'get-your-own',
    secret: 'get-your-own',
    scope: [
      'profile'
    ]
  }
}
