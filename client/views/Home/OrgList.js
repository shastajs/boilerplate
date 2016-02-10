import React from 'react'
import jif from 'jif'
import { PropTypes } from 'shasta'
import DataComponent from 'shasta-data-view'
import './index.sass'

class OrgList extends DataComponent {
  static displayName = 'OrgList';
  static propTypes = {
    orgs: PropTypes.iterable
  };
  static storeProps = {
    orgs: 'requests.orgs'
  };

  fetch() {
    const opt = {
      name: this.props.name
    }
    this.actions.github.getOrganizations({ requestId: 'orgs', params: opt })
  }

  renderData({ orgs }) {
    return (<div className="ui list relaxed column">
      <div className="ui header">{orgs.size} Orgs</div>
      {
        this.props.orgs.map(org =>
          <div className="ui item" key={org.get('id')}>
            <i className="ui icon large github middle aligned"/>
            <div className="content">
              <div className="ui header">{org.get('login')}</div>
              <div className="description">
              {
                jif(org.has('description'), () =>
                  <div className="description">
                    {org.get('description')}
                  </div>
                )
              }
              </div>
            </div>
          </div>
        )
      }
    </div>)
  }
  renderLoader() {
    return <div className="ui header">Loading...</div>
  }
  renderErrors(errors) {
    return (<div className="errors">
      Failed to Load:
      {
        errors.map((err, field) =>
          <div key={field}>{field}: {err.message}</div>
        ).toArray()
      }
    </div>)
  }
}

export default DataComponent.connect(OrgList, require('core/actions'))
