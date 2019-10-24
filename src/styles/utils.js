import styled, {css} from 'styled-components';
import { Modal } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom'


export const LimitedWidthContainer = styled.div`
  max-width: 1240px;
  padding: 0 16px;
  flex: 1;
  width: 100%;
`

export const LimitedWidthModal = styled(Modal)`
  max-width: 450px;
`

export const buttonStyles = css`
  background-color: inherit;
  padding: 0.5rem 1.25rem;
  outline: none;
  border: none;
  font-size: 1.2rem;
  color: white;
  cursor: pointer;
  border-radius: 0.2rem;
  font-family: unset;
  font-weight: 300;

  ${({bordered}) => bordered && `border: 2px solid white`};
  width: ${({width}) => width ? `${width}px` : 'auto'};
  
  &:hover {
    background-color: rgba(0,0,0,0.1);
    border-radius: 0.2rem;
  }
`

export const ButtonLink = styled(NavLink)`
  ${buttonStyles}
  transition: background 0.25s;

  &:hover {
    color: white;
  }

  &.selected {
    background: rgba(255,255,255, 0.1)
  }
`