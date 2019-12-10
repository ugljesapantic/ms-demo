import React from 'react'
import styled from 'styled-components';
import { Icon } from 'semantic-ui-react';

const Styled = styled.div`
    cursor: pointer;
    ${({primary, theme}) => primary && `color: ${theme.primary}`}
`;

const IconButton = ({name, size, primary, ...rest}) => {
    return (
        <Styled primary={primary} {...rest}>
            <Icon name={name} size={size || 'big'}  />
        </Styled>
    )
}

export default IconButton
