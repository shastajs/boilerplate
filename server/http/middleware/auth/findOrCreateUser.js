import User from 'resources/user/model'

export default (formatter) => (accessToken, refreshToken, profile, cb) => {
  User.insert(
    new User(formatter({
      ...profile._json,
      accessToken: accessToken,
      refreshToken: refreshToken
    }))
  ,
    { conflict: 'update', returnChanges: true }
  ).execute((err, res) => {
    cb(err, res && new User(res.changes[0].new_val))
  })
}
