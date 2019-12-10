import React from 'react'
import styled from 'styled-components';
import { Loader } from 'semantic-ui-react';

const StyledLoader = styled(Loader)`
    &&& {
        margin: auto;
    }
`

export const Loading = () => {
    return (
        <StyledLoader inline active />
    )
}
