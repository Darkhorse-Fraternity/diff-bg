/*eslint-disable */
import React, {Component} from 'react'
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'
// import Todo from '../components/Todo'
import {List, ListItem, UsersView} from 'styles/List'
import TextField from 'material-ui/TextField'


export default class Users extends Component {

  render() {
    const users = [{"name": "tonyYo"}, {"name": "masd"}]
    return (
      <UsersView>
          <TextField
            floatingLabelText='用户查询'
            className='userSearch'
            autoComplete='off'
            ref={node => this.userInput = node}
          />
        <CSSTransitionGroup
          component={List}
          className='todo-list'
          transitionName='add-remove-item'
          transitionEnterTimeout={250}
          transitionLeaveTimeout={250}
        >
          {users.map(todo =>
            <ListItem key={todo.name}>
              <b>
                {todo.name}
              </b>
            </ListItem>
          )}

        </CSSTransitionGroup>
      </UsersView>
    )
  }
}





