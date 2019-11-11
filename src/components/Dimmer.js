import React from 'react'
import styled from 'styled-components';

const Wrapper = styled.div`
    &:focus-within {
        box-shadow: 0 0 0 10000vmax rgba(0,0,0,.3);
    }
    /* TODO maybe a param */
    border-radius: 4px;
    z-index: 100;

    ${({loading}) => loading && `
        opacity: 0.5;
        pointer-events: none;
    `}
`;


const Dimmer = ({children, loading}) => {

    return <Wrapper loading={loading}>
        {children}
    </Wrapper>
}

export default Dimmer
