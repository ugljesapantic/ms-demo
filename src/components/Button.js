import React from 'react'
import styled from 'styled-components';
import { buttonStyles } from '../styles/utils';

const Styled = styled.button`
  ${buttonStyles};
`;

const Button = ({text, ...rest}) => {
    return (
        <Styled {...rest}>{text}</Styled>
    )
}

export default Button
