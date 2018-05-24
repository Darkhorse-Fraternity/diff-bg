/**
 * Created by lintong on 2018/4/2.
 * @flow
 */
'use strict';

import styled from "styled-components";



export const StyledContent = styled.div`
    display:flex;
    flex: 1;
    background-color: white;
    flex-direction: column;
    align-items: flex-start;
`
export const StyledIcardImage = styled.img`
    width: 100%;
    height: ${props =>props.theme.width * 0.7};
`

