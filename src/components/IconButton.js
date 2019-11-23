import React from 'react'
import styled from 'styled-components';
import { Icon } from 'semantic-ui-react';

const Styled = styled.div`
    cursor: pointer;
`;

const IconButton = ({name, size, ...rest}) => {
    return (
        <Styled {...rest}>
            <Icon name={name} size={size || 'big'}  />
        </Styled>
    )
}

export default IconButton
