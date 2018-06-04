/**
 * Created by lintong on 2018/5/18.
 * @flow
 */
'use strict';

import styled from "styled-components";
import { CircularProgress } from 'material-ui/Progress';

export const StyledContent = styled.div`
    display:flex;
    width:100%;
    height:100%;
    position:absolute;
    z-index:20000;
    left:0;
    top:0;
    bottom:0;
    background-color: white;
     
    
`

export const StyledProgress = styled(CircularProgress)`

`