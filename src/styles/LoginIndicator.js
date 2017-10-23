/*eslint-disable */

import React from 'react'
import styled from 'styled-components'
// import RefreshIndicator from 'material-ui/RefreshIndicator'
import { CircularProgress } from 'material-ui/Progress';

const LoginIndicator = styled(({hide, ...test}) =>
  <CircularProgress {...test} />
)`
  display: ${props => props.hide === true
    ? 'none !important' : 'inline-block'
  };
`

export default LoginIndicator
