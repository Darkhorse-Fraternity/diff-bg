/*eslint-disable */

import React, { Component } from 'react'
import TextField from 'material-ui/TextField'
import LoginForm from 'styles/LoginForm'
import LoginInfo from 'styles/LoginInfo'
import Button from 'styles/Button'
import LoginIndicator from 'styles/LoginIndicator'
import NormalLink from 'styles/NormalLink'


class Form extends Component {
  constructor(props) {
  super(props);
  this.state = {
    isLoginOpen: true,
    phoneNum:'',
    password:''
  };
}

errorMsgTranslator (err) {
    if (err.clientErr) {
      return err.clientErr
    }

    switch (err.code) {
      case -1:
        return '您的网络貌似断线了 T_T'
      case 202:
        return '用户名已被占用'
      case 210:
        return '密码错误'
      case 219:
        return '失败次数超过限制,稍后再试'
      case 211:
        return '账号不存在，请注册后使用呦～'
      default:
        return 'Oops..出错了！'
    }
  }
  toggleLoginOpen (e){
    e.preventDefault();
    this.setState({
      isLoginOpen: !this.state.isLoginOpen
    })
  }
  render () {
    const { sign,login, isLogging, loginError } = this.props
    return (true) ?
    <LoginForm  login
          onSubmit={(e) => {
            e.preventDefault()
            login(
              this.state.phoneNum,
              this.state.password
            )}
          }
        >
          <LoginInfo error={loginError}>
            { loginError || 'Combo'}
          </LoginInfo>
          <TextField
            id='username'
            label='账号'
            className='username'
            autoComplete='off'
            margin="normal"
            onChange={event=>this.setState({phoneNum:event.target.value})}
            />
          <br />
          <TextField
            id='password'
            margin="normal"
            label='验证码'
            type='password'
            className='password'
            onChange={event=>this.setState({password:event.target.value})}
            autoComplete="current-password"
            />
          <br />
          <LoginIndicator
            size={40}
            left={135}
            top={240}
            status={'loading'}
            hide={!isLogging}
            />
          <Button login
            // primary={true}
            type='submit'
            hide={isLogging}
          >
            登录
          </Button>
            {/*style={{color:'#29aed4'}}*/}
          {/*>注册</NormalLink></p>*/}
        </LoginForm>

        :
        <LoginForm
          onSubmit={(e) => {
            e.preventDefault()
          }}
        >
          <LoginInfo error={loginError}>
            { loginError ? this.errorMsgTranslator(loginError) : 'Welcome'}
          </LoginInfo>
          <TextField
            floatingLabelText='UserName'
            className='username'
            autoComplete='off'
            />
          <br />

          <TextField
            floatingLabelText='Password'
            type='password'
            className='password'
            autoComplete='off'
            />
          <br />
          <TextField
            floatingLabelText='Email'
            type='email'
            className='password'
            autoComplete='off'
            />
          <br />
          <LoginIndicator
            size={40}
            left={135}
            top={240}
            status={'loading'}
            hide={!isLogging}
            />
          <Button login bigger label='注册'
            type='submit'
            hide={isLogging}

          />
          <p>已有账号？请<NormalLink href="#"
                               style={{color:'#29aed4'}}>
            登录</NormalLink></p>
        </LoginForm>
  }
}


export default Form
