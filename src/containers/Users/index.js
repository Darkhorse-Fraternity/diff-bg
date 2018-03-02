import React, {Component} from 'react'
import {TransitionGroup, CSSTransition} from 'react-transition-group'
import {List, ListItem, UsersView, LeftView, RightView} from 'styles/Users'
import TextField from 'material-ui/TextField'
import {req} from 'redux/modules/req'
import {connect} from 'react-redux';
import {searchUser, updateRoles} from 'helpers/leanCloud'
import _ from 'lodash';
import {USERS, UPDATEROLE} from 'redux/reqKeys';


import Button from 'material-ui/Button';
import { immutableRenderDecorator } from 'react-immutable-render-mixin';

const Fade = ({children, ...props}) => (
  <CSSTransition
    {...props}
    timeout={1000}
    classNames="fade"
  >
    {children}
  </CSSTransition>
);


@connect(
  state => ({users: state.req.get(USERS)}),
  {
    load: (username) => {
      const params = {
        where: {
          username: {
            "$regex": username,
            "$options": "i"
          }
        },
        limit: 100
      };
      const parmas = searchUser(params)
      return  req(parmas,USERS)
    },
    updateRole: (id, op)=>{
      const rolsesId = '59ed675667f356003a441f5d';
      const params = updateRoles(id, op, rolsesId);
      return  async (dispatch) => {
        try {
          const res = await dispatch(req(params, UPDATEROLE))
          console.log('updateRole:', res);
        }catch (e){
          console.log('updateRole e:', e.message);
        }

      }
    }
  }
)
@immutableRenderDecorator
export default class Users extends Component {

  constructor(props) {
    super(props);
    this._onChange = _.throttle(this._onChange, 1000);
  }


  componentDidMount() {
    this.props.load('')
  }

  _onChange(value = '') {
    this.props.load(value);
  }

  render() {
    // console.log('this.props:', this.props.users);
    const users = this.props.users.toJS()

    return (
      <UsersView>

        <TextField
          id="userSearch"
          label="用户查询"
          className={"userSearch"}
          margin="normal"
          autoComplete='off'
          onChange={evnet => this._onChange(evnet.target.value)}
        />
        {users && <TransitionGroup
          className='todo-list'
        >
          {users.map(user =>
            <Fade key={user.username}>
              <ListItem>
                <LeftView>
                  <b>
                    姓名: {user.username}
                  </b>
                  <p/>
                  <b>
                    手机号 : {user.mobilePhoneNumber || '无'}
                  </b>
                </LeftView>
                <RightView>
                  <Button onClick={(e) => {
                    this.props.updateRole(user.objectId, 'AddRelation');
                  }}>
                    设置成管理员
                  </Button>
                  <Button onClick={(e) => {
                    this.props.updateRole(user.objectId, 'RemoveRelation');
                  }}>
                    取消管理员
                  </Button>
                </RightView>
              </ListItem>
            </Fade>
          )}

        </TransitionGroup>}

      </UsersView>
    )
  }
}






