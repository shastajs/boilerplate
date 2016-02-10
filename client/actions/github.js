import { createAction } from 'tahoe'
import { Schema } from 'normalizr'

const user = new Schema('gh-user')
const organization = new Schema('gh-organization')
const repository = new Schema('gh-repository')

export const getUser = createAction({
  endpoint: ({ name }) => `https://api.github.com/users/${name}`,
  method: 'GET',
  model: user
})

export const getOrganizations = createAction({
  endpoint: ({ name }) => `https://api.github.com/users/${name}/orgs`,
  method: 'GET',
  collection: true,
  model: organization
})

export const getRepositories = createAction({
  endpoint: ({ name }) => `https://api.github.com/users/${name}/repos`,
  method: 'GET',
  collection: true,
  model: repository
})
