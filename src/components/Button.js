import React from 'react'
import styled from 'styled-components';

const Styled = styled.button`
  background-color: inherit;
  padding: 0.5rem 1rem;
  outline: none;
  border: none;
  font-size: 1.2rem;
  color: white;
  cursor: pointer;
  border-radius: 0.2rem;

  ${({bordered}) => bordered && `border: 2px solid white`};
  width: ${({width}) => width ? `${width}px` : 'auto'};
  
  &:hover {
    background-color: rgba(0,0,0,0.1);
    border-radius: 0.2rem;
  }
`;

const Button = ({text, ...rest}) => {
    return (
        <Styled {...rest}>{text}</Styled>
    )
}

export default Button
