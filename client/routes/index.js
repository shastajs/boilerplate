import React from 'react'
import { Route, IndexRoute } from 'shasta-router'
import HomeView from 'views/Home'
import AboutView from 'views/About'
import TodosView from 'views/Todos'
import NotFoundView from 'views/NotFound'

export default (
  <Route path="/">
    <IndexRoute component={HomeView} />
    <Route path="/about" component={AboutView} />
    <Route path="/todos" component={TodosView} />
    <Route path="/todos/:filter" component={TodosView} />
    <Route path="*" component={NotFoundView}/>
  </Route>
)
