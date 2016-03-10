import React from 'react'
import jif from 'jif'
import { PropTypes } from 'shasta'
import {
  Media, Heading, Text,
  Panel, PanelHeader
} from 'rebass'
import DataComponent from 'shasta-data-view'

class OrgList extends DataComponent {
  static displayName = 'OrgList'
  static propTypes = {
    name: PropTypes.string.isRequired,
    orgs: PropTypes.iterable
  }
  static storeProps = {
    orgs: 'subsets.orgs'
  }

  fetch() {
    this.actions.github.getOrganizations({
      subset: 'orgs',
      params: {
        name: this.props.name
      }
    })
  }

  renderData({ orgs }) {
    return (<Panel rounded>
      <PanelHeader>Organizations</PanelHeader>
      {
        orgs.map(org =>
          <Media key={org.get('id')} align="center" img={org.get('avatar_url')}>
            <Heading level={3}>{org.get('login')}</Heading>
            {
              jif(org.has('description'), () =>
                <Text className="description">
                  {org.get('description')}
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
      <PanelHeader>Organizations</PanelHeader>
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

export default DataComponent.connect(OrgList, require('core/actions'))
