import styled from "styled-components";


export const StyledButton = styled.div`
    display:flex;
    flex: 1;
    flex-direction: column;
`

export const StyledImage = styled.img`
    width: 100%;
    height: ${props =>props.theme.width * 0.7};
`

export const StyledZoomImage = styled.img`
    width: 100%;
    height: ${props =>props.theme.width * 0.7};
`

export const StyledBottom = styled.div`
    margin-top: 5px;
    margin-bottom: 5px;
    padding: 0px 15px;
`

export const StyledDateView = styled.div`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`

export const StyledNewTip = styled.div`
    width: 8px;
    height: 8px;
    border-radius: 4px;
    background-color: red;
    margin-right: 5px;
    
`

export const StyledDateText = styled.h5`
    font-size: 15px;
    color: #646464;
    padding: 3px 0px;
`

export const StyledRecordText = styled.h5`
   color: #323232;
`

export const StyledIcon = styled.div`
    align-self: center;
`

export const StyledChatbtn = styled.div`
    display:flex;
    justify-content: space-between;
    margin: 4px;
    flex-direction: row;
    align-items: center;
`
export const StyledChatBtnText = styled.h5`
    margin-left: 5px;
`

export const StyledArrowView = styled.div`
  border-bottom-width: ${props => props.theme.hairlineWidth * 2};
  border-right-width: ${props => props.theme.hairlineWidth * 2};
  border-color: #8c8c85;
  transform: rotate(315deg);
  width: 10px;
  height: 10px;
  margin-left: 5px;
`