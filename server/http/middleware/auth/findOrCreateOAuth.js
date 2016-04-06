import User from 'resources/user/model'

const mergePolicy = {
  conflict: 'update',
  returnChanges: true
}
export default (formatter) => (accessToken, refreshToken, profile, cb) => {
  const maybeUser = formatter({
    ...profile._json,
    accessToken: accessToken,
    refreshToken: refreshToken
  })

  User.insert(new User(maybeUser), mergePolicy).execute((err, res) => {
    cb(err, res && new User(res.changes[0].new_val))
  })
}
