import React, {Component, PropTypes} from 'react';
import Helmet from 'react-helmet';
import {connect} from 'react-redux';
import * as leancloudActions from 'redux/modules/leancloud';
import {load as loadList} from 'redux/modules/leancloud';
import {asyncConnect} from 'redux-async-connect';
import * as lcParams from '../../helpers/leanCloud';


const COMPKEY = 'IdeaList';
@asyncConnect([{
  deferred: true,
  promise: ({store: {dispatch}}) => {
    const params = lcParams.getUserByID('57dd4379816dfa0067f14e73');
    return dispatch(loadList(params, COMPKEY));
  }
}])
@connect(
  state => ({
    data: state.leancloud.get('IdeaList').get('data'),
    loading: state.leancloud.get('IdeaList').get('loading')
  }),
  {...leancloudActions})
export default class IdeaList extends Component {
  static propTypes = {
    data: PropTypes.object,
    loading: PropTypes.bool,
    load: PropTypes.func.isRequired,
  };

  render() {
    console.log('test:', this.props.data.toJS());
    const {loading, load} = this.props;
    const data = this.props.data.toJS();
    let refreshClassName = 'fa fa-refresh';
    if (loading) {
      refreshClassName += ' fa-spin';
    }
    const styles = require('./IdeaList.scss');
    return (
      <div className={styles.ideaList + ' container'}>
        <Helmet title="Diff"/>
        <h1>
          {data.username}
          <button className={styles.refreshBtn + ' btn btn-success'} onClick={()=> {
            const params = lcParams.getUserByID('57dd4379816dfa0067f14e73');
            load(params, COMPKEY);
          }}>
            <i className={refreshClassName}/> {' '} Reload Diff
          </button>
        </h1>
      </div>
    );
  }
}

