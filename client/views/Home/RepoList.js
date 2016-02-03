import React from 'react'
import jif from 'jif'
import {PropTypes} from 'shasta'
import DataComponent from 'shasta-data-view'
import './index.sass'

class RepoList extends DataComponent {
  static displayName = 'RepoList';
  static propTypes = {
    repos: PropTypes.iterable
  };
  static storeProps = {
    repos: 'requests.repos'
  };

  fetch () {
    var opt = {
      name: this.props.name
    }
    this.actions.github.getRepositories({requestId: 'repos', params: opt})
  }

  renderData ({repos}) {
    return <div className='ui list relaxed column'>
      <div className='ui header'>{repos.size} Repos</div>
      {
        this.props.repos.map(repo =>
          <div className='ui item' key={repo.get('id')}>
            <i className='ui icon large github middle aligned'/>
            <div className='content'>
              <div className='ui header'>{repo.get('full_name')}</div>
              {
                jif(repo.has('description'), () =>
                  <div className='description'>
                    {repo.get('description')}
                  </div>
                )
              }
            </div>
          </div>
        )
      }
    </div>
  }
  renderLoader () {
    return <div className='ui header'>Loading...</div>
  }
  renderErrors (errors) {
    return <div className='errors'>
      Failed to Load:
      {
        errors.map((err, field) =>
          <div key={field}>{field}: {err.message}</div>
        ).toArray()
      }
    </div>
  }
}

export default DataComponent.connect(RepoList, require('core/actions'))
