import styled from "styled-components";
import Icon from 'material-ui/SvgIcon'

export const StyledButton = styled.div`
    display:flex;
    flex-direction: column;
    width: 100%;
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
    padding: 5px 30px 15px 30px;
`

export const StyledDateView = styled.div`
    display:flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    height: 30px;
`

export const StyledNewTip = styled.div`
    width: 8px;
    height: 8px;
    border-radius: 4px;
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

export const StyledIcon = styled(Icon)`

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