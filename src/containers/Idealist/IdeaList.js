/* eslint no-dupe-keys: 0 */

import React, {Component, PropTypes} from 'react';
import Helmet from 'react-helmet';
import {connect} from 'react-redux';
import * as leancloudActions from 'redux/modules/leancloud';
import {load as loadList} from 'redux/modules/leancloud';
import {asyncConnect} from 'redux-async-connect';
import * as lcParams from '../../helpers/leanCloud';
import {ListView} from 'antd-mobile';
import * as immutable from 'immutable';

// const data = [
//   {
//     img: 'https://zos.alipayobjects.com/rmsportal/dKbkpPXKfvZzWCM.png',
//     title: '相约酒店',
//     des: '不是所有的兼职汪都需要风吹日晒',
//   },
//   {
//     img: 'https://zos.alipayobjects.com/rmsportal/XmwCzSeJiqpkuMB.png',
//     title: '麦当劳邀您过周末',
//     des: '不是所有的兼职汪都需要风吹日晒',
//   },
//   {
//     img: 'https://zos.alipayobjects.com/rmsportal/hfVtzEhPzTUewPm.png',
//     title: '食惠周',
//     des: '不是所有的兼职汪都需要风吹日晒',
//   },
// ];
// let index = data.length - 1;
//
// const NUM_ROWS = 20;
// let pageIndex = 0;

const COMPKEY = 'IdeaList';
@asyncConnect([{
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

  defaultProps = {
    data: immutable.fromJS({})
  }


  constructor(props: Object) {
    super(props);
    console.log('test:', ListView);
    // const dataSource = new ListView.DataSource({
    //   rowHasChanged: (row1, row2) => row1 !== row2,
    // });
    //
    // this.genData = (pIndex = 0) => {
    //   const dataBlob = {};
    //   for (let i = 0; i < NUM_ROWS; i++) {
    //     const ii = (pIndex * NUM_ROWS) + i;
    //     dataBlob[`${ii}`] = `row - ${ii}`;
    //   }
    //   return dataBlob;
    // };
    // this.rData = this.genData();
    // this.state = {
    //   dataSource: dataSource.cloneWithRows(this.rData),
    //   isLoading: false,
    // };
  }

  // onEndReached(event) {
  //   // load new data
  //   console.log('reach end', event);
  //   this.setState({isLoading: true});
  //   setTimeout(() => {
  //     this.rData = {...this.rData, ...this.genData(++pageIndex)};
  //     this.setState({
  //       dataSource: this.state.dataSource.cloneWithRows(this.rData),
  //       isLoading: false,
  //     });
  //   }, 1000);
  // }

  render() {
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

