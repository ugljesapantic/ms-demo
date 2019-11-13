import React from 'react'
import styled from 'styled-components';
import IconButton from './IconButton';

const StyledIconButton = styled(IconButton)`
    position: fixed;
    bottom: 1rem;
    right: 1rem;
`;

const CornerIconButton = (props) => {
    return (
        <StyledIconButton {...props}/>
    )
}

export default CornerIconButton
