/**
 * Created by lintong on 2018/4/2.
 * @flow
 */
'use strict';

import styled from "styled-components";



export const StyledContent = styled.div`
     justify-content: flex-start;
`
export const StyledIcardDiv = styled.div`
    width: 100%;
    height: 250px;
    position: relative;
    margin-bottom: 20px;
    overflow: hidden;
`
export const StyledIcardImage = styled.img`
    width: 100%;
    height: auto;
`
export const StyledIcardSpan = styled.span`
    position: absolute;
    width: 100%;
    bottom: 0;
    left: 0px;
    background-color: rgba(0, 0, 0, .5);
    color: #FFFFFF;
    letter-spacing: .5px;
`
export const StyledIcardP = styled.p`
    margin: 8px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap; //文本不换行，这样超出一行的部分被截取，显示...    
`


