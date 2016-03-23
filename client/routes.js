/* eslint react/forbid-prop-types: 0 */
import React from 'react'
import { Route, IndexRoute } from 'shasta-router'

import HomeView from 'views/Home'
import AboutView from 'views/About'
import LoginView from 'views/Login'
import NotFoundView from 'views/NotFound'

const routes = (
  <Route path="/">
    <IndexRoute component={HomeView} />
    <Route path="/about" component={AboutView} />
    <Route path="/login" component={LoginView} />
    <Route path="*" component={NotFoundView} />
  </Route>
)

export default routes
