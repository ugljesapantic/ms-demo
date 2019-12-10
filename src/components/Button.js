import React from 'react'
import styled from 'styled-components';
import { buttonStyles } from '../styles/utils';

const Styled = styled.button`
  ${buttonStyles};
  ${({center}) => center && `margin: 0 auto`}
`;

const Button = ({text, center, disabled, ...rest}) => {
    return (
        <Styled disabled={disabled} center={center} {...rest}>{text}</Styled>
    )
}

export default Button
