import React from 'react'
import jif from 'jif'
import {
  Media, Heading, Text,
  Panel, PanelHeader
} from 'rebass'
import { PropTypes } from 'shasta'
import DataComponent from 'shasta-data-view'

class RepoList extends DataComponent {
  static displayName = 'RepoList'
  static propTypes = {
    name: PropTypes.string.isRequired,
    repos: PropTypes.iterable
  }
  static storeProps = {
    repos: 'subsets.repos'
  }

  fetch() {
    this.actions.github.getRepositories({
      subset: 'repos',
      params: {
        name: this.props.name
      }
    })
  }

  renderData({ repos }) {
    return (<Panel rounded>
      <PanelHeader>Repositories</PanelHeader>
      {
        repos.map(repo =>
          <Media key={repo.get('id')} align="center">
            <Heading level={3}>{repo.get('full_name')}</Heading>
            {
              jif(repo.has('description'), () =>
                <Text className="description">
                  {repo.get('description')}
                </Text>
              )
            }
          </Media>
        )
      }
    </Panel>)
  }

  renderErrors(errors) {
    return (<Panel rounded>
      <PanelHeader>Repositories</PanelHeader>
      <Heading>Failed to Load!</Heading>
      {
        errors.map((err, field) =>
          <Media key={field} align="center">
            <Heading level={3}>{field}</Heading>
            <Text>{err.message}</Text>
          </Media>
        ).toArray()
      }
    </Panel>)
  }
}

export default DataComponent.connect(RepoList, require('core/actions'))
