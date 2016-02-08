import Immutable from 'immutable'
import uuid from 'uuid'

let ids = ['1', '2', '3', '4']

export const initialState = Immutable.fromJS({
  [ids[0]]: {
    id: ids[0],
    name: 'Andre Power',
    smallImage: '//pbs.twimg.com/profile_images/690022955204657152/7W1PQ7OV_400x400.jpg',
    largeImage: '//pbs.twimg.com/profile_images/690022955204657152/7W1PQ7OV.jpg',
    location: 'San Francisco, CA',
    litScore: 4,
    monetizationScore: 3,
    email: 'aaron@wearefractal.com',
    twitter: 'andrepower',
    facebook: 'andrepower',
    instagram: 'andrepower',
    created: Date.now()
  },
  [ids[1]]: {
    id: ids[1],
    name: 'Dan Abramov',
    smallImage: '//pbs.twimg.com/profile_images/553711083064541184/9VsY9i09_400x400.jpeg',
    largeImage: '//pbs.twimg.com/profile_images/553711083064541184/9VsY9i09.jpeg',
    location: 'London, UK',
    litScore: 2,
    monetizationScore: 3,
    twitter: 'dan_abramov',
    facebook: 'aaron.thomas.murray',
    instagram: 'funkytek',
    created: Date.now()
  },
  [ids[2]]: {
    id: ids[2],
    name: 'Jenn Schiffer',
    smallImage: '//pbs.twimg.com/profile_images/686793998992814080/pPNII-Qh_400x400.jpg',
    largeImage: '//pbs.twimg.com/profile_images/686793998992814080/pPNII-Qh.jpg',
    location: 'Jersey City, NJ',
    litScore: 1,
    monetizationScore: 3,
    twitter: 'jennschiffer',
    facebook: 'aaron.thomas.murray',
    instagram: 'funkytek',
    created: Date.now()
  },
  [ids[3]]: {
    id: ids[3],
    name: 'Eric Schoffstall',
    smallImage: '//pbs.twimg.com/profile_images/628259794739068928/vKzPVB_a_400x400.jpg',
    largeImage: '//pbs.twimg.com/profile_images/628259794739068928/vKzPVB_a.jpg',
    location: 'San Francisco, CA',
    litScore: 3,
    monetizationScore: 3,
    twitter: 'contrahacks',
    facebook: 'aaron.thomas.murray',
    instagram: 'funkytek',
    created: Date.now()
  }
})

export const filter = (state, {payload}) => {
  if (payload === '') {
    return initialState
  } else {
    return state.filter((person) => {
      var re = new RegExp(payload.toLowerCase(), 'g')
      return (person.get('name').toLowerCase().match(re))
    })
  }
}

export const save = (state, {payload}) => {
  let person = Immutable.Map(payload)
  let id = payload.id ? payload.id.toString() : uuid.v1()
  if (!state.has(id)) {
    person = person.merge({id: id, created: Date.now()})
  }
  return state.set(id, person)
}

export const remove = (state, {payload}) => {
  return state.delete(payload.get('id'))
}
